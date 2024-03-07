import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import FiltersBar from "./FiltersBar";
import MobileMenu from "./MobileMenu";

const MobileMenuContainer = () => {

    const buttonClicked = useSelector<IRootState, string>((state) => state.buttonClicked.button);
    const screen: string = useSelector<IRootState, string>((state) => state.deviceType.screen);

    const [openedMenuComponent, setOpenedMenuComponent] = useState<`mobileMenu` | `mobileFilters` | `none`>(`none`);

    useEffect(() => {
        if (buttonClicked === `mobileMenu`) {
            setOpenedMenuComponent(`mobileMenu`);
        } else if (buttonClicked === `mobileFilters`) {
            setOpenedMenuComponent(`mobileFilters`);
        };
    }, [buttonClicked]);

    useEffect(() => {
        if (screen === `mobile`) setHiddenMenuPositionBehavior();
    }, [screen]);

    function setHiddenMenuPositionBehavior() {
        const menu: HTMLDivElement | null = document.querySelector(`.mobile-menu`);

        if (menu) {
            const header = document.querySelector(`.header`)!.getBoundingClientRect();
            window.addEventListener(`scroll`, () => setHiddenMenuPosition(window.scrollY, window.screen.height, header.height, menu));
        };
    };

    function setHiddenMenuPosition (windowScrollPosition: number, windowHeight: number, headerHeight: number, menu: HTMLDivElement) {
        menu.style.top = `${windowScrollPosition - windowHeight + headerHeight}px`;
    };

    return (
        <div className="mobile-menu">
            {
                buttonClicked === `mobileMenu` ? <MobileMenu/>
                : buttonClicked === `mobileFilters` ? <FiltersBar/>
                : 
                    <>
                        {openedMenuComponent === `mobileMenu` ? 
                            <MobileMenu/>
                            :
                            <FiltersBar/>
                        }
                    </>
            }
        </div>
    );
};

export default MobileMenuContainer;