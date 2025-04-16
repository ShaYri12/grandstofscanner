import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaFilter,
  FaCheck,
  FaExchangeAlt,
  FaArrowLeft,
} from "react-icons/fa";
import styles from "./Browse.module.css";
import Breadcrumb from "../../components/General/Breadcrumb/Breadcrumb";

interface BrowseProps {}

interface Material {
  id: number;
  name: string;
  code: string;
  category: string;
  type: "materials";
  description: string;
  riskLevel: string;
  availability: string;
}

interface Product {
  id: number;
  name: string;
  code: string;
  category: string;
  type: "products";
  keyMaterials: string;
  industryImpact: string;
}

type Item = Material | Product;

const Browse: React.FC<BrowseProps> = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = lang || localStorage.getItem("i18nextLng") || "nl";

  // Raw materials data - using the same data as in the Search components
  const rawMaterials: Material[] = [
    {
      id: 1,
      name: "Antimoon",
      code: "Sb",
      category: "Metaal",
      type: "materials",
      description:
        "Antimoon is een metallisch element met symbool Sb en wordt voornamelijk gebruikt in legeringen, batterijen en vlamvertragers.",
      riskLevel: "Hoog",
      availability: "Beperkt",
    },
    {
      id: 2,
      name: "IJzer",
      code: "Fe",
      category: "Metaal",
      type: "materials",
      description:
        "IJzer is een metallisch element met symbool Fe en wordt gebruikt in staal en andere legeringen voor constructie en productie.",
      riskLevel: "Laag",
      availability: "Overvloedig",
    },
    {
      id: 3,
      name: "Aluminium",
      code: "Al",
      category: "Metaal",
      type: "materials",
      description:
        "Aluminium is een licht metaal met symbool Al dat wordt gebruikt in transportmiddelen, verpakkingen en constructies.",
      riskLevel: "Gemiddeld",
      availability: "Goed",
    },
    {
      id: 4,
      name: "Koper",
      code: "Cu",
      category: "Metaal",
      type: "materials",
      description:
        "Koper is een metallisch element met symbool Cu en wordt gebruikt in elektrische bedrading, elektronica en legeringen.",
      riskLevel: "Gemiddeld",
      availability: "Redelijk",
    },
    {
      id: 5,
      name: "Lithium",
      code: "Li",
      category: "Metaal",
      type: "materials",
      description:
        "Lithium is een alkalimetaal met symbool Li en wordt voornamelijk gebruikt in batterijen voor elektronica en elektrische voertuigen.",
      riskLevel: "Hoog",
      availability: "Beperkt",
    },
    {
      id: 6,
      name: "Kobalt",
      code: "Co",
      category: "Metaal",
      type: "materials",
      description:
        "Kobalt is een metaal met symbool Co en wordt gebruikt in batterijen, supersterke legeringen en pigmenten.",
      riskLevel: "Hoog",
      availability: "Beperkt",
    },
    {
      id: 7,
      name: "Zeldzame aardmetalen",
      code: "REE",
      category: "Metaal",
      type: "materials",
      description:
        "Zeldzame aardmetalen zijn een groep van 17 chemische elementen die worden gebruikt in moderne technologie zoals smartphones en windturbines.",
      riskLevel: "Zeer Hoog",
      availability: "Zeer Beperkt",
    },
    {
      id: 8,
      name: "Natuurrubber",
      code: "NR",
      category: "Biotisch",
      type: "materials",
      description:
        "Natuurrubber is een elastomeer dat wordt gewonnen uit de rubberboom en wordt gebruikt voor banden, handschoenen en talrijke andere producten.",
      riskLevel: "Gemiddeld",
      availability: "Redelijk",
    },
    {
      id: 9,
      name: "Katoen",
      code: "Ct",
      category: "Biotisch",
      type: "materials",
      description:
        "Katoen is een natuurlijke vezel die wordt gebruikt voor textiel en kleding en wordt verbouwd in vele landen wereldwijd.",
      riskLevel: "Laag",
      availability: "Goed",
    },
    {
      id: 10,
      name: "Hout",
      code: "Wd",
      category: "Biotisch",
      type: "materials",
      description:
        "Hout is een biologisch materiaal dat wordt gebruikt voor constructie, meubels en brandstof, afkomstig van bomen.",
      riskLevel: "Gemiddeld",
      availability: "Variabel",
    },
    {
      id: 11,
      name: "Soja",
      code: "Soy",
      category: "Biotisch",
      type: "materials",
      description:
        "Soja is een peulvrucht die wordt gebruikt voor voedselproducten, diervoeder en diverse industriële toepassingen.",
      riskLevel: "Laag",
      availability: "Goed",
    },
    {
      id: 12,
      name: "Palmolie",
      code: "PO",
      category: "Biotisch",
      type: "materials",
      description:
        "Palmolie is een plantaardige olie afkomstig van de oliepalm en wordt gebruikt in voedsel, cosmetica en biobrandstoffen.",
      riskLevel: "Gemiddeld",
      availability: "Goed",
    },
  ];

  // Product groups data - using the same data as in the Search components
  const productGroups: Product[] = [
    {
      id: 101,
      name: "Elektronische apparaten",
      code: "85",
      category: "Technologie",
      type: "products",
      keyMaterials: "Koper, Lithium, Zeldzame aardmetalen, Kobalt",
      industryImpact: "Hoog",
    },
    {
      id: 102,
      name: "Voertuigen",
      code: "87",
      category: "Transport",
      type: "products",
      keyMaterials: "Aluminium, IJzer, Rubber, Koper, Lithium",
      industryImpact: "Zeer Hoog",
    },
    {
      id: 103,
      name: "Landbouwmachines",
      code: "84",
      category: "Landbouw",
      type: "products",
      keyMaterials: "IJzer, Aluminium, Koper",
      industryImpact: "Hoog",
    },
    {
      id: 104,
      name: "Weefsels van katoen",
      code: "52",
      category: "Textiel",
      type: "products",
      keyMaterials: "Katoen",
      industryImpact: "Gemiddeld",
    },
    {
      id: 105,
      name: "Farmaceutische producten",
      code: "30",
      category: "Gezondheid",
      type: "products",
      keyMaterials: "Diverse chemische grondstoffen",
      industryImpact: "Hoog",
    },
    {
      id: 106,
      name: "Smartphones en mobiele apparaten",
      code: "8517",
      category: "Technologie",
      type: "products",
      keyMaterials: "Kobalt, Lithium, Goud, Palladium, Zeldzame aardmetalen",
      industryImpact: "Zeer Hoog",
    },
    {
      id: 107,
      name: "Zonnepanelen",
      code: "8541",
      category: "Energie",
      type: "products",
      keyMaterials: "Silicium, Zilver, Indium, Gallium",
      industryImpact: "Hoog",
    },
    {
      id: 108,
      name: "Batterijen en accu's",
      code: "8506",
      category: "Energie",
      type: "products",
      keyMaterials: "Lithium, Kobalt, Nikkel, Grafiet",
      industryImpact: "Zeer Hoog",
    },
    {
      id: 109,
      name: "Medische apparatuur",
      code: "9018",
      category: "Gezondheid",
      type: "products",
      keyMaterials: "Koper, Aluminium, Platina, Titanium",
      industryImpact: "Hoog",
    },
    {
      id: 110,
      name: "Windturbines",
      code: "8502",
      category: "Energie",
      type: "products",
      keyMaterials: "IJzer, Aluminium, Koper, Zeldzame aardmetalen",
      industryImpact: "Hoog",
    },
    {
      id: 111,
      name: "Laptops en computers",
      code: "8471",
      category: "Technologie",
      type: "products",
      keyMaterials: "Aluminium, Koper, Goud, Palladium, Kobalt",
      industryImpact: "Hoog",
    },
    {
      id: 112,
      name: "Elektrische voertuigen",
      code: "8703",
      category: "Transport",
      type: "products",
      keyMaterials: "Lithium, Kobalt, Nikkel, Koper, Zeldzame aardmetalen",
      industryImpact: "Zeer Hoog",
    },
    {
      id: 113,
      name: "Ledverlichting",
      code: "9405",
      category: "Technologie",
      type: "products",
      keyMaterials: "Gallium, Indium, Zeldzame aardmetalen",
      industryImpact: "Gemiddeld",
    },
    {
      id: 114,
      name: "Halfgeleiders en chips",
      code: "8542",
      category: "Technologie",
      type: "products",
      keyMaterials: "Silicium, Germanium, Gallium, Arseen",
      industryImpact: "Zeer Hoog",
    },
    {
      id: 115,
      name: "Meubels van hout",
      code: "9403",
      category: "Huishouden",
      type: "products",
      keyMaterials: "Hout, IJzer",
      industryImpact: "Gemiddeld",
    },
  ];

  // Combine both datasets
  const allItems: Item[] = [...rawMaterials, ...productGroups];

  // Extract all unique categories from data
  const allCategories = [
    ...new Set([
      ...rawMaterials.map((item) => item.category),
      ...productGroups.map((item) => item.category),
    ]),
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>(allItems);

  const filtersRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parse search query from URL
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q") || "";
    const type = queryParams.get("type");
    const categoriesParam = queryParams.get("categories");

    const categories = categoriesParam ? categoriesParam.split(",") : [];

    // If we're in comparison mode and the search params change, exit comparison mode
    if (
      isComparing &&
      (query !== searchTerm ||
        type !== filterType ||
        categories.join(",") !== selectedCategories.join(","))
    ) {
      setIsComparing(false);
    }

    setSearchTerm(query);
    setInputValue(query);
    setFilterType(type);
    setSelectedCategories(categories);

    // Apply filters
    applyFilters(query, type, categories);
  }, [location.search]);

  const applyFilters = (
    query: string,
    type: string | null,
    categories: string[]
  ) => {
    // Start with all items
    let filtered = allItems;

    // Apply search query filter
    if (query) {
      filtered = filtered.filter(
        (item) =>
          // Match words that start with the search term
          item.name
            .toLowerCase()
            .split(/\s+/)
            .some((word) => word.startsWith(query.toLowerCase())) ||
          item.code.toLowerCase().startsWith(query.toLowerCase()) ||
          item.category.toLowerCase().startsWith(query.toLowerCase())
      );
    }

    // Apply type filter
    if (type === "materials") {
      filtered = filtered.filter((item) => item.type === "materials");
    } else if (type === "products") {
      filtered = filtered.filter((item) => item.type === "products");
    }

    // Apply category filter
    if (categories.length > 0) {
      filtered = filtered.filter((item) => categories.includes(item.category));
    }

    setFilteredItems(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Clear search
  const handleClearSearch = () => {
    setInputValue("");
    setSearchTerm("");

    // Exit comparison mode if active
    if (isComparing) {
      setIsComparing(false);
    }

    updateUrl("", filterType, selectedCategories);
  };

  // Handle search form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(inputValue);

    // Exit comparison mode if active
    if (isComparing) {
      setIsComparing(false);
    }

    updateUrl(inputValue, filterType, selectedCategories);
  };

  // Toggle filters dropdown
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setFilterType(null);
    updateUrl(searchTerm, null, []);
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    let newCategories: string[];

    if (selectedCategories.includes(category)) {
      // Remove category if already selected
      newCategories = selectedCategories.filter((c) => c !== category);
    } else {
      // Add category if not selected
      newCategories = [...selectedCategories, category];
    }

    setSelectedCategories(newCategories);
    updateUrl(searchTerm, filterType, newCategories);
  };

  // Handle type filter change
  const handleTypeChange = (type: string | null) => {
    setFilterType(type);
    updateUrl(searchTerm, type, selectedCategories);
  };

  // Update URL with current search parameters
  const updateUrl = (
    query: string,
    type: string | null,
    categories: string[]
  ) => {
    const queryParams = new URLSearchParams();
    if (query) queryParams.set("q", query);
    if (type) queryParams.set("type", type);
    if (categories.length > 0)
      queryParams.set("categories", categories.join(","));

    // Navigate without interfering with the current state
    navigate(`/${currentLang}/browse?${queryParams.toString()}`, {
      replace: true,
    });
  };

  // Handle item selection
  const handleItemSelect = (id: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedItems([]);
  };

  // Start comparison
  const startComparison = () => {
    setIsComparing(true);
  };

  // Exit comparison view
  const exitComparison = () => {
    setIsComparing(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        // Don't automatically close filters when clicking outside
        // Only toggle them when the button is clicked
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get selected items data
  const selectedItemsData = allItems.filter((item) =>
    selectedItems.includes(item.id)
  );

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t("browse.breadcrumb.home"), url: `/${currentLang}/home` },
    { label: t("browse.breadcrumb.current") },
  ];

  return (
    <div className={styles.container}>
      <Breadcrumb items={breadcrumbItems} />

      <div className={styles.header}>
        <h1 className={styles.title}>{t("browse.title")}</h1>
        <p className={styles.subtitle}>{t("browse.subtitle")}</p>
      </div>

      {!isComparing ? (
        <>
          {/* Search Section */}
          <div className={styles.searchSection} ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <div className={styles.searchInputWrapper}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder={t("browse.searchPlaceholder")}
                  value={inputValue}
                  onChange={handleSearchChange}
                />
                {inputValue && (
                  <button
                    type="button"
                    className={styles.clearButton}
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
              <button type="submit" className={styles.searchButton}>
                <FaSearch />
              </button>
            </form>
          </div>

          <div className={styles.toggleButtonContainer}>
            <button
              className={styles.filtersToggleButton}
              onClick={toggleFilters}
            >
              {showFilters ? (
                <>
                  <FaTimes /> {t("searchResults.hideFilters")}
                </>
              ) : (
                <>
                  <FaFilter /> {t("browse.filter")}
                </>
              )}
            </button>
          </div>

          {/* Comparison Controls (visible when items are selected) */}
          {selectedItems.length > 0 && (
            <div className={styles.comparisonControls}>
              <div className={styles.selectedCount}>
                <span>
                  {t("browse.selectedItems", { count: selectedItems.length })}
                </span>
                <button
                  className={styles.clearSelectionButton}
                  onClick={clearSelections}
                >
                  {t("browse.clearSelection")}
                </button>
              </div>
              <button
                className={styles.compareButton}
                onClick={startComparison}
                disabled={selectedItems.length < 2}
              >
                <FaExchangeAlt />
                {t("browse.compareSelected")}
              </button>
            </div>
          )}

          <div
            className={`${
              showFilters
                ? styles.resultsContainer
                : styles.resultsContainerNoGap
            }`}
          >
            {/* Filters Column */}
            <div
              className={`${styles.filtersColumn} ${
                !showFilters ? styles.filtersHidden : ""
              }`}
              ref={filtersRef}
            >
              <div className={styles.filterContent}>
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

                {(selectedCategories.length > 0 || filterType !== null) && (
                  <button
                    className={styles.clearFiltersButton}
                    onClick={clearFilters}
                  >
                    {t("searchResults.clearFilters")}
                  </button>
                )}
              </div>
            </div>

            {/* Results Column */}
            <div className={styles.resultsColumn}>
              {filteredItems.length === 0 && (
                <div className={styles.noResults}>
                  <h3>{t("browse.noResults")}</h3>
                  <p>{t("browse.tryDifferent")}</p>
                </div>
              )}
              <div className={styles.resultsGrid}>
                {filteredItems.length > 0 &&
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`${styles.itemCard} ${
                        selectedItems.includes(item.id)
                          ? styles.itemSelected
                          : ""
                      }`}
                    >
                      <div className={styles.itemSelection}>
                        <label className={styles.selectionCheckbox}>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleItemSelect(item.id)}
                          />
                          <span className={styles.checkmark}>
                            {selectedItems.includes(item.id) && <FaCheck />}
                          </span>
                        </label>
                      </div>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemCode}>{item.code}</span>
                        <span
                          className={`${styles.itemCategory} ${
                            item.type === "products"
                              ? styles.productGroup
                              : styles.material
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <Link
                        to={`/${currentLang}/detail/${item.id}`}
                        className={styles.itemLink}
                      >
                        {t("browse.viewDetails")}
                      </Link>
                    </div>
                  ))}
              </div>

              {/* Comparison feature instruction section */}
              {filteredItems.length > 0 &&
                selectedItems.length === 0 &&
                !searchTerm && (
                  <div className={styles.comparisonSection}>
                    <h2 className={styles.comparisonTitle}>
                      {t("browse.compareTitle")}
                    </h2>
                    <p className={styles.comparisonText}>
                      {t("browse.compareText")}
                    </p>
                    <p className={styles.comparisonInstructions}>
                      {t("browse.comparisonInstructions")}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </>
      ) : (
        /* Comparison View */
        <div className={styles.comparisonView}>
          <div className={styles.comparisonHeader}>
            <button className={styles.backButton} onClick={exitComparison}>
              <FaArrowLeft />
              {t("browse.backToBrowse")}
            </button>
            <h2 className={styles.comparisonViewTitle}>
              {t("browse.comparingItems", { count: selectedItemsData.length })}
            </h2>
          </div>

          <div className={styles.comparisonTable}>
            <table>
              <thead>
                <tr>
                  <th className={styles.propertyColumn}>
                    {t("browse.property")}
                  </th>
                  {selectedItemsData.map((item) => (
                    <th key={item.id} className={styles.itemColumn}>
                      <div className={styles.itemColumnHeader}>
                        <span className={styles.itemColumnCode}>
                          {item.code}
                        </span>
                        <span className={styles.itemColumnName}>
                          {item.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.propertyName}>
                    {t("browse.category")}
                  </td>
                  {selectedItemsData.map((item) => (
                    <td key={item.id}>{item.category}</td>
                  ))}
                </tr>

                {/* Raw Materials specific properties */}
                {selectedItemsData.some(
                  (item) => item.type === "materials"
                ) && (
                  <>
                    <tr>
                      <td className={styles.propertyName}>
                        {t("browse.description")}
                      </td>
                      {selectedItemsData.map((item) => (
                        <td key={item.id}>
                          {item.type === "materials"
                            ? item.description || "-"
                            : "-"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className={styles.propertyName}>
                        {t("browse.riskLevel")}
                      </td>
                      {selectedItemsData.map((item) => (
                        <td key={item.id}>
                          {item.type === "materials"
                            ? item.riskLevel || "-"
                            : "-"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className={styles.propertyName}>
                        {t("browse.availability")}
                      </td>
                      {selectedItemsData.map((item) => (
                        <td key={item.id}>
                          {item.type === "materials"
                            ? item.availability || "-"
                            : "-"}
                        </td>
                      ))}
                    </tr>
                  </>
                )}

                {/* Product Groups specific properties */}
                {selectedItemsData.some((item) => item.type === "products") && (
                  <>
                    <tr>
                      <td className={styles.propertyName}>
                        {t("browse.keyMaterials")}
                      </td>
                      {selectedItemsData.map((item) => (
                        <td key={item.id}>
                          {item.type === "products"
                            ? item.keyMaterials || "-"
                            : "-"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className={styles.propertyName}>
                        {t("browse.industryImpact")}
                      </td>
                      {selectedItemsData.map((item) => (
                        <td key={item.id}>
                          {item.type === "products"
                            ? item.industryImpact || "-"
                            : "-"}
                        </td>
                      ))}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;
