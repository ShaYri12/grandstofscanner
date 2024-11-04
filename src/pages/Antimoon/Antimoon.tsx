import React, { useEffect } from "react";
import styles from "./Antimoon.module.css";
import { FaChevronRight, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import i18next from "i18next";
import Tooltip from "../../components/Tooltip/Tooltip";
import ExpandableSection from "../../components/AntimoonExpandables/ExpandableSection";
import AntimoonSideContent from "../../components/AntimoonSideContent/AntimoonSideContent";
import { IoMdMail } from "react-icons/io";

const Antimoon: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();

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
                <Tooltip
                  title="Maximale prijsstijging even titel iets langer maken"
                  text="Dit staat voor de grootste prijsstijging die -sinds 1900- in één enkel jaar is opgetreden. Een maximale prijsstijging van 100% wil zeggen dat in één enkel jaar de prijs van een grondstof is verdubbeld. Er wordt gerekend in jaargemiddelden; dag-, week- en maandgemiddelden zijn buiten beschouwing gelaten."
                />
              </div>
              <p className={styles.description}>
                Antimoon wordt vooral gebruikt als vlamvertrager in plastics
                (52%). Daarnaast wordt het ingezet in lood-accu's (27%) en voor
                het harden van legeringen.
              </p>
              <div className={styles.infoBoxes}>
                <div className={styles.infoBox}>
                  <Tooltip
                    title="Maximale prijsstijging even titel iets langer maken"
                    text="Dit staat voor de grootste prijsstijging die -sinds 1900- in één enkel jaar is opgetreden. Een maximale prijsstijging van 100% wil zeggen dat in één enkel jaar de prijs van een grondstof is verdubbeld. Er wordt gerekend in jaargemiddelden; dag-, week- en maandgemiddelden zijn buiten beschouwing gelaten."
                    position="absolute" // Apply absolute for specific positioning
                  />
                  <h3 className={styles.infoBoxTitle}>
                    Prijsvolatiliteit van grondstoffen/ materialen (MAPII)
                  </h3>
                  <p className={styles.infoBoxValue1}>+131%</p>
                </div>
                <div className={styles.infoBox}>
                  <Tooltip
                    title="Maximale prijsstijging even titel iets langer maken"
                    text="Dit staat voor de grootste prijsstijging die -sinds 1900- in één enkel jaar is opgetreden. Een maximale prijsstijging van 100% wil zeggen dat in één enkel jaar de prijs van een grondstof is verdubbeld. Er wordt gerekend in jaargemiddelden; dag-, week- en maandgemiddelden zijn buiten beschouwing gelaten."
                    position="absolute" // Apply absolute for specific positioning
                  />
                  <h3 className={styles.infoBoxTitle}>Wereldproductie</h3>
                  <p className={styles.infoBoxValue2}>42.833 ton</p>
                </div>
              </div>
              <ExpandableSection />
              <div className={styles.share}>
                <p>Deel deze pagina</p>
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
