import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./dbConfig";
import { getToken, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

export const _reCaptchaApiKey: string = `6LdNm4opAAAAABu9Yy_NJyB4QaKG580xfL6ZudHO`;

const app = initializeApp(firebaseConfig);

const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(_reCaptchaApiKey),
    isTokenAutoRefreshEnabled: true
});

export const checkToken = async () => {
    try {
        return await getToken(appCheck);
    } catch (error) {
        return `error`;
    };
};