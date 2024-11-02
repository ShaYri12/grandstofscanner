import React, { useEffect, useState } from "react";
import styles from "./Antimoon.module.css";
import { FaChevronRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import i18next from "i18next";
import {
  IoInformationCircle,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import { FaBox } from "react-icons/fa";

const Antimoon: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const [showImportInfo, setShowImportInfo] = useState(false);
  const [showPriceInfo, setShowPriceInfo] = useState(false);

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to={`/${lang}/home`} className={styles.breadcrumbLink}>
            Home
          </Link>
          <FaChevronRight className={styles.breadcrumbIcon} />
          <Link to={`/${lang}/home`} className={styles.breadcrumbLink}>
            Verkennen & Beoordelen
          </Link>
          <FaChevronRight className={styles.breadcrumbIcon} />
          <span className={styles.breadcrumbCurrent}>Antimoon</span>
        </nav>

        <div className={styles.mainContent}>
          <div className={styles.grid}>
            <div className={styles.gridMain}>
              <div className={styles.header}>
                <div>
                  <h1 className={styles.subtitle}>Factsheet grondstof</h1>
                  <div className={styles.titleContainer}>
                    <h2 className={styles.title}>Antimoon</h2>
                    <span className={styles.symbol}>Sb</span>
                  </div>
                </div>
                <IoInformationCircle className={styles.infoIcon} />
              </div>
              <p className={styles.description}>
                Antimoon wordt vooral gebruikt als vlamvertrager in plastics
                (52%). Daarnaast wordt het ingezet in lood-accu's (27%) en voor
                het harden van legeringen.
              </p>
              <div className={styles.infoBoxes}>
                <div className={styles.infoBox}>
                  <IoInformationCircle className={styles.infoBoxIcon} />
                  <h3 className={styles.infoBoxTitle}>
                    Prijsvolatiliteit van grondstoffen/materialen (MAPII)
                  </h3>
                  <p className={styles.infoBoxValue}>+131%</p>
                </div>
                <div className={styles.infoBox}>
                  <IoInformationCircle className={styles.infoBoxIcon} />
                  <h3 className={styles.infoBoxTitle}>Wereldproductie</h3>
                  <p className={styles.infoBoxValue}>42.833 ton</p>
                </div>
              </div>

              <div className={styles.expandableSections}>
                <div className={styles.expandableBox}>
                  <button
                    onClick={() => setShowImportInfo(!showImportInfo)}
                    className={styles.expandableButton}
                  >
                    <h3 className={styles.expandableTitle}>
                      Informatie importlanden
                    </h3>
                    {showImportInfo ? (
                      <IoChevronUp className={styles.chevronIcon} />
                    ) : (
                      <IoChevronDown className={styles.chevronIcon} />
                    )}
                  </button>
                  {showImportInfo && (
                    <div className={styles.expandableContent}>
                      <p>
                        In de onderstaande wereldkaart ziet u uit welke landen
                        Nederland de getoonde grondstof importeert en wat hun
                        scores zijn op het gebied van Environmental Performance
                        (EPI), Human Development (HDI) en World Governance
                        (WGI).
                      </p>
                    </div>
                  )}
                </div>

                <div className={styles.expandableBox}>
                  <button
                    onClick={() => setShowPriceInfo(!showPriceInfo)}
                    className={styles.expandableButton}
                  >
                    <h3 className={styles.expandableTitle}>Prijsfluctuatie</h3>
                    {showPriceInfo ? (
                      <IoChevronUp className={styles.chevronIcon} />
                    ) : (
                      <IoChevronDown className={styles.chevronIcon} />
                    )}
                  </button>
                  {showPriceInfo && (
                    <div className={styles.expandableContent}>
                      <p>
                        In de onderstaande wereldkaart ziet u uit welke landen
                        Nederland de getoonde grondstof importeert en wat hun
                        scores zijn op het gebied van Environmental Performance
                        (EPI), Human Development (HDI) en World Governance
                        (WGI).
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.sidebar}>
              <h3 className={styles.sidebarTitle}>Algemene informatie</h3>
              <div className={styles.sidebarSection}>
                <p>
                  <span className={styles.symbolLabel}>Sb</span> is de afkorting
                  van <span className={styles.symbolLabel}>Antimoon</span> in
                  het periodiek systeem
                </p>
                <div className={styles.nonConflictLabel}>
                  Geen conflict materiaal
                </div>
              </div>

              <h3 className={styles.sidebarTitle}>Productgroepen</h3>
              <div className={styles.productList}>
                <div className={styles.productItem}>
                  <FaBox />
                  <span>Luchtballons en luchtschepen (0,002)</span>
                </div>
                <div className={styles.productItem}>
                  <FaBox />
                  <span>Hefschroefvliegtuigen (0,000)</span>
                </div>
              </div>

              <button className={styles.expandAllButton}>
                Alles uitklappen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Antimoon;
