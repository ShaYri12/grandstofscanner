import styles from "./Landinfo.module.css";
import { Link, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import LandinfoTableArea from "../../components/LandinfoTableArea/LandinfoTableArea";
import i18next from "i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Landinfo() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

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
}
