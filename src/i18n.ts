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
      order: ["localStorage", "path", "cookie", "navigator", "htmlTag"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    resources: {
      en: {
        translation: enTranslations as Record<string, unknown>,
      },
      nl: {
        translation: nlTranslations as Record<string, unknown>,
      },
    },
  });

const storedLang = localStorage.getItem("i18nextLng");
if (storedLang && window.location.pathname.split("/")[1] !== storedLang) {
  const pathParts = window.location.pathname.split("/");
  if (pathParts.length > 1) {
    pathParts[1] = storedLang;
    setTimeout(() => {
      if (window.location.pathname.split("/")[1] !== storedLang) {
        window.history.replaceState(null, "", pathParts.join("/"));
      }
    }, 0);
  }
}

export default i18n;
