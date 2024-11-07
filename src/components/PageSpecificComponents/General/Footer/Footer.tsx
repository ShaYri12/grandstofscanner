import React, { useEffect } from "react";
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

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <div
      className={`${styles.footerWrapper} d-flex justify-content-start align-items-center`}
    >
      <ul
        className={`${styles.footerUl} d-flex justify-content-start align-items-center gap-4`}
      >
        <li className={`${styles.footerLi}`}>
          <NavLink
            to={`/${lang}/grondstoffenscanner`}
            className={
              location.pathname === `/${lang}/grondstoffenscanner`
                ? styles.linkActive
                : styles.link
            }
          >
            {fone}
          </NavLink>
        </li>
        <li className={`${styles.footerLi}`}>{ftwo}</li>
        <li className={`${styles.footerLi}`}>{fthree}</li>
        <li className={`${styles.footerLi}`}>{ffour}</li>
      </ul>
    </div>
  );
};

export default Footer;
