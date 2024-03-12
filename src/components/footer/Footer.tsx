import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import '../../styles/footer/Footer.scss';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModalState } from "../../store/ModalLegalReducer";
import LinkTelegram from "../../components/global/logo-links/LinkTelegram";
import LinkViber from "../../components/global/logo-links/LinkViber";
import LinkWhatsApp from "../../components/global/logo-links/LinkWhatsApp";

const Footer = () => {

    const { t } = useTranslation();
    const location = useLocation();

    const [isContactPage, setIsContactPage] = useState<boolean>(false);

    const dispatch = useDispatch();

    const openLegalModal = () => {
        dispatch(setModalState(true));
    };

    useEffect(() => {
        if (location.pathname.includes(`contacts`)) {
            setIsContactPage(true);
            document.querySelector(`.authors`)?.classList.add(`alone`);
        } else {
            setIsContactPage(false);
            document.querySelector(`.authors`)?.classList.remove(`alone`);
        }
    }, [location]);

    return (
        <footer>
            <div className="container">
                {!isContactPage &&
                    <div className="contacts">
                        <div className="contacts__email">
                            <a href="mailto:bfchanoff@gmail.com">bfchanoff@gmail.com</a>
                        </div>
                        <div className="contacts__icons">
                                <LinkViber/>
                                <LinkTelegram/>
                                <LinkWhatsApp/>
                        </div>
                    </div>
                }
                <div className="authors">
                    <div className="authors__author">
                        <span>{t (`Designer`)}:</span>
                        <a href="https://www.behance.net/mariashkrabo">{t (`Maria Shkrabo`)}</a>
                    </div>
                    <div className="authors__author">
                        <span>{t (`Programmer`)}:</span>
                        <a href="https://www.linkedin.com/in/rostislavchanov/">{t (`Rostislav Chanov`)}</a>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="legal">
                    <a className="legal__link" onClick={openLegalModal}>{t (`Privacy And Data Protection Policy`)}</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;