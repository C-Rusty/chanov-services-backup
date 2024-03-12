import React from "react";
import ViberLogo from "../logos/ViberLogo";
import '../../../styles/global/links/viber.scss';

const LinkViber = () => {
    return (
        <a href="viber://chat?number=%2B375291922247" className="viber">
            <ViberLogo/>
        </a>
    );
};

export default LinkViber;