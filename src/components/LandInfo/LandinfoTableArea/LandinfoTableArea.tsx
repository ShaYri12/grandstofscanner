"use client";
import { useState } from "react";
import styles from "./LandinfoTableArea.module.css";
import { RiExpandUpDownFill } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useTranslation } from "react-i18next";
import Select from "../../General/Select/Select";

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
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState("Albanie");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableData | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });

  const options = [
    { value: "albania", label: t("landinfo.tableArea.countries.albania") },
    {
      value: "cotton_fabrics",
      label: t("landinfo.tableArea.countries.cotton_fabrics"),
    },
    {
      value: "electronics",
      label: t("landinfo.tableArea.countries.electronics"),
    },
    // Add more options as needed
  ];

  // Sample data
  const data: TableData[] = [
    {
      land: t("landinfo.tableArea.countries.cotton_fabrics"),
      importTon: 120,
      exportTon: 250,
      importEur: 5000,
      exportEur: 160,
      epi: 54.73,
      wgi: 61.9,
      hdi: 0.785,
    },
    {
      land: t("landinfo.tableArea.countries.electronics"),
      importTon: 300,
      exportTon: 400,
      importEur: 15000,
      exportEur: 25000,
      epi: 62.15,
      wgi: 70.2,
      hdi: 0.805,
    },
    {
      land: t("landinfo.tableArea.countries.vehicles"),
      importTon: 800,
      exportTon: 650,
      importEur: 60000,
      exportEur: 55000,
      epi: 48.87,
      wgi: 55.1,
      hdi: 0.81,
    },
    {
      land: t("landinfo.tableArea.countries.pharmaceuticals"),
      importTon: 100,
      exportTon: 200,
      importEur: 35000,
      exportEur: 40000,
      epi: 76.5,
      wgi: 83.4,
      hdi: 0.9,
    },
    {
      land: t("landinfo.tableArea.countries.synthetic_yarns"),
      importTon: 0,
      exportTon: 0,
      importEur: 0,
      exportEur: 160,
      epi: 54.73,
      wgi: 61.9,
      hdi: 0.785,
    },
    {
      land: t("landinfo.tableArea.countries.wool_clothing"),
      importTon: 180,
      exportTon: 90,
      importEur: 12000,
      exportEur: 15000,
      epi: 59.33,
      wgi: 60.5,
      hdi: 0.79,
    },
    {
      land: t("landinfo.tableArea.countries.agriculture_machines"),
      importTon: 50,
      exportTon: 75,
      importEur: 24000,
      exportEur: 30000,
      epi: 71.42,
      wgi: 68.3,
      hdi: 0.84,
    },
    {
      land: t("landinfo.tableArea.countries.fruits_vegetables"),
      importTon: 500,
      exportTon: 550,
      importEur: 5000,
      exportEur: 7000,
      epi: 65.88,
      wgi: 72.1,
      hdi: 0.795,
    },
    {
      land: t("landinfo.tableArea.countries.paper_products"),
      importTon: 0,
      exportTon: 0,
      importEur: 0,
      exportEur: 160,
      epi: 54.73,
      wgi: 61.9,
      hdi: 0.785,
    },
    {
      land: t("landinfo.tableArea.countries.metal_products"),
      importTon: 0,
      exportTon: 0,
      importEur: 0,
      exportEur: 160,
      epi: 54.73,
      wgi: 61.9,
      hdi: 0.785,
    },
    {
      land: t("landinfo.tableArea.countries.meat_products"),
      importTon: 600,
      exportTon: 400,
      importEur: 42000,
      exportEur: 46000,
      epi: 55.9,
      wgi: 59.0,
      hdi: 0.75,
    },
    {
      land: t("landinfo.tableArea.countries.cotton_fabrics"),
      importTon: 300,
      exportTon: 200,
      importEur: 9000,
      exportEur: 11000,
      epi: 67.21,
      wgi: 65.4,
      hdi: 0.83,
    },
    {
      land: t("landinfo.tableArea.countries.plastic_products"),
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
        <label className={styles.label}>{t("landinfo.tableArea.label")}</label>
        <Select
          options={options}
          value={selectedCountry}
          onChange={setSelectedCountry}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {[
                "land",
                "importTon",
                "exportTon",
                "importEur",
                "exportEur",
                "epi",
                "wgi",
                "hdi",
              ].map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof TableData)}
                  className={styles.th}
                >
                  <div className={styles.headerContent}>
                    <span>{t(`landinfo.tableArea.${key}`)}</span>
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
