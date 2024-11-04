import React, { useEffect } from "react";
import styles from "./StepThree.module.css";
import Remove from "../../assets/remove.svg";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const StepThree: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);
  return (
    <div className="timeline-item">
      <div className={styles.contentthree}>
        <div className={styles.headerStepThree}>
          <h2 className={styles.subtitle}>{t("exploreheader.stepThree.title")}</h2>
          <button className={styles.removeAllButton}>
            {t("exploreheader.stepThree.deleteEverything")}
          </button>
        </div>

        <div className={styles.productList}>
          <div className={styles.productItem}>
            <h3> {t("exploreheader.stepThree.titleOne")}</h3>
            <button className={styles.removeButton}>
              <img src={Remove} alt="remove" />
            </button>
          </div>
          <div className={styles.productItem}>
            <h3>{t("exploreheader.stepThree.titleOne")}</h3>
            <button className={styles.removeButton}>
              <img src={Remove} alt="remove" />
            </button>
          </div>
        </div>

        <button className={styles.continueButton}>{t("exploreheader.stepThree.continue")}</button>
      </div>
    </div>
  );
};

export default StepThree;
