import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const de = require("../translations/de.json");

export const initTranslationFramework = () => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        de
      },
      lng: "de",
      fallbackLng: "de",

      interpolation: {
        escapeValue: false
      }
    });
};
