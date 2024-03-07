import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMobileState } from "../../../store/MenuOpenReducer";
import { setButton } from "../../../store/ButtonClickReducer";
import { IRootState } from "../../../store/store";
import { hideMobileMenu, showMobileMenu } from "../../../store/MobileMenuPositionReducer";

const MobileHamburger = () => {

    const isMobileMenuOpened = useSelector<IRootState, boolean>((state) => state.MenuStateReducer.isOpened);
    const dispatch = useDispatch();

    const handleHamburgerClick = () => {
        dispatch(setMobileState(!isMobileMenuOpened));
    };

    const handleMobileMenuState = () => {
        const hamburger = document.querySelector(`.hamburger`);
        const mobileMenu =  document.querySelector(`.mobile-menu`);
        const header = document.querySelector(`.header`)?.getBoundingClientRect();

        switch (isMobileMenuOpened) {
            case true:
                dispatch(setButton(`mobileMenu`));
                dispatch(showMobileMenu({scrollY: window.scrollY, headerHeight: header!.height, menu: mobileMenu}));

                hamburger?.classList.add(`hamburger-active`);
                mobileMenu?.classList.add(`opened`);

                document.body.style.overflowY = `hidden`
            break;
            case false: 
                dispatch(setButton(`none`));
                dispatch(hideMobileMenu({scrollY: window.scrollY, windowHeight: window.screen.height, headerHeight: header!.height, menu: mobileMenu}));
                
                hamburger?.classList.remove(`hamburger-active`);
                mobileMenu?.classList.remove(`opened`);

                document.body.style.overflowY = `auto`;
            break;

            default: break;
        };
    };

    useEffect(() => {
        handleMobileMenuState();
    }, [isMobileMenuOpened]);

    return (
        <div 
            className="hamburger" 
            onClick={handleHamburgerClick}
        >
            <div className="hamburger__line"></div>
            <div className="hamburger__line"></div>
            <div className="hamburger__line"></div>
        </div>
    );
};

export default MobileHamburger;