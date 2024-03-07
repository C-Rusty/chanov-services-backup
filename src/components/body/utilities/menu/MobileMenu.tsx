import React  from "react";
import NavBar from "../../../header/utilities/Navigation";
import LangSwitcher from "../../../header/utilities/LangSwitcher";
import '../../../../styles/head/header-utilities/mobile-menu.scss';

const MobileMenu = () => {

    return (
        <>
            <NavBar/>
            <LangSwitcher/>
        </>
    );
};

export default MobileMenu;