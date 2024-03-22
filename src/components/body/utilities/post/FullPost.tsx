import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import '../../../../styles/main/PostItem/FullPost.scss';
import { Link, useLocation } from "react-router-dom";
import ArrowBack from "../../../../images/content/articles-cases/ArrowBack";
import { api } from "../../../../api/ApiPosts";
import { IFullPost } from "interface/Interface";
import parse from 'html-react-parser';
import Loading from "../Loading";
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

const FullPost = () => {

    const { t } = useTranslation();
    const cloudPath = useLocation().pathname.split(`/`)[2];

    const [postContent, setPostContent] = useState<IFullPost | undefined>(undefined);

    const getPostContent = async () => {
        // if (window.location.hostname !== `localhost`) {
        //     const response = await checkToken();
        //     if (response === `error`) throw new Error(`Something wrong with token request`);
        // };
        
        const response: IFullPost | undefined = await api.getFullPost(document.documentElement.lang, cloudPath);
        if (response) {
            setPostContent(response);
            setImagesDownloadLinks(response.img);
        };
    };

    const [imagesDownloadLinks, setImagesDownloadLinks] = useState<Array<string> | undefined>(undefined);

    const insertImagesInHtmlContent = async () => {
        const allImages = document.querySelectorAll(`img`);
        allImages.forEach((img, index) => img.src = imagesDownloadLinks![index]);
    };

    useEffect(() => {
        getPostContent();
        checkIsSwiperRequired();
    }, []);

    useEffect(() => {
        getPostContent();
        checkIsSwiperRequired();
    }, [document.documentElement.lang]);

    useEffect(() => {
        insertImagesInHtmlContent();
    }, [imagesDownloadLinks]);

    useEffect(() => {
        checkIsSwiperRequired();
    }, [postContent]);

    const checkIsSwiperRequired = () => {
        if (postContent?.htmlContent.find(element => element.includes(`swiper`))) {
            initializeSwiper();
        };
    };

    const initializeSwiper = () => {
        let swiperStyle = document.createElement(`link`);
        swiperStyle.rel = `stylesheet`;
        swiperStyle.href = `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css`;
        document.head.append(swiperStyle);

        let swiperStyleScript = document.createElement(`script`);
        swiperStyleScript.src = `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js`;
        swiperStyleScript.async = true;
        document.body.append(swiperStyleScript);

        new Swiper('.swiper', {
            modules: [Pagination],
            direction: 'horizontal',
          
            pagination: {
              el: '.swiper-pagination',
            },
        });
    };

    return (
        <React.Suspense fallback={<Loading/>}>
            <div className="post-full">
                <div className="container">
                    <div className="head">
                        <div className="head__back-btn">
                            <Link to="/articles-and-cases">
                                <ArrowBack/>
                                {t (`Back to list`)}
                            </Link>
                        </div>
                        <div className="head__tags">
                            {postContent?.categories.map(category => 
                                <span key={category}>{t (`${category}`)}</span>
                            )}
                            {postContent?.types.map(type => 
                                <span key={type}>{t (`${type}`)}</span>
                            )}
                        </div>
                        <div className="head__empty"></div>
                    </div>
                    <div className="container">
                        <div className="main">
                            {postContent?.htmlContent.map(postItem => 
                                <>{parse(postItem)}</>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Suspense>
    );
};

export default FullPost;