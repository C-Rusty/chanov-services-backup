import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { api } from "../../../api/ApiPosts";
// import { checkToken } from "../../../api/ReCaptchaVerification";
import { IRootState } from "store/store";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IPost } from "interface/Interface";
import ShortPost from "./post/ShortPost";
import FiltersBar from "./menu/FiltersBar";
import MobileFilterBtn from "./filtersMobile/MobileFilterBtn";
import { apiImg } from "../../../api/ApiImg";
import ShortPostSkeleton from "./post/ShortPostSkeleton";
import { postsLoadLimit } from "../../../api/ApiPostConfig";
import Loading from "./Loading";
import '../../../styles/main/articles-cases.scss';

const ArticlesAndCases = () => {

    const [posts, setPosts] = useState<IPost[] | []>([]);
    const [initialPosts, setInitialPosts] = useState<IPost[] | []>([]);
    const [postsLoaded, setPostsLoaded] = useState<boolean>(false);
    const [postsAmountLoaded, setPostsAmountLoaded] = useState<number>(6);

    const getImg = async (imageCloudPath: string) => {
        return apiImg.downloadImage(imageCloudPath);
    };

    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const getPosts = async (pageLang: string, isLangChanged: boolean) => {
        // if (window.location.hostname !== `localhost`) {
        //     const response = await checkToken();
        //     if (response === `error`) throw new Error(`Something wrong with token request`);
        // };

        let postsData: IPost[] | undefined = undefined;
        console.log(`isLangChanged`, isLangChanged);

        if (!posts.length && !isLangChanged) {
            postsData = await api.getShortPosts(pageLang, postsAmountLoaded, null);

            for (let post of postsData) {
                const imgUrl = await getImg(post.imageCloudPath);
                post.imageUrl = imgUrl;
            };
            
            setPosts(postsData);
            setInitialPosts(postsData);
        } else {
            postsData = await api.getShortPosts(pageLang, postsAmountLoaded, initialPosts[initialPosts.length - 1].created);

            for (let post of postsData) {
                const imgUrl = await getImg(post.imageCloudPath);
                post.imageUrl = imgUrl;
            };

            setPosts([...posts, ...postsData]);
            setInitialPosts([...posts, ...postsData]);
        };

        setPostsLoaded(true);
    };
    
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

    const showMorePosts = () => {
        setPostsAmountLoaded((oldValue) => oldValue + postsLoadLimit);
    };

    useEffect(() => {
        let isLangChanged = true;
        if (!currentUrlPath.split(`/`)[2]) getPosts(currentLang, isLangChanged);
    }, [currentLang]);

    useEffect(() => {
        let isLangChanged = false;
        if (!currentUrlPath.split(`/`)[2]) getPosts(currentLang, isLangChanged);
    }, [postsAmountLoaded]);

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
                            {postsLoaded ?
                                <>
                                    {posts.map(post => 
                                        <ShortPost key={post.headline} post={post}/>
                                    )}

                                    <button 
                                        className="articles-cases-container__load-more-btn"
                                        onClick={showMorePosts}
                                    >Show More</button>
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