import { useState } from "react";
import styles from "./PriceFluctuation.module.css"; // Import your styles

export default function PriceFluctuation() {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className={styles.priceFluctuation}>
      <div className={styles.tabContainer}>
        <button
          onClick={() => setActiveTab("map")}
          className={`${styles.tabButton} ${
            activeTab === "map" ? styles.activeTab : styles.inactiveTab
          }`}
        >
          Wereld kaart
        </button>
        <button
          onClick={() => setActiveTab("table")}
          className={`${styles.tabButton} ${
            activeTab === "table" ? styles.activeTab : styles.inactiveTab
          }`}
        >
          Tabel
        </button>
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.selectLabel}>Welke info wil je zien?</h2>

        <div className={styles.selectContainer}>
          <select className={styles.select}>
            <option>Import: in k €</option>
            <option>Export: in k €</option>
            <option>Balance: in k €</option>
          </select>
          <div className={styles.arrowIcon}>
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "red" }}
            />
            <span className="text-sm">Laag</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "orange" }}
            />
            <span className="text-sm">Gemiddeld</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "blue" }}
            />
            <span className="text-sm">Hoog</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "gray" }}
            />
            <span className="text-sm">Geen informatie</span>
          </div>
        </div>

        <div className={styles.map}>
          <img src="/map.png" />
        </div>
      </div>
    </div>
  );
}
