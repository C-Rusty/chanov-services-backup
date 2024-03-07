import React from "react";
import i18n from "i18next";
import { initReactI18next} from 'react-i18next';
import LangEn from '../locales/en.json';
import LangRu from '../locales/ru.json';
import '../styles/App.scss';
import Header from "./header/Header";
import i18next from "i18next";
import Content from "./body/Content";
import { BrowserRouter } from "react-router-dom";
import Footer from "./footer/Footer";
import { Provider } from "react-redux";
import store from "../store/store";
import LegalDocsModal from "./footer/utilities/Legal";

const resources  = {
    en: {
        translation: LangEn
    },
    ru: {
        translation: LangRu
    }
};

const browserLang = navigator.language.split(`-`)[0];

i18n.use(initReactI18next).init({
    resources,
    lng: browserLang,
    fallbackLng: `en`,
    interpolation: {
        escapeValue: false
    }
});

i18next.on('languageChanged', (lng) => {
    document.documentElement.setAttribute('lang', lng);
});

const App = () => {
    
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Header/>
                <Content/>
                <LegalDocsModal/>
                <Footer/>
            </Provider>
        </BrowserRouter>
    );
};

export default App;
