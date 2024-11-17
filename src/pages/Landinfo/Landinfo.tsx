import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import LandinfoTableArea from "../../components/PageSpecificComponents/LandInfo/LandinfoTableArea/LandinfoTableArea";
import styles from "./Landinfo.module.css";

interface LangParam extends Record<string, string | undefined> {
  lang: string;
}

const Landinfo: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<LangParam>();

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.texts}>
        <div className={styles.textsinner}>
          <nav className={styles.breadcrumb}>
            <Link to={`/${lang}/home`} className={styles.breadcrumbLink}>
              {t("landinfo.breadcrumb.home")}
            </Link>
            <FaChevronRight className={styles.breadcrumbIcon} />
            <span className={styles.breadcrumbCurrent}>
              {t("landinfo.breadcrumb.current")}
            </span>
          </nav>
          <div>
            <h2 className={styles.heading1}>{t("landinfo.heading")}</h2>
            <p className={styles.para1}>{t("landinfo.description")}</p>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <LandinfoTableArea />
      </div>
    </section>
  );
};

export default Landinfo;
