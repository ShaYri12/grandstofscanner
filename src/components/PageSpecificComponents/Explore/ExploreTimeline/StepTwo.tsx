import React, { useEffect } from "react";
import "./TimelineSearch.css";
import Arrow from "../../../../assets/faq-btn.svg";
import "./StepTwo.css";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import UniversalButton from "../../../General/Buttons";

interface StepTwoProps {
  showStepThree: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ showStepThree }) => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);
  return (
    <div className="timeline-item">
      <div className="step-two">
        <h2 className="subtitle">{t("exploreheader.stepTwo.title")}</h2>
        <p className="description">{t("exploreheader.stepTwo.para")}</p>
      </div>
      <div className="step-container">
        <div className="result-card">
          <h4>{t("exploreheader.stepTwo.paraTwo")}</h4>
          <UniversalButton
            onClick={showStepThree}
            customClass="custom-button-two"
          >
            {t("exploreheader.stepTwo.tolookit")}
          </UniversalButton>
        </div>

        <div className="faqContainer">
          <div className="main-faq">
            <div>
              <div className="faq-one">
                <h3 className="faq-title">
                  {t("exploreheader.stepTwo.titleOne")}
                </h3>
                <UniversalButton onClick={() => {}} customClass="arrow-btn">
                  <img src={Arrow} alt="arrow" />
                </UniversalButton>
              </div>
              <div className="faq-two">
                <h3 className="faq-title">
                  {t("exploreheader.stepTwo.titleOne")}
                </h3>
                <UniversalButton onClick={() => {}} customClass="arrow-btn">
                  <img src={Arrow} alt="arrow" />
                </UniversalButton>
              </div>
              <div className="three-faq-container">
                <div className="faq-three-main">
                  <div className="faq-three">
                    <h3 className="faq-title">
                      {t("exploreheader.stepTwo.titleTwo")}
                    </h3>
                    <UniversalButton onClick={() => {}} customClass="arrow-btn">
                      <img src={Arrow} alt="arrow" />
                    </UniversalButton>
                  </div>
                  <div className="last-faq-container">
                    <div className="faq-last">
                      <h3 className="faq-title">
                        {t("exploreheader.stepTwo.titleThree")}
                      </h3>
                      <div className="btns">
                        <UniversalButton
                          onClick={showStepThree}
                          customClass="btn-one"
                        >
                          {t("exploreheader.stepTwo.viewFactSheet")}
                        </UniversalButton>

                        <UniversalButton
                          onClick={showStepThree}
                          customClass="btn-two"
                        >
                          {t("exploreheader.stepTwo.add")}
                        </UniversalButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
