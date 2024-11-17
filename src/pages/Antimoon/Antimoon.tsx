import React, { useEffect, useCallback } from "react";
import styles from "./Antimoon.module.css";
import { FaChevronRight, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Tooltip from "../../components/General/Tooltip/Tooltip";
import ExpandableSection from "../../components/PageSpecificComponents/Antimoon/AntimoonExpandables/ExpandableSection";
import AntimoonSideContent from "../../components/PageSpecificComponents/Antimoon/AntimoonSideContent/AntimoonSideContent";
import { IoMdMail } from "react-icons/io";

interface LangParams {
  lang: string;
  [key: string]: string | undefined;
}

const Antimoon: React.FC = () => {
  const { lang } = useParams<LangParams>();
  const { t } = useTranslation();

  const changeLanguage = useCallback(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  useEffect(() => {
    changeLanguage();
  }, [changeLanguage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to={`/${lang}/home`} className={styles.breadcrumbLink}>
            {t("productGroup.breadcrumb.home")}
          </Link>
          <FaChevronRight className={styles.breadcrumbIcon} />
          <Link to={`/${lang}/home`} className={styles.breadcrumbLink}>
            {t("productGroup.breadcrumb.exploreReview")}
          </Link>
          <FaChevronRight className={styles.breadcrumbIcon} />
          <span className={styles.breadcrumbCurrent}>
            {t("antimoon.antimony")}
          </span>
        </nav>

        <div className={styles.mainContent}>
          <div className={styles.grid}>
            <div className={styles.gridMain}>
              <div className={styles.header}>
                <div>
                  <h1 className={styles.subtitle}>{t("antimoon.factsheet")}</h1>
                  <div className={styles.titleContainer}>
                    <h2 className={styles.title}>{t("antimoon.antimony")}</h2>
                    <span className={styles.symbol}>Sb</span>
                  </div>
                </div>
                <Tooltip
                  title={t("antimoon.max_price_increase")}
                  text={t("antimoon.max_price_increase_text")}
                />
              </div>
              <p className={styles.description}>{t("antimoon.description")}</p>
              <div className={styles.infoBoxes}>
                <div className={styles.infoBox}>
                  <Tooltip
                    title={t("antimoon.max_price_increase")}
                    text={t("antimoon.max_price_increase_text")}
                    position="absolute"
                  />
                  <h3 className={styles.infoBoxTitle}>
                    {t("antimoon.price_volatility")}
                  </h3>
                  <p className={styles.infoBoxValue1}>+131%</p>
                </div>
                <div className={styles.infoBox}>
                  <Tooltip
                    title={t("antimoon.max_price_increase")}
                    text={t("antimoon.max_price_increase_text")}
                    position="absolute"
                  />
                  <h3 className={styles.infoBoxTitle}>
                    {t("antimoon.world_production")}
                  </h3>
                  <p className={styles.infoBoxValue2}>42.833 ton</p>
                </div>
              </div>
              <ExpandableSection />
              <div className={styles.share}>
                <p>{t("antimoon.share_page")}</p>
                <span>
                  <FaLinkedin />
                  <FaFacebookSquare />
                  <IoMdMail />
                </span>
              </div>
            </div>

            <AntimoonSideContent />
          </div>
           
        </div>
      </div>
    </div>
  );
};

export default Antimoon;
