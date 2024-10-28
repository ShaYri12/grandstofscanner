import React from "react";
import styles from "./ProductGroup.module.css";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

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
        <Link to="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <FaChevronRight className={styles.breadcrumbIcon} />
        <Link to="/" className={styles.breadcrumbLink}>
          Verlenen & Beoordelen
        </Link>
        <FaChevronRight className={styles.breadcrumbIcon} />
        <span className={styles.breadcrumbCurrent}>Beoordelen</span>
      </nav>
      <div>
        <h2 className={styles.heading1}>Beoordelen: uw productgroepen</h2>
        <p className={styles.para}>
          Bekijk welke kritische materialen uw geselecteerde producten bevatten.
          Productgroepen of grondstoffen kunt u bekijken. Hier ziet u een
          risicoanalyse op basis van leveringszekerheid, prijsvolatiliteit en de
          risico’s voor mens en milieu.
        </p>
        <p className={styles.para}>
          Als een grondstof als “conflictmateriaal” wordt aangemerkt is deze
          rood gearceerd in het overzicht van de grondstof.
        </p>
      </div>
      <h3 className={styles.heading2}>Uw geselecteerde productgroepen</h3>
      <p className={styles.para}>
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
                  {item.linkText} <FaChevronRight className={styles.linkIcon} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.mainContent}>
          <p className={styles.code}>340600</p>
          <h3 className={styles.mainTitle}>Kaarsen en dergelijke artikelen</h3>
          <a href="#" className={styles.mainLink}>
            Bekijk factsheet <FaChevronRight className={styles.linkIcon} />
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
            Bekijk factsheet <FaChevronRight className={styles.linkIcon} />
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
            Bekijk factsheet <FaChevronRight className={styles.linkIcon} />
          </a>
          <div className={styles.info}>
            <p>Verwaarloosbaar</p>
            <p>Beperkt</p>
            <p>Gemiddeld</p>
          </div>
        </div>
      </div>
      <p className={styles.para}>
        Wanneer de factsheet(s) voor uw productgroep(en) laat zien dat u voor
        één of meer grondstoffen een risico loopt, kijk dan bij ‘Handelen’ wat u
        kunt doen om dit risico te beperken.
      </p>
      <p className={styles.para}>
        Let op dat deze handelingsperspectieven niet grondstofspecifiek zijn en
        dienen te worden aangepast aan uw specifieke situatie.
      </p>
      <button className={styles.actionButton}>Handelingsperspectieven</button>
    </div>
  </div>
);

export default ProductGroups;
