import React, { useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import styles from "./Trade.module.css";

const Trade: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [rawMaterial, setRawMaterial] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.dotsContainer}>
          <div className={styles.dot}></div>
          <div className={styles.verticalLine}></div>
          <div className={styles.dot}></div>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>
            Kies waar u de informatie vandaan wilt halen
          </h1>

          <div className={styles.spacing}>
            <div>
              <label htmlFor="search" className={styles.label}>
                Zoek op naam of HS-code van de productgroep
              </label>
              <div className={styles.searchContainer}>
                <input
                  id="search"
                  type="text"
                  placeholder="Placeholder"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                <button className={styles.searchButton}>
                  <FaSearch className={styles.icon} />
                  Zoeken
                </button>
              </div>
            </div>

            <div className={styles.orText}>of</div>

            <div>
              <label htmlFor="category" className={styles.label}>
                Zoek op basis van productcategorie
              </label>
              <div className={styles.selectContainer}>
                <select
                  id="category"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Maak een keuze</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                  <option value="category3">Category 3</option>
                </select>
                <FaChevronDown className={styles.chevronIcon} />
              </div>
            </div>

            <div className={styles.orText}>of</div>

            <div>
              <label htmlFor="material" className={styles.label}>
                Zoek op basis van grondstof
              </label>
              <div className={styles.selectContainer}>
                <select
                  id="material"
                  value={rawMaterial}
                  onChange={(e) => setRawMaterial(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Antimoon</option>
                  <option value="material1">Material 1</option>
                  <option value="material2">Material 2</option>
                  <option value="material3">Material 3</option>
                </select>
                <FaChevronDown className={styles.chevronIcon} />
              </div>
            </div>
          </div>

          <div className={styles.results}>
            <h2 className={styles.resultTitle}>Gevonden resultaten</h2>
            <p className={styles.resultText}>
              Met de resultaten kunt u de factsheet over de grondstof of
              productgroep bekijken of verschillende productgroepen toevoegen om
              de verschillen te bekijken.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
