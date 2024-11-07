import { useState } from "react";
import styles from "./ImportCountryInformation.module.css"; // Import your styles
import Select from "../Select/Select";
import { useTranslation } from "react-i18next"; // Import useTranslation

export default function ImportCountryInformation() {
  const { t } = useTranslation(); // Initialize translation
  const [activeTab, setActiveTab] = useState("map");
  const [selectedCountry, setSelectedCountry] = useState("");

  const options = [
    {
      value: "info1",
      label: t("antimoon.import_country.info1"),
    },
    {
      value: "info2",
      label: t("antimoon.import_country.info2"),
    },
    {
      value: "info3",
      label: t("antimoon.import_country.info3"),
    },
    // Add more options as needed
  ];

  return (
    <div className={styles.ImportCountryInformation}>
      <div className={styles.tabContainer}>
        <button
          onClick={() => setActiveTab("map")}
          className={`${styles.tabButton} ${
            activeTab === "map" ? styles.activeTab : styles.inactiveTab
          }`}
        >
          {t("antimoon.import_country.world_map")}
        </button>
        <button
          onClick={() => setActiveTab("table")}
          className={`${styles.tabButton} ${
            activeTab === "table" ? styles.activeTab : styles.inactiveTab
          }`}
        >
          {t("antimoon.import_country.table")}
        </button>
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.selectLabel}>
          {t("antimoon.import_country.select_info")}
        </h2>

        <Select
          options={options}
          value={selectedCountry}
          onChange={setSelectedCountry}
          defaultValue={t("antimoon.import_country.default_value")}
        />

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "#D30000" }}
            />
            <span className="text-sm">{t("antimoon.import_country.low")}</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "#F2B34D" }}
            />
            <span className="text-sm">
              {t("antimoon.import_country.medium")}
            </span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "#56A9DE" }}
            />
            <span className="text-sm">{t("antimoon.import_country.high")}</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={`${styles.legendBox}`}
              style={{ backgroundColor: "#D0C7BC" }}
            />
            <span className="text-sm">
              {t("antimoon.import_country.no_info")}
            </span>
          </div>
        </div>

        <div className={styles.map}>
          <img src="/map.png" alt={t("antimoon.import_country.map_alt")} />
        </div>
      </div>
    </div>
  );
}
