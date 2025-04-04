import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Navbar.module.css";
import LanguageSelector from "../language-selector";
import NavbarSearch from "../NavbarSearch/NavbarSearch";
import { useTranslation } from "react-i18next";
import { IoMenu } from "react-icons/io5";
import Drawer from "./Drawer";
import i18next from "i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const h1one = t("header1.h1one") as string;
  const h1two = t("header1.h1two") as string;
  const h2one = t("header2.h2one") as string;
  const h2two = t("header2.h2two") as string;
  const h2three = t("header2.h2three") as string;
  const h2four = t("header2.h2four") as string;
  const h2btn1 = t("header2.h2btn1") as string;
  const h2btn2 = t("header2.h2btn2") as string;
  const faq = "FAQs" as string;
  const browse = t("header2.browse") as string;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("i18nextLng") || i18next.language
  );
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    // Update currentLang when URL param or i18next language changes
    if (lang) {
      setCurrentLang(lang);
    } else if (localStorage.getItem("i18nextLng")) {
      setCurrentLang(localStorage.getItem("i18nextLng") || i18next.language);
    }
  }, [lang, i18next.language]);

  const links = [
    { path: `/${currentLang}/home`, label: h2one },
    { path: `/${currentLang}/browse`, label: browse },
    { path: `/${currentLang}/about`, label: h2two },
    { path: `/${currentLang}/trade`, label: h2three },
    { path: `/${currentLang}/landinfo`, label: h2four },
    { path: `/${currentLang}/faq`, label: faq },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navLabel} py-2 d-flex justify-content-between`}>
        <div className={styles.navMaxWidth}>
          <div className="text-white fw-bolder d-flex align-items-center">
            <span className={styles.navLabelText}>{h1one}</span>
            <span className="d-flex align-items-center">
              <img
                className={styles.flagImg}
                src={
                  h1two.startsWith("EN")
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTERnbE2vj5IueStB7LDbcN0TSrOcJSF6o9Jg&s"
                    : h1two.startsWith("NL")
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiFFZN3Ee-yph_FyJWXQII9-rTs8dRwSS4kQ&s"
                    : ""
                }
                alt=""
              />
            </span>
            <span className={styles.navLabelText}>{h1two}</span>
          </div>
          <div className="navLabelRight">
            <LanguageSelector txtclr="text-white" txtclr2="white" />
          </div>
        </div>
      </div>

      <div
        className={`${styles.navBottom} d-flex justify-content-between align-items-center`}
      >
        <div className={styles.navMaxWidth}>
          <div className={styles.navBottomLeft}>
            <Link to={`/${currentLang}/home`} className={styles.logoText}>
              <img src="/logo.png" alt="Logo" />
            </Link>
            <div
              className={`${styles.navLeft} d-flex align-items-center gap-1`}
            >
              <ul className={`d-flex ${styles.navLinks}`}>
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={
                        location.pathname === link.path
                          ? styles.linkActive
                          : styles.link
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Add search component to navbar */}
              <NavbarSearch className={styles.navbarSearch} />
            </div>
            <IoMenu className={styles.menuIcon} onClick={toggleDrawer} />
          </div>
          <div className={`${styles.navRight} gap-2 d-flex`}>
            <Link
              to={`/${currentLang}/register`}
              className={`rounded-2 border-none outline-none ${styles.navButton1}`}
            >
              {h2btn1}
            </Link>
            <Link
              to={`/${currentLang}/login`}
              className={`rounded-2 border-none outline-none ${styles.navButton2}`}
            >
              {h2btn2}
            </Link>
          </div>
        </div>
      </div>

      {/* Drawer for mobile menu */}
      <Drawer
        active={isDrawerOpen}
        onClose={toggleDrawer}
        links={links}
        activePath={location.pathname} // Pass the active path to the Drawer
        loginText={h2btn1}
        registerText={h2btn2}
        currentLang={currentLang}
      />
    </nav>
  );
};

export default Navbar;
