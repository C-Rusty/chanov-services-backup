import { IPost } from "../../../../interface/Interface";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import '../../../../styles/main/PostItem/ShortPost.scss';
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";

const ShortPost = ({post} : {post: IPost}) => {

    const { t } = useTranslation();

    const postUrlPath = post.imageCloudPath.split(`/`)[1].split(`.`)[0];

    const deviceType = useSelector<IRootState, string>(state => state.deviceType.screen);

    return (
        <Link to={postUrlPath} className="post-short">
            <div className="post-short__img">
                <img loading="lazy" src={post.imageUrl} alt={postUrlPath} />
                {deviceType === `desktop` &&
                    <div className="img__read-hover">
                        <span>{t (`Read`)}</span>
                    </div>
                }
            </div>
            <div className="post-short__info">
                <h2>{post.headline}</h2>
                <div className="categories">
                    {post.categories.map(category => 
                        <h3 key={category}>{t (`${category}`)}</h3>    
                    )}
                    {post.types.map(type => 
                        <h3 key={type}>{t (`${type}`)}</h3>    
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ShortPost;