import React from "react";
import styles from "./ProductGroup.module.css";
import { ProductGroup } from "./ProductTypes";
import { FaChevronRight } from "react-icons/fa";

// Sample data for testing
const sampleGroups: ProductGroup[] = [
  {
    id: "340600",
    name: "Kaarsen en dergelijke artikelen",
    materials: [
      {
        id: "Fe",
        symbol: "Fe",
        name: "Ijzer",
        factsheetLink: "#",
        riskLevel: "Verwaarloosbaar",
      },
      {
        id: "Sb",
        symbol: "Sb",
        name: "Antimoon",
        factsheetLink: "#",
        riskLevel: "Beperkt",
      },
      {
        id: "Fe2",
        symbol: "Fe",
        name: "Ijzer",
        factsheetLink: "#",
        riskLevel: "Gemiddeld",
      },
    ],
  },
  {
    id: "340601",
    name: "Kaarsen en dergelijke artikelen",
    materials: [
      {
        id: "Fe3",
        symbol: "Fe",
        name: "Ijzer",
        factsheetLink: "#",
        riskLevel: "Verwaarloosbaar",
      },
      {
        id: "Sb2",
        symbol: "Sb",
        name: "Antimoon",
        factsheetLink: "#",
        riskLevel: "Beperkt",
      },
    ],
  },
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

      <div className={styles.groupsContainer}>
        {sampleGroups.map((group) => (
          <div key={group.id} className={styles.groupCard}>
            <div className={styles.groupHeader}>
              <h4>{group.name}</h4>
              <a href="#" className={styles.factsheetLink}>
                Bekijk factsheet &gt;
              </a>
            </div>
            <div className={styles.materials}>
              {group.materials.map((material) => (
                <div key={material.id} className={styles.material}>
                  <div className={styles.symbol}>{material.symbol}</div>
                  <div className={styles.materialInfo}>
                    <span className={styles.materialName}>{material.name}</span>
                    <a
                      href={material.factsheetLink}
                      className={styles.materialFactsheet}
                    >
                      Bekijk factsheet &gt;
                    </a>
                  </div>
                  <span className={styles.riskLevel}>{material.riskLevel}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className={styles.actionButton}>Handelingsperspectieven</button>
    </div>
  </div>
);

export default ProductGroups;
