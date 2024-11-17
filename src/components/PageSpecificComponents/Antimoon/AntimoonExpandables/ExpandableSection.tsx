import { useState, useCallback } from "react";
import styles from "./ExpandableSection.module.css";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import RiskIndicators from "../RiskIndicators/RiskIndicators";
import { useTranslation } from "react-i18next";
import ImportCountryInformation from "../../General/ImportCountryInformation/ImportCountryInformation";
import PhaseTable from "../PhaseTables/PhaseTables";

interface Section {
  title: string;
  showInfo: boolean;
  toggleInfo: () => void;
  content: JSX.Element;
  expandedContent: JSX.Element;
}

const ExpandableSection: React.FC = () => {
  const { t } = useTranslation();

  const [sectionsVisibility, setSectionsVisibility] = useState({
    importInfo: false,
    priceInfo: false,
    IMVOInfo: false,
    riskIndicatorsInfo: false,
  });

  const toggleSectionVisibility = useCallback(
    (section: keyof typeof sectionsVisibility) => {
      setSectionsVisibility((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    },
    []
  );

  const expandAll = useCallback(() => {
    setSectionsVisibility({
      importInfo: true,
      priceInfo: true,
      IMVOInfo: true,
      riskIndicatorsInfo: true,
    });
  }, []);

  // Define the sections
  const sections: Section[] = [
    {
      title: t("antimoon.expandableSection.import_country_info"),
      showInfo: sectionsVisibility.importInfo,
      toggleInfo: () => toggleSectionVisibility("importInfo"),
      content: (
        <p>{t("antimoon.expandableSection.import_country_info_description")}</p>
      ),
      expandedContent: <ImportCountryInformation />,
    },
    {
      title: t("antimoon.expandableSection.price_fluctuation"),
      showInfo: sectionsVisibility.priceInfo,
      toggleInfo: () => toggleSectionVisibility("priceInfo"),
      content: (
        <p>{t("antimoon.expandableSection.price_fluctuation_description")}</p>
      ),
      expandedContent: (
        <p>{t("antimoon.expandableSection.price_trends_description")}</p>
      ),
    },
    {
      title: t("antimoon.expandableSection.chains"),
      showInfo: sectionsVisibility.priceInfo,
      toggleInfo: () => toggleSectionVisibility("priceInfo"),
      content: (
        <p>{t("antimoon.expandableSection.chains")}</p>
      ),
      expandedContent: (
        <PhaseTable/>
      ),
    },
    {
      title: t("antimoon.expandableSection.IMVO"),
      showInfo: sectionsVisibility.IMVOInfo,
      toggleInfo: () => toggleSectionVisibility("IMVOInfo"),
      content: (
        <p>{t("antimoon.expandableSection.import_country_info_description")}</p>
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
      title: t("antimoon.expandableSection.risk_indicators"),
      showInfo: sectionsVisibility.riskIndicatorsInfo,
      toggleInfo: () => toggleSectionVisibility("riskIndicatorsInfo"),
      content: (
        <p>{t("antimoon.expandableSection.import_country_info_description")}</p>
      ),
      expandedContent: <RiskIndicators />,
    },
    {
      title: t("antimoon.expandableSection.risk_indicators"),
      showInfo: sectionsVisibility.riskIndicatorsInfo,
      toggleInfo: () => toggleSectionVisibility("riskIndicatorsInfo"),
      content: (
        <p>{t("antimoon.expandableSection.import_country_info_description")}</p>
      ),
      expandedContent: <RiskIndicators />,
    },
  ];

  return (
    <div className={styles.expandableSections}>
      <button onClick={expandAll} className={styles.expandAll}>
        {t("antimoon.expandableSection.expand_all")}
      </button>
      {sections.map(
        ({ title, showInfo, toggleInfo, content, expandedContent }, index) => (
          <div key={index} className={styles.expandableBox}>
            <button
              onClick={toggleInfo}
              className={styles.expandableButton}
              aria-expanded={showInfo}
            >
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
            {showInfo && (
              <div className={styles.expandableContent}>{expandedContent}</div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ExpandableSection;
