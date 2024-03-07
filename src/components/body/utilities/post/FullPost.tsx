import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import '../../../../styles/main/PostItem/FullPost.scss';
import { Link, useLocation } from "react-router-dom";
import ArrowBack from "../../../../images/content/articles-cases/ArrowBack";
import { api } from "../../../../api/ApiPosts";
import { IFullPost } from "interface/Interface";
import parse from 'html-react-parser';
import { apiImg } from "../../../../api/ApiImg";
import Loading from "../Loading";

const FullPost = () => {

    const { t } = useTranslation();
    const cloudPath = useLocation().pathname.split(`/`)[2];

    const [postContent, setPostContent] = useState<IFullPost | undefined>(undefined);

    const getPostContent = async () => {
        const response: IFullPost | undefined = await api.getFullPost(document.documentElement.lang, cloudPath);
        if (response) setPostContent(response);
    };

    const [imagesDownloadLinks, setImagesDownloadLinks] = useState<Array<string> | undefined>(undefined);

    const getImages = async () => {
        const imgsDownloadLinks: Array<string> | undefined = await apiImg.downloadAllImgFromFolder(cloudPath);

        if (imgsDownloadLinks) setImagesDownloadLinks(imgsDownloadLinks);
    };

    const insertImagesInHtmlContent = async () => {
        const allImages = document.querySelectorAll(`img`);
        allImages.forEach((img, index) => img.src = imagesDownloadLinks![index]);
    };

    useEffect(() => {
        getPostContent();
        getImages();
    }, []);

    useEffect(() => {
        getPostContent();
    }, [document.documentElement.lang]);

    useEffect(() => {
        insertImagesInHtmlContent();
    }, [imagesDownloadLinks]);

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