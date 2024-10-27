import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import LanguageSelector from "../language-selector";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  // Type assertion for translated values as strings
  const h1one = t("header1.h1one") as string;
  const h1two = t("header1.h1two") as string;
  const h2one = t("header2.h2one") as string;
  const h2two = t("header2.h2two") as string;
  const h2three = t("header2.h2three") as string;
  const h2four = t("header2.h2four") as string;
  const h2btn1 = t("header2.h2btn1") as string;
  const h2btn2 = t("header2.h2btn2") as string;

  const [active, setActive] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div
        className={`${styles.hiddennav} ${
          active ? styles.transform0 : styles.transform1
        }`}
      >
        <div
          className={`${styles.hiddennavheader} d-flex justify-content-between align-items-center`}
        >
          <div className="d-flex gap-3 align-items-center">
            <i
              className={`${styles.hnavicon} fa-solid fa-xmark`}
              onClick={() => setActive(!active)}
            ></i>
            <p className={`${styles.hnavheading} m-0`}>Sluiten</p>
          </div>
          <LanguageSelector txtclr="text-black" txtclr2="black" />
        </div>
        <div className={styles.hiddenNavCenter}>
          <ul className={`d-flex flex-column gap-5 ${styles.navLinks}`}>
            <li>
              <Link to={`/en/home`} className={styles.linkActive}>
                {h2one}
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.link}>
                {h2two}
              </Link>
            </li>
            <li>
              <Link to="/contact" className={styles.link}>
                {h2three}
              </Link>
            </li>
            <li>
              <Link to="/contact" className={styles.link}>
                {h2four}
              </Link>
            </li>
          </ul>
        </div>
        <button className={styles.card2mblbtn2}>Register</button>
        <button className={styles.card2mblbtn1}>Login</button>
      </div>

      <div className={`${styles.navLabel} py-2 d-flex justify-content-between`}>
        <div className="navLabelLeft text-white fs-6 fw-bolder d-flex align-items-center">
          {h1one}
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
          {h1two}
          <span>
            <form>
              <select
                className="bg-transparent no-outline border-0 text-white"
                id="cars"
                name="cars"
              >
                <option value="audi"></option>
              </select>
            </form>
          </span>
        </div>
        <div className="navLabelRight">
          <LanguageSelector txtclr="text-white" txtclr2="white" />
        </div>
      </div>

      <div
        className={`${styles.navBottom} d-flex justify-content-between align-items-center`}
      >
        <i
          className={`fa-solid fa-bars ${styles.navicon}`}
          onClick={() => setActive(!active)}
        ></i>
        <div className={styles.navBottomLeft}>
          <h1 className={`${styles.mblnavlogo} ${styles.heroHeading}`}>
            Grondstoffen <br /> scanner
          </h1>
          <span className={styles.logoText}>
            <img src="/logo.png" alt="Logo" />
          </span>
          <div className={`${styles.navLeft} d-flex align-items-center gap-5`}>
            <ul className={`d-flex gap-3 ${styles.navLinks}`}>
              <li>
                <Link to={`/en/home`} className={styles.linkActive}>
                  {h2one}
                </Link>
              </li>
              <li>
                <Link to="/about" className={styles.link}>
                  {h2two}
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.link}>
                  {h2three}
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.link}>
                  {h2four}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={`${styles.navRight} gap-2 d-flex`}>
          <span
            className={`rounded-2 border-none outline-none ${styles.navButton1}`}
          >
            {h2btn1}
          </span>
          <span
            className={`rounded-2 border-none outline-none ${styles.navButton2}`}
          >
            {h2btn2}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
