import React from "react";
import WhatsAppLogo from "../logos/WhatsAppLogo";
import '../../../styles/global/links/whatsApp.scss';

const LinkWhatsApp = () => {
    return (
        <a href="https://wa.me/375291922247" className="whats-app">
            <WhatsAppLogo/>
        </a>
    );
};

export default LinkWhatsApp;