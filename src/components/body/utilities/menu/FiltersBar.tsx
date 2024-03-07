import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryTagReducer } from "../../../../store/CategoryTagReducer";
import { setTypeTagReducer } from "../../../../store/TypeTagReducer";
import '../../../../styles/main/utilities/FiltersBar.scss';
import { IRootState } from "../../../../store/store";
import { setMobileState } from "../../../../store/MenuOpenReducer";

const FiltersBar = () => {

    const typeTagReducer = useSelector<IRootState, string>((state) => state.typeTag.chosen);
    const typeCategoryReducer = useSelector<IRootState, string>((state) => state.categoryTag.chosen);
    const deviceType = useSelector<IRootState, string>((state) => state.deviceType.screen);
    
    const dispatch = useDispatch();

    const [typeTag, setTypeTag] = useState<string>(typeTagReducer);
    const [categoryTag, setCategoryTag] = useState<string>(typeCategoryReducer);

    const { t } = useTranslation();

    const handleClickTag = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        
        if (e.currentTarget.parentElement?.classList.contains(`types-list`)) {
            removeClassFromTypeTag();

            const navItemClicked = e.currentTarget;
            document.getElementById(`${navItemClicked.id}`)!.classList.add(`active-type-tag`);

        } else if (e.currentTarget.parentElement?.classList.contains(`categories-list`)) {
            removeClassFromCategoryTag();

            const navItemClicked = e.currentTarget;
            document.getElementById(`${navItemClicked.id}`)?.classList.add(`active-category-tag`);
        };
    };

    useEffect(() => {
        if (deviceType === `desktop`) dispatch(setTypeTagReducer(typeTag));
    }, [typeTag]);

    useEffect(() => {
        if (deviceType === `desktop`) dispatch(setCategoryTagReducer(categoryTag));
    }, [categoryTag]);


    const handleTypeTagTap = () => {

        removeClassFromTypeTag();

        switch (typeTag) {
            case `All`:
                document.getElementById(`all-types`)!.classList.add(`active-type-tag`);
            break;
            case `Articles`:
                document.getElementById(typeTag.toLowerCase())!.classList.add(`active-type-tag`);
            break;
            case `Cases`:
                document.getElementById(typeTag.toLowerCase())!.classList.add(`active-type-tag`);
            break;

            default: break;
        };
    };

    const handleCategoryTagTap = () => {
        removeClassFromCategoryTag();

        switch (categoryTag) {
            case `All`:
                document.getElementById(`all-categories`)!.classList.add(`active-category-tag`);
            break;
            case `Marketing`:
                document.getElementById(categoryTag.toLowerCase())!.classList.add(`active-category-tag`);
            break;
            case `Strategy`:
                document.getElementById(categoryTag.toLowerCase())!.classList.add(`active-category-tag`);
            break;

            default: break;
        };
    };

    const removeClassFromTypeTag = () => {
        const currentActiveTypeTag = document.querySelector(`.active-type-tag`);
        currentActiveTypeTag?.classList.remove(`active-type-tag`);
    };

    const removeClassFromCategoryTag = () => {
        const currentActiveCategoryTag = document.querySelector(`.active-category-tag`);
        currentActiveCategoryTag?.classList.remove(`active-category-tag`);
    };

    useEffect(() => {
        handleTypeTagTap();
        handleCategoryTagTap();
    }, []);

    const handleApplyBtn = () => {
        if (deviceType === `mobile`) {
            dispatch(setTypeTagReducer(typeTag));
            dispatch(setCategoryTagReducer(categoryTag));
            dispatch(setMobileState(false));
        };
    };

    return (
        <>
            <nav className="nav-bar">
                <div className="nav-bar__types">
                    <span>{t (`Type`)}</span>
                    {/* <input type="file" name="" id=""
                        onChange={ (e) => handleUpload(e.target.files![0])}
                    /> */}
                    <ul className="list types-list">
                        <li
                            onClick={(e) => {
                                setTypeTag(`All`);
                                handleClickTag(e)
                            }}
                            id="all-types"
                            className="active-type-tag"
                        >{t (`All`)}</li>
                        <li
                            onClick={(e) => {
                                setTypeTag(`Articles`);
                                handleClickTag(e)
                            }}
                            id="articles"
                        >{t (`Articles`)}</li>
                        <li
                            onClick={(e) => {
                                setTypeTag(`Cases`);
                                handleClickTag(e)
                            }}
                            id="cases"
                        >{t (`Cases`)}</li>
                    </ul>
                </div>
                <div className="nav-bar__categories">
                    <span>{t (`Category`)}</span>
                    <ul className="list categories-list">
                        <li
                            onClick={(e) => {
                                setCategoryTag(`All`);
                                handleClickTag(e)
                            }}
                            id="all-categories"
                            className="active-category-tag"
                        >{t (`All`)}</li>
                        <li
                            onClick={(e) => {
                                setCategoryTag(`Marketing`)
                                handleClickTag(e)
                            }}
                            id="marketing"
                        >{t (`Marketing`)}</li>
                        <li
                            onClick={(e) => {
                                setCategoryTag(`Strategy`);
                                handleClickTag(e)
                            }}
                            id="strategy"
                        >{t (`Strategy development`)}</li>
                    </ul>
                </div>
            </nav>
            {deviceType === `mobile` && 
                <button onClick={handleApplyBtn}>{t (`Apply`)}</button>
            }
        </>

    );
};

export default FiltersBar;