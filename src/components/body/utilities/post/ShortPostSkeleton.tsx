import React from "react";
import '../../../../styles/main/PostItem/ShortPostSkeleton.scss';

const ShortPostSkeleton = () => {
    return (
        <div className="post-short post-skeleton">
            <div className="post-short__img">
                <div className="post-short-skeleton-image"></div>
                <div className="img__read-hover">
                    <span></span>
                </div>
            </div>
            <div className="post-short__info">
                <h2></h2>
                <div className="categories">
                    <h3></h3>
                    <h3></h3>
                </div>
            </div>
        </div>
    );
};

export default ShortPostSkeleton;