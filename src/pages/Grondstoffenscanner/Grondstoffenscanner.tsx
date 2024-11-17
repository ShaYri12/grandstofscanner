import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import styles from "./grondstoffenscanner.module.css";

interface GrondstoffenscannerParams {
  lang: string;
  [key: string]: string | undefined;
}

const Grondstoffenscanner: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<GrondstoffenscannerParams>();

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
      <div className={styles.innerContainer}>
        <div className={styles.texts}>
          <div className={styles.textsinner}>
            <nav className={styles.breadcrumb}>
              <Link to={`/${lang}/home`} className={styles.breadcrumbLink}>
                {t("grondstoffenscanner.breadcrumb.home")}
              </Link>
              <FaChevronRight className={styles.breadcrumbIcon} />
              <span className={styles.breadcrumbCurrent}>
                {t("grondstoffenscanner.breadcrumb.current")}
              </span>
            </nav>
            <div>
              <h2 className={styles.heading1}>
                {t("grondstoffenscanner.headings.heading1")}
              </h2>
              <p className={styles.para1}>
                {t("grondstoffenscanner.paragraphs.para1")}
              </p>
            </div>
            <div>
              <h2 className={styles.heading2}>
                {t("grondstoffenscanner.headings.heading2")}
              </h2>
              <div className={styles.videoWrapper}>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/c861pGgGNGk?si=9_y_hNUnmik_Qpg2"
                  title={
                    t("grondstoffenscanner.videoTitle") ||
                    "YouTube video player"
                  }
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div>
              <h2 className={styles.heading2}>
                {t("grondstoffenscanner.headings.heading2")}
              </h2>
              <p className={styles.para1}>
                {t("grondstoffenscanner.paragraphs.para2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grondstoffenscanner;
