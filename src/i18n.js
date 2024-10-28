import i18n from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import nlTranslations from "./locales/nl.json";

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    returnObjects: true,
    detection: {
      order: ["path", "cookie", "localStorage", "navigator", "htmlTag"],
      lookupFromPathIndex: 0, // Looks for the language in the first part of the URL path
    },
    resources: {
      en: {
        translation: enTranslations,
      },
      nl: {
        translation: nlTranslations,
      },
    },
  });

export default i18n;
