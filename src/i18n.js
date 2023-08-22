import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translationsEn, translationsDe } from "./Translations";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    de: { translation: translationsDe },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
