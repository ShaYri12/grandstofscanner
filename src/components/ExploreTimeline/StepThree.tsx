import React, { useEffect } from "react";
import "./StepThree.css";
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
      <div className="contentthree">
        <div className="headerStepThree">
          <h2 className="subtitle">{t("exploreheader.stepThree.title")}</h2>
          <button className="remove-all-button">
            {t("exploreheader.stepThree.deleteEverything")}
          </button>
        </div>

        <div className="product-list">
          <div className="product-item">
            <h3> {t("exploreheader.stepThree.titleOne")}</h3>
            <button className="remove-button">
              <img src={Remove} alt="remove" />
            </button>
          </div>
          <div className="product-item">
            <h3>{t("exploreheader.stepThree.titleOne")}</h3>
            <button className="remove-button">
              <img src={Remove} alt="remove" />
            </button>
          </div>
        </div>

        <button className="continue-button">{t("exploreheader.stepThree.continue")}</button>
      </div>
    </div>
  );
};

export default StepThree;
