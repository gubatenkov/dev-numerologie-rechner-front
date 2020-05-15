import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LANGUAGES, LANGUAGE_KEY } from "./Constants";
const de = require("../translations/de.json");

export const initTranslationFramework = () => {
  let lang = getLocallyStoredLang();

  if (lang === null) {
    const browserLang = navigator.language;
    let activeLangObj = undefined;
    for (const langObj of LANGUAGES) {
      if (browserLang.includes(langObj.id)) {
        activeLangObj = langObj;
        break;
      }
    }
    if (activeLangObj === undefined) {
      activeLangObj = LANGUAGES[0];
    }
    lang = activeLangObj.id;
    localStorage.setItem(LANGUAGE_KEY, lang);
  }

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        de
      },
      lng: lang,
      fallbackLng: LANGUAGES[0].id,

      interpolation: {
        escapeValue: false
      }
    });
};

const getLocallyStoredLang = () => {
  const storedLang = localStorage.getItem(LANGUAGE_KEY);
  return storedLang;
};
