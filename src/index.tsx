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

const Header = React.lazy(() => import('./components/header/Header'));
const Content = React.lazy(() => import('./components/body/Content'));
const LegalDocsModal = React.lazy(() => import('./components/footer/utilities/Legal'));
const Footer = React.lazy(() => import('./components/footer/Footer'));

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