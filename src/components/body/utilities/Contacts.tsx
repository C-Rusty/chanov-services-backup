import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import ContactForm from "./contacts/ContactForm";
import Loading from "./Loading";
import ModalNotice from "./contacts/ModalNotice";
import LinkViber from "../../../components/global/logo-links/LinkViber";
import LinkTelegram from "../../../components/global/logo-links/LinkTelegram";
import LinkWhatsApp from "../../../components/global/logo-links/LinkWhatsApp";
import '../../../styles/main/contacts.scss';

const Contacts = () => {

    const { t } = useTranslation();
    const deviceType = useSelector<IRootState, string>((state) => state.deviceType.screen);

    return(
        <React.Suspense fallback={<Loading/>}>
            <div className="contact-me">
                <div className="container">
                    <div className="contact-me__inner">
                        <h1>{t (`Contact with me`)}</h1>
                        <p>
                            {t (`Leave your contacts and I will contact you for a consultation`)}
                        </p>
                        {deviceType === `mobile` && <ContactForm/>}
                        <div className="contacts">
                            <a href="mailto:bfchanoff@gmail.com" className="contacts__mail">
                                <img loading="lazy" src="../../../images/content/contact-me/mail-icon.svg" alt="mail" />
                                <span>bfchanoff@gmail.com</span>
                            </a>
                            <div className="contacts__social-logos">
                                <LinkViber/>
                                <LinkTelegram/>
                                <LinkWhatsApp/>
                            </div>
                        </div>
                    </div>
                    {deviceType === `desktop` && <ContactForm/>}
                    <ModalNotice/>
                </div>
            </div>
        </React.Suspense>
    )
};

export default Contacts;