import React from "react";
import TelegramLogo from "../logos/TelegramLogo";
import '../../../styles/global/links/telegram.scss';

const LinkTelegram = () => {
    return (
        <a href="https://t.me/fadedDuck" className="telegram">
            <TelegramLogo/>
        </a>             
    );
};

export default LinkTelegram;