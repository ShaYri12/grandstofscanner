import React, { useEffect } from "react";
import "./StepTwo.css";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import UniversalButton from "../../../../components/General/Buttons";
import { MainTreeItemModel } from "../../Models/MainTreeItemModel";
import CategoryMainNodes from "./CategoryMainNodes/CategotyMainNodes";
import style from "./StepTwo.module.css";

interface LangParam {
  lang: string;
}

interface StepTwoProps {
  showStepThree: () => void,
  searchResults: MainTreeItemModel[];
}

interface LangParam extends Record<string, string | undefined> {
  lang: string;
}

const StepTwo: React.FC<StepTwoProps> = ({ showStepThree, searchResults }) => {
  const { t } = useTranslation();
  const { lang } = useParams<LangParam>();
  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <div className="timeline-item">
      <div className={style.stepTwo}>
        <h2 className="subtitle">{t("exploreheader.stepTwo.title")}</h2>
        <p className="description">{t("exploreheader.stepTwo.para")}</p>
      </div>
      <div className="step-container">
        <div className="result-card">
          <h4>{t("exploreheader.stepTwo.paraTwo")}</h4>
          <UniversalButton
            onClick={showStepThree}
            customClass={style.viewButton}
          >
            {t("exploreheader.stepTwo.tolookit")}
          </UniversalButton>
        </div>
        <div className="cat-container">
          <div className="main-cat">
            <CategoryMainNodes searchResults={searchResults} showStepThree={showStepThree} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;

