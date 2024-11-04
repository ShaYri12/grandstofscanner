import { useState } from "react";
import styles from "./ExpandableSection.module.css";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import RiskIndicators from "../RiskIndicators/RiskIndicators";
import { useTranslation } from "react-i18next";
import ImportCountryInformation from "../ImportCountryInformation/ImportCountryInformation";

const ExpandableSection = () => {
  const { t } = useTranslation();
  const [showImportInfo, setShowImportInfo] = useState(false);
  const [showPriceInfo, setShowPriceInfo] = useState(false);
  const [showIMVOInfo, setShowIMVOInfo] = useState(false);
  const [showRiskIndicatorsInfo, setShowRiskIndicatorsInfo] = useState(false);

  const sections = [
    {
      title: t("antimoon.expandableSection.import_country_info"), // Translated title
      showInfo: showImportInfo,
      toggleInfo: () => setShowImportInfo((prev) => !prev),
      content: (
        <p>
          {t("antimoon.expandableSection.import_country_info_description")}{" "}
          {/* Translated content */}
        </p>
      ),
      expandedContent: <ImportCountryInformation />,
    },
    {
      title: t("antimoon.expandableSection.price_fluctuation"), // Translated title
      showInfo: showPriceInfo,
      toggleInfo: () => setShowPriceInfo((prev) => !prev),
      content: (
        <p>
          {t("antimoon.expandableSection.price_fluctuation_description")}{" "}
          {/* Translated content */}
        </p>
      ),
      expandedContent: (
        <p>
          {t("antimoon.expandableSection.price_trends_description")}{" "}
          {/* Translated content */}
        </p>
      ),
    },
    {
      title: t("antimoon.expandableSection.IMVO"), // Translated title
      showInfo: showIMVOInfo,
      toggleInfo: () => setShowIMVOInfo((prev) => !prev),
      content: (
        <p>
          {t("antimoon.expandableSection.import_country_info_description")}{" "}
          {/* Reuse the description */}
        </p>
      ),
      expandedContent: (
        <>
          <p>{t("antimoon.expandableSection.price_trends_description")}</p>
          <p>
            {t("antimoon.expandableSection.import_country_info_description")}
          </p>
        </>
      ),
    },
    {
      title: t("antimoon.expandableSection.risk_indicators"), // Translated title
      showInfo: showRiskIndicatorsInfo,
      toggleInfo: () => setShowRiskIndicatorsInfo((prev) => !prev),
      content: (
        <p>
          {t("antimoon.expandableSection.import_country_info_description")}{" "}
          {/* Reuse the description */}
        </p>
      ),
      expandedContent: <RiskIndicators />,
    },
  ];

  return (
    <div className={styles.expandableSections}>
      <button className={styles.expandAll}>
        {t("antimoon.expandableSection.expand_all")}
      </button>{" "}
      {/* Translated button */}
      {sections.map(
        ({ title, showInfo, toggleInfo, content, expandedContent }, index) => (
          <div key={index} className={styles.expandableBox}>
            <button onClick={toggleInfo} className={styles.expandableButton}>
              <h3 className={styles.expandableTitle}>{title}</h3>
              <span>
                {showInfo ? (
                  <IoChevronUp className={styles.chevronIcon} />
                ) : (
                  <IoChevronDown className={styles.chevronIcon} />
                )}
              </span>
            </button>
            <div className={styles.expandableContent}>{content}</div>
            {showInfo ? (
              <div className={styles.expandableContent}>{expandedContent}</div>
            ) : (
              <div className={styles.expandableContent}>...</div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ExpandableSection;
