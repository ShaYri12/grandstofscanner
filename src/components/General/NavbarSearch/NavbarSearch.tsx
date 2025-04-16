import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./NavbarSearch.module.css";
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

interface NavbarSearchProps {
  className?: string;
  isMobile?: boolean;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  className,
  isMobile = false,
}) => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [materialResults, setMaterialResults] = useState<any[]>([]);
  const [productResults, setProductResults] = useState<any[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();

  // Get the current language - use URL param if available, otherwise use i18n current language
  const currentLang =
    lang || localStorage.getItem("i18nextLng") || i18n.language || "en";

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      // Filter materials based on search term
      const filteredMaterials = exampleGrondstofData
        .filter(
          (item) =>
            // Match words that start with the search term
            item.name
              .toLowerCase()
              .split(/\s+/)
              .some((word) => word.startsWith(value.toLowerCase())) ||
            item.code.toLowerCase().startsWith(value.toLowerCase()) ||
            item.category.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 2); // Only show top 2 matches

      // Filter products based on search term
      const filteredProducts = exampleProductgroepData
        .filter(
          (item) =>
            // Match words that start with the search term
            item.name
              .toLowerCase()
              .split(/\s+/)
              .some((word) => word.startsWith(value.toLowerCase())) ||
            item.code.toLowerCase().startsWith(value.toLowerCase()) ||
            item.category.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 2); // Only show top 2 matches

      setMaterialResults(filteredMaterials);
      setProductResults(filteredProducts);
      setIsOpen(true);
    } else {
      setMaterialResults([]);
      setProductResults([]);
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
  const handleItemClick = (item: any, type: "material" | "product") => {
    if (type === "material") {
      navigate(`/${currentLang}/antimoon`); // For demo purposes, navigate to antimoon page for any material
    } else {
      navigate(`/${currentLang}/product-group`); // For demo purposes, navigate to product-group page for any product
    }
    setIsOpen(false);
  };

  // Handle search button click or enter key
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Use replace: true to ensure the Browse component correctly handles the new search
      navigate(`/${currentLang}/browse?q=${encodeURIComponent(searchTerm)}`, {
        replace: true,
      });
      setIsOpen(false);
    }
  };

  // Handle key press for search
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setMaterialResults([]);
    setProductResults([]);
    setIsOpen(false);
  };

  return (
    <div
      className={`${styles.searchContainer} ${className || ""}`}
      ref={wrapperRef}
    >
      <div className={styles.searchInput}>
        <FaSearch className={styles.searchIcon} onClick={handleSearch} />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder={t("advancedSearch.searchPlaceholder")}
          className={styles.input}
        />
        {searchTerm && (
          <button className={styles.clearButton} onClick={clearSearch}>
            <FaTimes />
          </button>
        )}
      </div>

      {isOpen && searchTerm.trim().length > 0 && (
        <div className={styles.resultsDropdown}>
          {materialResults.length > 0 || productResults.length > 0 ? (
            <>
              {materialResults.length > 0 && (
                <div className={styles.categorySection}>
                  <h3 className={styles.categoryTitle}>
                    {t("advancedSearch.categoryRawMaterials")}
                  </h3>
                  {materialResults.map((item) => (
                    <div
                      key={`material-${item.id}`}
                      className={styles.resultItem}
                      onClick={() => handleItemClick(item, "material")}
                    >
                      <div className={styles.resultInfo}>
                        <span className={styles.resultName}>{item.name}</span>
                        <span className={styles.resultCode}>
                          {item.code} - {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                  {materialResults.length > 0 && (
                    <div
                      className={styles.viewMoreLink}
                      onClick={() =>
                        navigate(
                          `/${currentLang}/browse?q=${encodeURIComponent(
                            searchTerm
                          )}&type=materials`,
                          { replace: true }
                        )
                      }
                    >
                      {t("advancedSearch.viewMore")}
                    </div>
                  )}
                </div>
              )}

              {productResults.length > 0 && (
                <div className={styles.categorySection}>
                  <h3 className={styles.categoryTitle}>
                    {t("advancedSearch.categoryProductGroups")}
                  </h3>
                  {productResults.map((item) => (
                    <div
                      key={`product-${item.id}`}
                      className={styles.resultItem}
                      onClick={() => handleItemClick(item, "product")}
                    >
                      <div className={styles.resultInfo}>
                        <span className={styles.resultName}>{item.name}</span>
                        <span className={styles.resultCode}>
                          {item.code} - {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                  {productResults.length > 0 && (
                    <div
                      className={styles.viewMoreLink}
                      onClick={() =>
                        navigate(
                          `/${currentLang}/browse?q=${encodeURIComponent(
                            searchTerm
                          )}&type=products`,
                          { replace: true }
                        )
                      }
                    >
                      {t("advancedSearch.viewMore")}
                    </div>
                  )}
                </div>
              )}

              <div
                className={styles.viewAllResults}
                onClick={() =>
                  navigate(
                    `/${currentLang}/browse?q=${encodeURIComponent(searchTerm)}`
                  )
                }
              >
                {t("advancedSearch.viewAllResults")}
              </div>
            </>
          ) : (
            <div className={styles.noResults}>
              {t("advancedSearch.noResults")}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
