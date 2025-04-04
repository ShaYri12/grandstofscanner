import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TFunction } from "i18next";
import styles from "./AdvancedSearch.module.css";
import { FaSearch, FaTimes } from "react-icons/fa";

// Example grondstof data
const exampleGrondstofData = [
  { id: 1, name: "Antimoon", code: "Sb", category: "Metaal" },
  { id: 2, name: "IJzer", code: "Fe", category: "Metaal" },
  { id: 3, name: "Aluminium", code: "Al", category: "Metaal" },
  { id: 4, name: "Koper", code: "Cu", category: "Metaal" },
  { id: 5, name: "Lithium", code: "Li", category: "Metaal" },
  { id: 6, name: "Kobalt", code: "Co", category: "Metaal" },
  { id: 7, name: "Zeldzame aardmetalen", code: "REE", category: "Metaal" },
  { id: 8, name: "Natuurrubber", code: "NR", category: "Biotisch" },
  { id: 9, name: "Katoen", code: "Ct", category: "Biotisch" },
  { id: 10, name: "Hout", code: "Wd", category: "Biotisch" },
  { id: 11, name: "Soja", code: "Soy", category: "Biotisch" },
  { id: 12, name: "Palmolie", code: "PO", category: "Biotisch" },
];

// Example productgroep data
const exampleProductgroepData = [
  {
    id: 1,
    name: "Elektronische apparaten",
    code: "85",
    category: "Technologie",
  },
  {
    id: 2,
    name: "Voertuigen",
    code: "87",
    category: "Transport",
  },
  {
    id: 3,
    name: "Landbouwmachines",
    code: "84",
    category: "Landbouw",
  },
  {
    id: 4,
    name: "Weefsels van katoen",
    code: "52",
    category: "Textiel",
  },
  {
    id: 5,
    name: "Farmaceutische producten",
    code: "30",
    category: "Gezondheid",
  },
];

interface AdvancedSearchProps {
  t: TFunction;
}

// Update the interface to match the actual structure in our translation files
interface SearchTranslation {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchButton: string;
  categoryRawMaterials: string;
  categoryProductGroups: string;
  noResults: string;
  viewDetails: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ t }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<
    "materials" | "products"
  >("materials");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  // Fix the translation reference to use the advancedSearch key
  const translations = t("advancedSearch", {
    returnObjects: true,
  }) as SearchTranslation;

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      // Select the appropriate data source based on active category
      const dataSource =
        activeCategory === "materials"
          ? exampleGrondstofData
          : exampleProductgroepData;

      // Filter based on search term
      const filtered = dataSource.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.code.toLowerCase().includes(value.toLowerCase()) ||
          item.category.toLowerCase().includes(value.toLowerCase())
      );

      setSearchResults(filtered);
      setIsOpen(true);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Handle item selection
  const handleItemClick = (item: any) => {
    // Navigate to the appropriate page based on the item type
    if (activeCategory === "materials") {
      navigate(`/${lang}/antimoon`); // For demo purposes, navigate to antimoon page for any material
    } else {
      navigate(`/${lang}/product-group`); // For demo purposes, navigate to product-group page for any product
    }
    setIsOpen(false);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsOpen(false);
  };

  return (
    <div className={styles.searchContainer} ref={wrapperRef}>
      <div className={styles.searchHeader}>
        <h2 className={styles.searchTitle}>{translations.title}</h2>
        <p className={styles.searchSubtitle}>{translations.subtitle}</p>
      </div>

      <div className={styles.categoryToggle}>
        <button
          className={`${styles.categoryButton} ${
            activeCategory === "materials" ? styles.active : ""
          }`}
          onClick={() => setActiveCategory("materials")}
        >
          {translations.categoryRawMaterials}
        </button>
        <button
          className={`${styles.categoryButton} ${
            activeCategory === "products" ? styles.active : ""
          }`}
          onClick={() => setActiveCategory("products")}
        >
          {translations.categoryProductGroups}
        </button>
      </div>

      <div className={styles.searchInputContainer}>
        <div className={styles.searchInput}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={translations.searchPlaceholder}
            className={styles.input}
          />
          {searchTerm && (
            <button className={styles.clearButton} onClick={clearSearch}>
              <FaTimes />
            </button>
          )}
        </div>
        <button className={styles.searchButton}>
          {translations.searchButton}
        </button>
      </div>

      {isOpen && searchResults.length > 0 && (
        <div className={styles.resultsDropdown}>
          {searchResults.map((item) => (
            <div
              key={item.id}
              className={styles.resultItem}
              onClick={() => handleItemClick(item)}
            >
              <div className={styles.resultInfo}>
                <span className={styles.resultName}>{item.name}</span>
                <span className={styles.resultCode}>
                  {item.code} - {item.category}
                </span>
              </div>
              <button className={styles.viewButton}>
                {translations.viewDetails}
              </button>
            </div>
          ))}
        </div>
      )}

      {isOpen && searchTerm && searchResults.length === 0 && (
        <div className={styles.noResults}>{translations.noResults}</div>
      )}
    </div>
  );
};

export default AdvancedSearch;
