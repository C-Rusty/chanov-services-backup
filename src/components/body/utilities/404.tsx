import React from "react";
import '../../../styles/main/no-page.scss';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const NoPage = () => {

    const { t } = useTranslation();

    return(
        <React.Suspense fallback={<Loading/>}>
            <div className="no-page">
                <div className="container">
                    <div className="error">
                        <p className="error__text">{t (`Uh-oh. Sorry, but there's no such page.`)}</p>
                        <Link to="/" className="error__link">
                            {t (`Return`)}
                        </Link>
                    </div>
                    <div className="img">
                        <img loading="lazy" src="../../../images\content\no-page\404.webp" alt="404-error" />
                    </div>
                </div>
            </div>
        </React.Suspense>
    );
};

export default NoPage;