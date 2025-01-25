import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation, useParams } from "react-router-dom";
import i18next from "i18next";

// Define a type for the expected footer translation strings
interface FooterTranslation {
  fone: string;
  ftwo: string;
  fthree: string;
  ffour: string;
}

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const footerTranslations = t("footer") as unknown; // Use unknown first
  const { fone, ftwo, fthree, ffour } = footerTranslations as FooterTranslation; // Then cast to FooterTranslation
  const { lang } = useParams<{ lang: string }>();

  // Use local state to handle lang updates
  const [currentLang, setCurrentLang] = useState<string | undefined>(lang);

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
      setCurrentLang(lang);
    } else if (!lang) {
      setCurrentLang(i18next.language);
    }
  }, [lang]);

  if (!currentLang) return null; // Avoid rendering before the language is set

  return (
    <div
      className={`${styles.footerWrapper} d-flex justify-content-start align-items-center`}
    >
      <ul
        className={`${styles.footerUl} d-flex justify-content-start align-items-center gap-4`}
      >
        <li className={`${styles.footerLi}`}>
          <NavLink
            to={`/${currentLang}/grondstoffenscanner`}
            className={
              location.pathname === `/${currentLang}/grondstoffenscanner`
                ? styles.linkActive
                : styles.link
            }
          >
            {fone}
          </NavLink>
        </li>
        <li className={`${styles.footerLi}`}>
          <NavLink
            to={`/${currentLang}/accessibility`}
            className={
              location.pathname === `/${currentLang}/accessibility`
                ? styles.linkActive
                : styles.link
            }
          >
            {ftwo}
          </NavLink>
        </li>
        <li className={`${styles.footerLi}`}>
          <NavLink
            to={`/${currentLang}/cookies`}
            className={
              location.pathname === `/${currentLang}/cookies`
                ? styles.linkActive
                : styles.link
            }
          >
            {fthree}
          </NavLink>
        </li>
        <li className={`${styles.footerLi}`}>
          <NavLink
            to={`/${currentLang}/privacy`}
            className={
              location.pathname === `/${currentLang}/privacy`
                ? styles.linkActive
                : styles.link
            }
          >
            {ffour}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
