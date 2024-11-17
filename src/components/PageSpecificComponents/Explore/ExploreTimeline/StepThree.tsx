import React, { useEffect, useCallback } from "react";
import styles from "./StepThree.module.css";
import Remove from "../../../../assets/remove.svg";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import UniversalButton from "../../../General/Buttons";

interface StepThreeParams {
  lang: string;
  [key: string]: string | undefined;
}

const StepThree: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<StepThreeParams>();

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  const handleDeleteEverything = useCallback(() => {}, []);

  const handleRemoveItem = useCallback(() => {}, []);

  const handleContinue = useCallback(() => {}, []);

  return (
    <div className="timeline-item">
      <div className={styles.contentthree}>
        <div className={styles.headerStepThree}>
          <h2 className={styles.subtitle}>
            {t("exploreheader.stepThree.title")}
          </h2>
          <UniversalButton
            onClick={handleDeleteEverything}
            customClass={styles.removeAllButton}
          >
            {t("exploreheader.stepThree.deleteEverything")}
          </UniversalButton>
        </div>

        <div className={styles.productList}>
          <div className={styles.productItem}>
            <h3> {t("exploreheader.stepThree.titleOne")}</h3>
            <UniversalButton
              onClick={handleRemoveItem}
              customClass={styles.removeButton}
            >
              <img src={Remove} alt="remove" />
            </UniversalButton>
          </div>
          <div className={styles.productItem}>
            <h3>{t("exploreheader.stepThree.titleOne")}</h3>
            <UniversalButton
              onClick={handleRemoveItem}
              customClass={styles.removeButton}
            >
              <img src={Remove} alt="remove" />
            </UniversalButton>
          </div>
        </div>

        <UniversalButton
          onClick={handleContinue}
          customClass={styles.continueButton}
        >
          {t("exploreheader.stepThree.continue")}
        </UniversalButton>
      </div>
    </div>
  );
};

export default StepThree;
