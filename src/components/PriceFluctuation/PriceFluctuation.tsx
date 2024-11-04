import { useState } from "react";
import styles from "./PriceFluctuation.module.css"; // Import your styles
import Select from "../Select/Select";

export default function PriceFluctuation() {
  const [activeTab, setActiveTab] = useState("map");
  const [selectedCountry, setSelectedCountry] = useState("");

  const options = [
    { value: "info1", label: "Info 1" },
    {
      value: "info2",
      label: "Info 2",
    },
    {
      value: "info3",
      label: "Info 3",
    },
    // Add more options as needed
  ];

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

        <Select
          options={options}
          value={selectedCountry}
          onChange={setSelectedCountry}
          defaultValue="Import: in k €"
        />

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "#D30000" }}
            />
            <span className="text-sm">Laag</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "#F2B34D" }}
            />
            <span className="text-sm">Gemiddeld</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "#56A9DE" }}
            />
            <span className="text-sm">Hoog</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "#D0C7BC" }}
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
