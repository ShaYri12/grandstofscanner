"use client";
import { useState } from "react";
import styles from "./LandinfoTableArea.module.css";
import { RiExpandUpDownFill } from "react-icons/ri";
import {
  IoIosArrowDown,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";

interface TableData {
  land: string;
  importTon: number;
  exportTon: number;
  importEur: number;
  exportEur: number;
  epi: number;
  wgi: number;
  hdi: number;
}

const LandinfoTableArea = () => {
  const [selectedCountry, setSelectedCountry] = useState("Albanie");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableData | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });

  // Sample data
  const data: TableData[] = [
    {
      land: "Weefsels van katoen",
      importTon: 120,
      exportTon: 250,
      importEur: 5000,
      exportEur: 160,
      epi: 54.73,
      wgi: 61.9,
      hdi: 0.785,
    },
    {
      land: "Elektronische apparaten",
      importTon: 300,
      exportTon: 400,
      importEur: 15000,
      exportEur: 25000,
      epi: 62.15,
      wgi: 70.2,
      hdi: 0.805,
    },
    {
      land: "Voertuigen",
      importTon: 800,
      exportTon: 650,
      importEur: 60000,
      exportEur: 55000,
      epi: 48.87,
      wgi: 55.1,
      hdi: 0.81,
    },
    {
      land: "Farmaceutische producten",
      importTon: 100,
      exportTon: 200,
      importEur: 35000,
      exportEur: 40000,
      epi: 76.5,
      wgi: 83.4,
      hdi: 0.9,
    },
    {
      land: "Garens, andere dan naaigarens, van synthetische stapelvezels, bevattende < 85 gewichtspercenten stapelvezels",
      importTon: 0,
      exportTon: 0,
      importEur: 0,
      exportEur: 160,
      epi: 54.73,
      wgi: 61.9,
      hdi: 0.785,
    },
    {
      land: "Kledingstukken van wol",
      importTon: 180,
      exportTon: 90,
      importEur: 12000,
      exportEur: 15000,
      epi: 59.33,
      wgi: 60.5,
      hdi: 0.79,
    },
    {
      land: "Landbouwmachines",
      importTon: 50,
      exportTon: 75,
      importEur: 24000,
      exportEur: 30000,
      epi: 71.42,
      wgi: 68.3,
      hdi: 0.84,
    },
    {
      land: "Groenten en fruit",
      importTon: 500,
      exportTon: 550,
      importEur: 5000,
      exportEur: 7000,
      epi: 65.88,
      wgi: 72.1,
      hdi: 0.795,
    },
    {
      land: "Papier en karton, van de soort gebruikt om te worden beschreven of bedrukt of voor andere grafische doeleinden, gestreken met of voorzien van een deklaag van kaolien of van andere anorganische stoffen",
      importTon: 0,
      exportTon: 0,
      importEur: 0,
      exportEur: 160,
      epi: 54.73,
      wgi: 61.9,
      hdi: 0.785,
    },
    {
      land: "Weefsels van katoen",
      importTon: 0,
      exportTon: 0,
      importEur: 0,
      exportEur: 160,
      epi: 54.73,
      wgi: 61.9,
      hdi: 0.785,
    },
    {
      land: "Metaalproducten",
      importTon: 600,
      exportTon: 400,
      importEur: 42000,
      exportEur: 46000,
      epi: 55.9,
      wgi: 59.0,
      hdi: 0.75,
    },
    {
      land: "Vleesproducten",
      importTon: 300,
      exportTon: 200,
      importEur: 9000,
      exportEur: 11000,
      epi: 67.21,
      wgi: 65.4,
      hdi: 0.83,
    },
    {
      land: "Plastic producten",
      importTon: 420,
      exportTon: 350,
      importEur: 27000,
      exportEur: 32000,
      epi: 58.46,
      wgi: 60.7,
      hdi: 0.77,
    },
    // Add more rows as needed
  ];

  const handleSort = (key: keyof TableData) => {
    let direction: "asc" | "desc" | null = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") direction = "desc";
      else if (sortConfig.direction === "desc") direction = null;
    }

    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key!] > b[sortConfig.key!])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const getSortIcon = (key: keyof TableData) => {
    if (sortConfig.key !== key)
      return <RiExpandUpDownFill className={styles.icons} />;
    if (sortConfig.direction === "asc")
      return <IoMdArrowDropup className={styles.icons} />;
    if (sortConfig.direction === "desc")
      return <IoMdArrowDropdown className={styles.icons} />;
    return <RiExpandUpDownFill className={styles.icons} />;
  };

  return (
    <div className={styles.innerBox}>
      <div className="">
        <label className={styles.label}>
          Kies van welke land u informtie wilt bekijken
        </label>
        <div className={styles.selectContainer}>
          <select
            className={styles.select}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="Albanie">Albanie</option>
            <option value="Albanie">Albanie</option>
            <option value="Albanie">Albanie</option>
            {/* Add more options as needed */}
          </select>
          <IoIosArrowDown color="#343A40" className={styles.icon} />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof TableData)}
                  className={styles.th}
                >
                  <div className={styles.headerContent}>
                    <span>
                      {key === "land"
                        ? "Land"
                        : key === "importTon"
                        ? "Import in ton"
                        : key === "exportTon"
                        ? "Export in ton"
                        : key === "importEur"
                        ? "Import in k €"
                        : key === "exportEur"
                        ? "Export in k €"
                        : key.toUpperCase()}
                    </span>
                    {getSortIcon(key as keyof TableData)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {getSortedData().map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex} className={styles.td}>
                    {typeof value === "number"
                      ? value.toLocaleString("nl-NL")
                      : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandinfoTableArea;
