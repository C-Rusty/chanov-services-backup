import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { setMobileState } from "../../../../store/MenuOpenReducer";
import { setButton } from "../../../../store/ButtonClickReducer";
import { useTranslation } from "react-i18next";

const MobileFilterBtn = () => {

    const { t } = useTranslation();

    const isMobileMenuOpened = useSelector<IRootState, boolean>((state) => state.MenuStateReducer.isOpened);
    const dispatch = useDispatch();

    const [isFilterBtnClicked, setIsFilterBtnClicked] = useState<boolean>(false);

    const handleFilterClick = () => {
        setIsFilterBtnClicked(true);
    };

    useEffect(() => {
        if (isFilterBtnClicked) dispatch(setMobileState(!isMobileMenuOpened));
    
        switch (isMobileMenuOpened) {
            case true:
                // bug -> if isMobileMenuOpened = button = mobile menu and only then = mobileFilters
                dispatch(setButton(`mobileFilters`));
                break;
            case false: 
                dispatch(setButton(`none`));
                setIsFilterBtnClicked(false);
                break;
            default:
                break;
        };
    }, [isFilterBtnClicked]);

    return (
        <div className="filters">
            <button 
                className="filters__inner" 
                onClick={handleFilterClick}
            >
                <img loading="lazy" src="../../../images/content/articles-cases/filter-menu.svg" alt="filters" />
                <span>{t (`Filters`)}</span>
            </button>
    </div>
    );
};

export default MobileFilterBtn;