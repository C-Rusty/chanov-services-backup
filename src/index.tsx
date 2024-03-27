import React from "react";
import i18n from "i18next";
import { I18nextProvider, initReactI18next} from 'react-i18next';
import LangEn from './locales/en.json';
import LangRu from './locales/ru.json';
import './styles/App.scss';
import i18next from "i18next";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { createRoot } from 'react-dom/client';

const Header = React.lazy(() => import('./components/header/Header'));
const Content = React.lazy(() => import('./components/body/Content'));
const LegalDocsModal = React.lazy(() => import('./components/footer/utilities/Legal'));
const Footer = React.lazy(() => import('./components/footer/Footer'));

const setPageLang = () => {
    const langOptions = /\b(?:ru|en)\b/g;
    const allCookies = document.cookie; 
    
    if (allCookies.match(langOptions)) {
        return document.cookie.match(langOptions)![0];
    } else  {
        return `en`;
    };
};

const pageLang = setPageLang();

i18next.init({
    interpolation: {escapeValue: false}
});

const resources  = {
    en: {
        translation: LangEn
    },
    ru: {
        translation: LangRu
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: pageLang,
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
        <React.StrictMode>
            <I18nextProvider i18n={i18next}>
                <BrowserRouter>
                    <Provider store={store}>
                        <Header/>
                        <Content/>
                        <LegalDocsModal/>
                        <Footer/>
                    </Provider>
                </BrowserRouter>
            </I18nextProvider>
        </React.StrictMode>
    );
};

const container = document.getElementById('root');
if (!container) throw new Error (`#root is not found`);

const root = createRoot(container!);
root.render(<App />);