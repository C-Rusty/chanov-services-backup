import React, { useEffect, useState } from "react";
import { api } from "../../../api/ApiPosts";
import { IPost } from "interface/Interface";
import '../../../styles/main/articles-cases.scss';
import ShortPost from "./post/ShortPost";
import { useSelector } from "react-redux";
import FiltersBar from "./menu/FiltersBar";
import { IRootState } from "store/store";
import MobileFilterBtn from "./filtersMobile/MobileFilterBtn";
import { Outlet, useLocation } from "react-router-dom";
import { apiImg } from "../../../api/ApiImg";
import ShortPostSkeleton from "./post/ShortPostSkeleton";
import { postsLoadLimit } from "../../../api/ApiPostConfig";
import { useTranslation } from "react-i18next";
import Loading from "./Loading";
import { checkToken } from "../../../api/ReCaptchaVerification";

const ArticlesAndCases = () => {

    const [posts, setPosts] = useState<IPost[] | []>([]);

    const [initialPosts, setInitialPosts] = useState<IPost[] | []>([]);

    const [postsLoaded, setPostsLoaded] = useState<boolean>(false);

    const getImg = async (imageCloudPath: string) => {
        return apiImg.downloadImage(imageCloudPath);
    };

    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const getPosts = async (pageLang: string) => {
        const response = await checkToken();
        if (response === `error`) throw new Error(`Something wrong with token request`);

        const postsData: IPost[] | undefined = await api.getShortPosts(pageLang);

        if (postsData) {
            for (let post of postsData) {
                const imgUrl = await getImg(post.imageCloudPath);
                post.imageUrl = imgUrl;
            };

            setPosts(postsData);
            setInitialPosts(postsData);

            setPostsLoaded(true);
        } else {
            throw new Error (`Something wrong with posts API response. Posts API returned value ${postsData}`);
        };
    };
    
    const categoryTag = useSelector<IRootState, string>((state) => state.categoryTag.chosen);
    const typeTag = useSelector<IRootState, string>((state) => state.typeTag.chosen);

    // const handleClickBtn = () => {
    //     api.createCollection(document.documentElement.lang);
    // };

    // const handleUpload = (file: File) => {
    //     if (file) {
    //         apiImg.uploadImage(file);         
    //     };
    // };

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
        if (!currentUrlPath.split(`/`)[2]) getPosts(currentLang);
    }, [currentLang]);

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
                    {/* <button onClick={handleClickBtn}>Create Post</button> */}
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
                                </>
                                :
                                <>
                                    {Array(postsLoadLimit).fill(true).map((_item, index: number) =>
                                        <ShortPostSkeleton key={index}/>
                                    )}
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