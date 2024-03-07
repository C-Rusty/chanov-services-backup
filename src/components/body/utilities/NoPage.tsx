import React from "react";
import '../../../styles/main/no-page.scss';
import { useTranslation } from "react-i18next";

const NoPage = () => {

    const { t } = useTranslation();

    return(
        <div className="no-page">
            <div className="container">
                <div className="error">
                    <p className="error__text">{t (`Uh-oh. Sorry, but there's no such page.`)}</p>
                    <a href="/" className="error__link">
                        {t (`Return`)}
                    </a>
                </div>
                <div className="img">
                    <img loading="lazy" src="../../../images\content\no-page\404.webp" alt="404-error" />
                </div>
            </div>
        </div>
    );
};

export default NoPage;
