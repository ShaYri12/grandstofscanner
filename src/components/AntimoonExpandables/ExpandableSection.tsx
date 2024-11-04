import { useState } from "react";
import styles from "./ExpandableSection.module.css";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import PriceFluctuation from "../PriceFluctuation/PriceFluctuation";

const ExpandableSection = () => {
  const [showImportInfo, setShowImportInfo] = useState(false);
  const [showPriceInfo, setShowPriceInfo] = useState(false);
  const [showIMVOInfo, setShowIMVOInfo] = useState(false);
  const [showRiskIndicatorsInfo, setShowRiskIndicatorsInfo] = useState(false);

  const sections = [
    {
      title: "Informatie importlanden",
      showInfo: showImportInfo,
      toggleInfo: () => setShowImportInfo((prev) => !prev),
      content: (
        <>
          <p>
            In de onderstaande wereldkaart ziet u uit welke landen Nederland de
            getoonde grondstof importeert en wat hun scores zijn op het gebied
            van Environmental Performance (EPI), Human Development (HDI) en
            World Governance (WGI).
          </p>
        </>
      ),
      expandedContent: (
        <>
          <PriceFluctuation />
        </>
      ),
    },
    {
      title: "Prijsfluctuatie",
      showInfo: showPriceInfo,
      toggleInfo: () => setShowPriceInfo((prev) => !prev),
      content: (
        <>
          <p>
            Prijsfluctuaties kunnen aanzienlijk variëren op basis van
            verschillende factoren, zoals marktvraag, seizoensgebonden trends,
            en politieke stabiliteit.
          </p>
        </>
      ),
      expandedContent: (
        <>
          <p>
            In de onderstaande grafiek ziet u de prijstrends van de afgelopen
            jaren.
          </p>
        </>
      ),
    },
    {
      title: "IMVO",
      showInfo: showIMVOInfo,
      toggleInfo: () => setShowIMVOInfo((prev) => !prev),
      content: (
        <>
          <p>
            In de onderstaande wereldkaart ziet u uit welke landen Nederland de
            getoonde grondstof importeert en wat hun scores zijn op het gebied
            van Environmental Performance (EPI), Human Development (HDI) en
            World Governance (WGI).
          </p>
        </>
      ),
      expandedContent: (
        <>
          <p>
            In de onderstaande grafiek ziet u de prijstrends van de afgelopen
            jaren.
          </p>
          <p>
            In de onderstaande wereldkaart ziet u uit welke landen Nederland de
            getoonde grondstof importeert en wat hun scores zijn op het gebied
            van Environmental Performance (EPI), Human Development (HDI) en
            World Governance (WGI).
          </p>
        </>
      ),
    },
    {
      title: "Risk indicators",
      showInfo: showRiskIndicatorsInfo,
      toggleInfo: () => setShowRiskIndicatorsInfo((prev) => !prev),
      content: (
        <>
          <p>
            In de onderstaande wereldkaart ziet u uit welke landen Nederland de
            getoonde grondstof importeert en wat hun scores zijn op het gebied
            van Environmental Performance (EPI), Human Development (HDI) en
            World Governance (WGI).
          </p>
        </>
      ),
      expandedContent: (
        <>
          <p>
            In de onderstaande grafiek ziet u de prijstrends van de afgelopen
            jaren.
          </p>
          <p>
            In de onderstaande wereldkaart ziet u uit welke landen Nederland de
            getoonde grondstof importeert en wat hun scores zijn op het gebied
            van Environmental Performance (EPI), Human Development (HDI) en
            World Governance (WGI).
          </p>
        </>
      ),
    },
  ];

  return (
    <div className={styles.expandableSections}>
      <button className={styles.expandAll}>Alles uitklappen</button>
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
