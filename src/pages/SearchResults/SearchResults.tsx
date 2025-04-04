import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/General/Breadcrumb/Breadcrumb";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchResults.module.css";

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

// Get all unique categories
const materialCategories = [
  ...new Set(exampleGrondstofData.map((item) => item.category)),
];
const productCategories = [
  ...new Set(exampleProductgroepData.map((item) => item.category)),
];
const allCategories = [
  ...new Set([...materialCategories, ...productCategories]),
];

interface LangParam extends Record<string, string | undefined> {
  lang?: string;
}

const SearchResults: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<LangParam>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [materialResults, setMaterialResults] = useState<any[]>([]);
  const [productResults, setProductResults] = useState<any[]>([]);

  // Get the current language - use URL param if available, otherwise use i18n current language
  const currentLang =
    lang || localStorage.getItem("i18nextLng") || i18n.language || "en";

  useEffect(() => {
    // Parse search query from URL
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q") || "";
    const type = queryParams.get("type");
    const categoriesParam = queryParams.get("categories");

    const categories = categoriesParam ? categoriesParam.split(",") : [];

    setSearchQuery(query);
    setInputValue(query);
    setFilterType(type);
    setSelectedCategories(categories);

    // Apply all filters
    applyFilters(query, type, categories);
  }, [location.search]);

  const applyFilters = (
    query: string,
    type: string | null,
    categories: string[]
  ) => {
    // Filter materials
    let filteredMaterials = exampleGrondstofData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.code.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );

    // Filter products
    let filteredProducts = exampleProductgroepData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.code.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );

    // Apply category filter
    if (categories.length > 0) {
      filteredMaterials = filteredMaterials.filter((item) =>
        categories.includes(item.category)
      );

      filteredProducts = filteredProducts.filter((item) =>
        categories.includes(item.category)
      );
    }

    setMaterialResults(filteredMaterials);
    setProductResults(filteredProducts);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct URL with all current filters
    const queryParams = new URLSearchParams();
    if (inputValue) queryParams.set("q", inputValue);
    if (filterType) queryParams.set("type", filterType);
    if (selectedCategories.length > 0)
      queryParams.set("categories", selectedCategories.join(","));

    navigate(`/${currentLang}/search-results?${queryParams.toString()}`);
  };

  const handleTypeChange = (newType: string | null) => {
    // Update type and navigate to new URL with all filters
    const queryParams = new URLSearchParams(location.search);

    if (newType) {
      queryParams.set("type", newType);
    } else {
      queryParams.delete("type");
    }

    navigate(`/${currentLang}/search-results?${queryParams.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    let newCategories: string[];

    if (selectedCategories.includes(category)) {
      // Remove category if already selected
      newCategories = selectedCategories.filter((c) => c !== category);
    } else {
      // Add category if not selected
      newCategories = [...selectedCategories, category];
    }

    // Update URL with new categories
    const queryParams = new URLSearchParams(location.search);

    if (newCategories.length > 0) {
      queryParams.set("categories", newCategories.join(","));
    } else {
      queryParams.delete("categories");
    }

    navigate(`/${currentLang}/search-results?${queryParams.toString()}`);
  };

  const breadcrumbItems = [
    { label: t("searchResults.breadcrumb.home"), url: `/${currentLang}/home` },
    { label: t("searchResults.breadcrumb.current") },
  ];

  return (
    <div className={styles.container}>
      <Breadcrumb items={breadcrumbItems} />

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder={t("searchResults.searchPlaceholder")}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
        </form>
      </div>

      <h1 className={styles.title}>
        {t("searchResults.title")} "{searchQuery}"
      </h1>

      <div className={styles.resultsContainer}>
        <div className={styles.filtersColumn}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>
              {t("searchResults.filterByType")}
            </h3>
            <div className={styles.filterOptions}>
              <label className={styles.filterOption}>
                <input
                  type="radio"
                  checked={filterType === null}
                  onChange={() => handleTypeChange(null)}
                />
                <span>{t("searchResults.all")}</span>
              </label>
              <label className={styles.filterOption}>
                <input
                  type="radio"
                  checked={filterType === "materials"}
                  onChange={() => handleTypeChange("materials")}
                />
                <span>{t("advancedSearch.categoryRawMaterials")}</span>
              </label>
              <label className={styles.filterOption}>
                <input
                  type="radio"
                  checked={filterType === "products"}
                  onChange={() => handleTypeChange("products")}
                />
                <span>{t("advancedSearch.categoryProductGroups")}</span>
              </label>
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>
              {t("searchResults.filterByCategory")}
            </h3>
            <div className={styles.filterOptions}>
              {allCategories.map((category) => (
                <label key={category} className={styles.filterOption}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.resultsColumn}>
          {(filterType === null || filterType === "materials") &&
            materialResults.length > 0 && (
              <div className={styles.resultSection}>
                <h2 className={styles.resultSectionTitle}>
                  {t("advancedSearch.categoryRawMaterials")}
                </h2>
                <div className={styles.resultsList}>
                  {materialResults.map((item) => (
                    <div
                      key={`material-${item.id}`}
                      className={styles.resultCard}
                    >
                      <div className={styles.resultHeader}>
                        <span className={styles.resultCode}>{item.code}</span>
                        <span className={styles.resultCategory}>
                          {item.category}
                        </span>
                      </div>
                      <h3 className={styles.resultName}>{item.name}</h3>
                      <Link
                        to={`/${currentLang}/detail/${item.id}`}
                        className={styles.resultLink}
                      >
                        {t("searchResults.viewDetails")}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {(filterType === null || filterType === "products") &&
            productResults.length > 0 && (
              <div className={styles.resultSection}>
                <h2 className={styles.resultSectionTitle}>
                  {t("advancedSearch.categoryProductGroups")}
                </h2>
                <div className={styles.resultsList}>
                  {productResults.map((item) => (
                    <div
                      key={`product-${item.id}`}
                      className={styles.resultCard}
                    >
                      <div className={styles.resultHeader}>
                        <span className={styles.resultCode}>{item.code}</span>
                        <span className={styles.resultCategory}>
                          {item.category}
                        </span>
                      </div>
                      <h3 className={styles.resultName}>{item.name}</h3>
                      <Link
                        to={`/${currentLang}/detail/${item.id}`}
                        className={styles.resultLink}
                      >
                        {t("searchResults.viewDetails")}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {!materialResults.length && !productResults.length && (
            <div className={styles.noResults}>
              <p>{t("searchResults.noResults")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
