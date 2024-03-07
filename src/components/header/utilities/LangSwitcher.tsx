import React from "react";
import {useTranslation} from 'react-i18next';
import LangIcon from "./LangIcon";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../../../styles/head/header-utilities/LangSwitcher.scss';
import { FormControl} from "@mui/material";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { setMobileState } from "../../../store/MenuOpenReducer";

const LangSwitcher = () => {

    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    const deviceType = useSelector<IRootState, string>((state) => state.deviceType.screen);
    
    const handleLangSwitch = (e: {target: { value: string; }} ) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang);
    };

    const handleMobileTap = (selectedLang: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        i18n.changeLanguage(selectedLang);

        const currentActiveItem = document.querySelector(`.active-lang`);
        currentActiveItem?.classList.remove(`active-lang`);

        const navItemClicked = e.currentTarget;
        document.getElementById(`${navItemClicked.id}`)?.classList.add(`active-lang`);

        dispatch(setMobileState(false));
    };

    const handleSelectOpen = () => {
        document.querySelector(`.select`)?.classList.add(`select-active`);
    };
    const handleSelectClose = () => {
        document.querySelector(`.select`)?.classList.remove(`select-active`);
    };

    return (
        <div className={`lang-switcher lang-switcher-${deviceType}`}>
            {deviceType === `desktop` ? 
                <FormControl className="form">
                    <Select
                        className="select" 
                        value={i18n.language} 
                        onChange={handleLangSwitch}
                        onOpen={handleSelectOpen}
                        onClose={handleSelectClose}
                        IconComponent={LangIcon}
                        MenuProps={{
                            disableScrollLock: true,
                            }}
                        sx={{ 
                            ".MuiOutlinedInput-notchedOutline": { border: 0 },
                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { border: 0, },
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0, },
                            fontSize: `1.8rem`
                        }}
                    >
                        <MenuItem 
                            value="en"
                            sx={{
                                display: `flex`, justifyContent: `center`, alignItems: `center`,  width: `6rem`, height: `5.5rem`, padding: `2rem`, minWidth: `100%`, background: `#F3F3F3 !important`, transition: `all .5s`, ":hover": `#F3F3F3`, fontSize: `1.8rem`, fontFamily: `PT Sans`
                            }}
                            className="en"
                        >EN</MenuItem>
                        <MenuItem 
                            value="ru"
                            sx={{
                                display: `flex`, justifyContent: `center`, alignItems: `center`,  width: `6rem`, height: `5.5rem`, padding: `2rem`, minWidth: `100%`, background: `#F3F3F3 !important`, transition: `all .5s`, ":hover": `#F3F3F3`, fontSize: `1.8rem`, fontFamily: `PT Sans`
                            }}
                            className="ru"
                        >RU</MenuItem>
                    </Select>
                </FormControl>
                :
                <>
                    <div className={`lang-switcher-${deviceType}__headline`}>
                        {t (`Language`)}
                    </div>
                    <div className={`lang-switcher-${deviceType}__options`}>
                        <span 
                            className="option active-lang" 
                            id={`${deviceType}-en`}
                            onClick={(e) => handleMobileTap(`en`, e)}
                        >
                            {t (`English`)}
                        </span>
                        <span 
                            className="option"
                            id={`${deviceType}-ru`}
                            onClick={(e) => handleMobileTap(`ru`, e)}
                        >
                            {t (`Russian`)}
                        </span>
                    </div>
                </>
            }
        </div>
    )
};

export default LangSwitcher;