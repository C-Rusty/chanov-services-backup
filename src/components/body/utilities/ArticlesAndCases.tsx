import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { api } from "../../../api/ApiPosts";
import { IRootState } from "store/store";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IPost } from "interface/Interface";
import ShortPost from "./post/ShortPost";
import FiltersBar from "./menu/FiltersBar";
import MobileFilterBtn from "./filtersMobile/MobileFilterBtn";
import ShortPostSkeleton from "./post/ShortPostSkeleton";
import { postsLoadLimit } from "../../../api/ApiPostConfig";
import Loading from "./Loading";
import '../../../styles/main/articles-cases.scss';
import { PostsResponse, pageActionsEvents } from "../../../types/types";
import { useDispatch } from "react-redux";
import { setPostsLoadStatus } from "../../../store/PostsLoadReducer";

const ArticlesAndCases = () => {

    const [posts, setPosts] = useState<IPost[] | []>([]);
    const [initialPosts, setInitialPosts] = useState<IPost[] | []>([]);
    const [postsAmountLoaded, setPostsAmountLoaded] = useState<number>(5);
    const [isAllPostsLoaded, setIsAllPostsLoaded] = useState<boolean>(false);

    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const dispatch = useDispatch();
    const postsLoadStatus = useSelector<IRootState, boolean>((state) => state.postsLoadReducer.isLoaded);

    const handlePageActions = async (pageLang: string, isLangChanged: boolean) => {
        let pageEvent: pageActionsEvents = undefined;
        let postsData: PostsResponse | undefined = undefined;

        if (!posts.length) {
            pageEvent = `initial-load`;
        } else if (!isLangChanged && initialPosts.length !== postsAmountLoaded) {
            pageEvent = `load-more`;
        } else if (isLangChanged && (initialPosts.length === postsAmountLoaded || initialPosts.length < postsAmountLoaded)) {
            pageEvent = `lang-changed`;
        } else {
            throw new Error (`unexpected page action has happened.`);
        };

        postsData = await getPosts(pageLang, pageEvent);

        if (postsData) {

            if (pageEvent === `initial-load` || pageEvent === `lang-changed`) {
                setPosts(postsData.posts);
                setInitialPosts(postsData.posts);
            } else if (pageEvent === `load-more`) {
                if (postsData.isAllPostsLoaded) {
                    setIsAllPostsLoaded(true);
                    setPostsAmountLoaded(initialPosts.length + postsData.posts.length);
                };
                
                setPosts([...posts, ...postsData.posts]);
                setInitialPosts([...posts, ...postsData.posts]);
            } else {
                throw Error (`something wrong with pageEvent in handlePageActions. The value is ${pageEvent}`);
            };

            dispatch(setPostsLoadStatus(true));
        } else {
            throw new Error (`something wrong with postsData. The value is:  ${postsData}`);
        };
    };

    const getPosts = async (pageLang: string, pageEvent: pageActionsEvents) => {
        let postsData: PostsResponse | undefined = undefined;

        if (pageEvent == `initial-load` || pageEvent === `lang-changed`) {
            postsData = await api.getShortPosts(pageLang, postsAmountLoaded, null, pageEvent);
            return postsData;
        } else if (pageEvent === `load-more`) {
            postsData = await api.getShortPosts(pageLang, postsAmountLoaded, initialPosts[initialPosts.length - 1].created, pageEvent);
            return postsData;
        } else {
            throw new Error (`something wrong with postsData in GetPosts. It's value  ${postsData}`);
        };
    };

    const showMorePosts = () => {
        if (!isAllPostsLoaded) setPostsAmountLoaded((oldValue) => oldValue + postsLoadLimit);
    };

    useEffect(() => {
        let isLangChanged = true;
        if (!currentUrlPath.split(`/`)[2]) handlePageActions(currentLang, isLangChanged);
    }, [currentLang]);

    useEffect(() => {
        if (isAllPostsLoaded) return;

        let isLangChanged = false;
        if (!currentUrlPath.split(`/`)[2]) handlePageActions(currentLang, isLangChanged);
    }, [postsAmountLoaded]);
    
    const categoryTag = useSelector<IRootState, string>((state) => state.categoryTag.chosen);
    const typeTag = useSelector<IRootState, string>((state) => state.typeTag.chosen);

    const filterPosts = (typeTag: string, categoryTag : string) => {
        let filteredPosts: IPost[] = [];

        if (typeTag === `All` && categoryTag === `All`) {
            setPosts(initialPosts);
        } 
        else if (typeTag !== `All` && categoryTag !== `All`) {
            filteredPosts = initialPosts.filter((post) => 
                post.types.find(type => type === typeTag) && 
                post.categories.find(category => category === categoryTag)
            );
            setPosts(filteredPosts);
        } 
        else if ((typeTag !== `All` && categoryTag === `All`)) {
            filteredPosts = initialPosts.filter((post) => 
                post.types.find(type => type === typeTag)
            );
            setPosts(filteredPosts);
        }
        else if ((typeTag === `All` && categoryTag !== `All`)) {
            filteredPosts = initialPosts.filter((post) => 
                post.categories.find(category => category === categoryTag));
            setPosts(filteredPosts);
        } else {
            throw new Error(`Something wrong with the filtration`);
        };
    };

    useEffect(() => {
        filterPosts(typeTag, categoryTag);
    }, [typeTag, categoryTag]);

    const deviceType = useSelector<IRootState, string>((state) => state.deviceType.screen);

    const currentUrlPath = useLocation().pathname; 
    const [showAllPosts, setShowAllPosts] = useState<boolean>(true);

    useEffect(() => {
        if (currentUrlPath.split(`/`).length === 3) {
            setShowAllPosts(false);
        } else {
            setShowAllPosts(true);
        };
    }, [currentUrlPath]);

    return(
        <React.Suspense fallback={<Loading/>}>
            {showAllPosts ?
                <div className="articles-cases">
                    <div className="container">
                        {deviceType === `desktop` ? 
                            <FiltersBar/>
                            :
                            <MobileFilterBtn/>
                        }
                        <div className="articles-cases-container">
                            {postsLoadStatus ?
                                <>
                                    {posts.map(post => 
                                        <ShortPost 
                                            key={post.headline}
                                            post={post} 
                                        />
                                    )}

                                    {!isAllPostsLoaded &&
                                        <button 
                                            className="articles-cases-container__load-more-btn"
                                            onClick={showMorePosts}
                                        >Show More</button>
                                    }
                                </>
                                :
                                <>
                                    {Array(postsLoadLimit).fill(true).map((_item, index: number) =>
                                        <ShortPostSkeleton key={index}/>
                                    )}
                                    <button 
                                        className="articles-cases-container__load-more-btn"
                                        disabled={true}
                                    >Show More</button>
                                </>  
                            }
                        </div>
                    </div>
                </div>
                :
                <Outlet/>
            }
        </React.Suspense>
    );
};

export default ArticlesAndCases;