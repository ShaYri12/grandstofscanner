import React from "react";
import styles from "./ProductGroup.module.css";
import { ProductGroup } from "./ProductTypes";
import { FaChevronRight } from "react-icons/fa";

// Sample data for testing
const factsheets = [
  { id: 1, symbol: "Fe", title: "IJzer", linkText: "Bekijk factsheet" },
  { id: 2, symbol: "Sb", title: "Antimoon", linkText: "Bekijk factsheet" },
  { id: 3, symbol: "Fe", title: "IJzer", linkText: "Bekijk factsheet" },
];

const ProductGroups: React.FC = () => (
  <div className={styles.section}>
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <a href="#" className={styles.breadcrumbLink}>
          Home
        </a>
        <FaChevronRight className={styles.breadcrumbIcon} />
        <a href="#" className={styles.breadcrumbLink}>
          Verlenen & Beoordelen
        </a>
        <FaChevronRight className={styles.breadcrumbIcon} />
        <span className={styles.breadcrumbCurrent}>Beoordelen</span>
      </nav>
      <div className={styles.header}>
        <h2>Beoordelen: uw productgroepen</h2>
        <p>
          Bekijk welke kritische materialen uw geselecteerde producten bevatten.
          Productgroepen of grondstoffen kunt u bekijken. Hier ziet u een
          risicoanalyse op basis van leveringszekerheid, prijsvolatiliteit en de
          risico’s voor mens en milieu.
        </p>
        <p>
          Als een grondstof als “conflictmateriaal” wordt aangemerkt is deze
          rood gearceerd in het overzicht van de grondstof.
        </p>
      </div>
      <h3>Uw geselecteerde productgroepen</h3>
      <p>
        Per productgroep staan de grondstoffen, inclusief hun relatieve
        hoeveelheid, weergegeven.
      </p>

      <div className={styles.boxes}>
        <div className={styles.sidePanel}>
          {factsheets.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.icon}>{item.symbol}</div>
              <div>
                <p className={styles.title}>{item.title}</p>
                <a href="#" className={styles.link}>
                  {item.linkText} &gt;
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.mainContent}>
          <p className={styles.code}>340600</p>
          <h3 className={styles.mainTitle}>Kaarsen en dergelijke artikelen</h3>
          <a href="#" className={styles.mainLink}>
            Bekijk factsheet &gt;
          </a>
          <div className={styles.info}>
            <p>Verwaarloosbaar</p>
            <p>Beperkt</p>
            <p>Gemiddeld</p>
          </div>
        </div>

        <div className={styles.mainContentAlt}>
          <p className={styles.code}>340600</p>
          <h3 className={styles.mainTitle}>Kaarsen en dergelijke artikelen</h3>
          <a href="#" className={styles.mainLink}>
            Bekijk factsheet &gt;
          </a>
          <div className={styles.info}>
            <p>Verwaarloosbaar</p>
            <p>Beperkt</p>
            <p>Gemiddeld</p>
          </div>
        </div>

        <div className={styles.mainContent}>
          <p className={styles.code}>340600</p>
          <h3 className={styles.mainTitle}>Kaarsen en dergelijke artikelen</h3>
          <a href="#" className={styles.mainLink}>
            Bekijk factsheet &gt;
          </a>
          <div className={styles.info}>
            <p>Verwaarloosbaar</p>
            <p>Beperkt</p>
            <p>Gemiddeld</p>
          </div>
        </div>
      </div>
      <button className={styles.actionButton}>Handelingsperspectieven</button>
    </div>
  </div>
);

export default ProductGroups;
