import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ViberLogo from "../../../components/footer/utilities/ViberLogo";
import TelegramLogo from "../../../components/footer/utilities/TelegramLogo";
import WhatsAppLogo from "../../../components/footer/utilities/WhatsAppLogo";
import '../../../styles/main/contacts.scss';
import ContactForm from "./contacts/ContactForm";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import Loading from "./Loading";
import ModalNotice from "./contacts/ModalNotice";
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
                                <a href="viber://chat?number=%2B3752961019786">
                                    <ViberLogo/>
                                </a>
                                <a href="https://t.me/Aleg_Ch">
                                    <TelegramLogo/>
                                </a>                        
                                <a href="https://wa.me/48505025186">
                                    <WhatsAppLogo/>
                                </a>
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