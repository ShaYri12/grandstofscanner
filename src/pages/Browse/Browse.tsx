import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaFilter,
  FaCheck,
  FaExchangeAlt,
  FaArrowLeft,
} from "react-icons/fa";
import styles from "./Browse.module.css";

interface BrowseProps {}

const Browse: React.FC<BrowseProps> = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  // Raw materials data - using the same data as in the Search components
  const rawMaterials = [
    {
      id: 1,
      name: "Antimoon",
      code: "Sb",
      category: "Metaal",
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
      description:
        "Palmolie is een plantaardige olie afkomstig van de oliepalm en wordt gebruikt in voedsel, cosmetica en biobrandstoffen.",
      riskLevel: "Gemiddeld",
      availability: "Goed",
    },
  ];

  // Product groups data - using the same data as in the Search components
  const productGroups = [
    {
      id: 1,
      name: "Elektronische apparaten",
      code: "85",
      category: "Technologie",
      keyMaterials: "Koper, Lithium, Zeldzame aardmetalen, Kobalt",
      industryImpact: "Hoog",
    },
    {
      id: 2,
      name: "Voertuigen",
      code: "87",
      category: "Transport",
      keyMaterials: "Aluminium, IJzer, Rubber, Koper, Lithium",
      industryImpact: "Zeer Hoog",
    },
    {
      id: 3,
      name: "Landbouwmachines",
      code: "84",
      category: "Landbouw",
      keyMaterials: "IJzer, Aluminium, Koper",
      industryImpact: "Hoog",
    },
    {
      id: 4,
      name: "Weefsels van katoen",
      code: "52",
      category: "Textiel",
      keyMaterials: "Katoen",
      industryImpact: "Gemiddeld",
    },
    {
      id: 5,
      name: "Farmaceutische producten",
      code: "30",
      category: "Gezondheid",
      keyMaterials: "Diverse chemische grondstoffen",
      industryImpact: "Hoog",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("materials"); // 'materials' or 'productGroups'
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const filtersRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Extract all unique categories from data
  const materialCategories = [
    "all",
    ...Array.from(new Set(rawMaterials.map((item) => item.category))),
  ];
  const productGroupCategories = [
    "all",
    ...Array.from(new Set(productGroups.map((item) => item.category))),
  ];

  // Get the current categories based on active tab
  const currentCategories =
    activeTab === "materials" ? materialCategories : productGroupCategories;

  // Get the current data based on active tab
  const currentData = activeTab === "materials" ? rawMaterials : productGroups;

  // Filter the data based on search term and active category
  const filteredData = currentData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Toggle filters dropdown
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Set active category
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveCategory("all");
    setShowFilters(false);
  };

  // Set active tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveCategory("all");
    setSelectedItems([]);
    setIsComparing(false);
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
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get selected items data
  const selectedItemsData = currentData.filter((item) =>
    selectedItems.includes(item.id)
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("browse.title")}</h1>
        <p className={styles.subtitle}>{t("browse.subtitle")}</p>
      </div>

      {!isComparing ? (
        <>
          {/* Search Section */}
          <div className={styles.searchSection} ref={searchRef}>
            <div className={styles.searchForm}>
              <div className={styles.searchInputWrapper}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder={t("browse.searchPlaceholder")}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm && (
                  <button
                    className={styles.clearButton}
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
              <button className={styles.filterButton} onClick={toggleFilters}>
                <FaFilter />
                {t("browse.filter")}
              </button>
            </div>

            {/* Filters Dropdown */}
            {showFilters && (
              <div className={styles.filtersDropdown} ref={filtersRef}>
                <div className={styles.filterHeader}>
                  <h3>{t("browse.filterByCategory")}</h3>
                  <button
                    className={styles.clearFiltersButton}
                    onClick={clearFilters}
                  >
                    {t("browse.clearFilters")}
                  </button>
                </div>
                <div className={styles.filterOptions}>
                  {currentCategories.map((category) => (
                    <label key={category} className={styles.filterOption}>
                      <input
                        type="radio"
                        name="category"
                        checked={activeCategory === category}
                        onChange={() => handleCategoryChange(category)}
                      />
                      {category === "all"
                        ? t("browse.allCategories")
                        : category}
                    </label>
                  ))}
                </div>
              </div>
            )}
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

          {/* Tab Navigation */}
          <div className={styles.tabNavigation}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "materials" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("materials")}
            >
              {t("browse.rawMaterials")}
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "productGroups" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("productGroups")}
            >
              {t("browse.productGroups")}
            </button>
          </div>

          {/* Results Grid */}
          <div className={styles.resultsGrid}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.itemCard} ${
                    selectedItems.includes(item.id) ? styles.itemSelected : ""
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
                    <span className={styles.itemCategory}>{item.category}</span>
                  </div>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <Link
                    to={`/${lang}/detail/${item.id}`}
                    className={styles.itemLink}
                  >
                    {t("browse.viewDetails")}
                  </Link>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <h3>{t("browse.noResults")}</h3>
                <p>{t("browse.tryDifferent")}</p>
              </div>
            )}
          </div>

          {/* Comparison feature instruction section */}
          {selectedItems.length === 0 && (
            <div className={styles.comparisonSection}>
              <h2 className={styles.comparisonTitle}>
                {t("browse.compareTitle")}
              </h2>
              <p className={styles.comparisonText}>{t("browse.compareText")}</p>
              <p className={styles.comparisonInstructions}>
                {t("browse.comparisonInstructions")}
              </p>
            </div>
          )}
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

                {activeTab === "materials" ? (
                  // Raw Materials specific properties
                  <>
                    <tr>
                      <td className={styles.propertyName}>
                        {t("browse.description")}
                      </td>
                      {selectedItemsData.map((item) => (
                        <td key={item.id}>
                          {(item as (typeof rawMaterials)[0]).description ||
                            "-"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className={styles.propertyName}>
                        {t("browse.riskLevel")}
                      </td>
                      {selectedItemsData.map((item) => (
                        <td key={item.id}>
                          {(item as (typeof rawMaterials)[0]).riskLevel || "-"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className={styles.propertyName}>
                        {t("browse.availability")}
                      </td>
                      {selectedItemsData.map((item) => (
                        <td key={item.id}>
                          {(item as (typeof rawMaterials)[0]).availability ||
                            "-"}
                        </td>
                      ))}
                    </tr>
                  </>
                ) : (
                  // Product Groups specific properties
                  <>
                    <tr>
                      <td className={styles.propertyName}>
                        {t("browse.keyMaterials")}
                      </td>
                      {selectedItemsData.map((item) => (
                        <td key={item.id}>
                          {(item as (typeof productGroups)[0]).keyMaterials ||
                            "-"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className={styles.propertyName}>
                        {t("browse.industryImpact")}
                      </td>
                      {selectedItemsData.map((item) => (
                        <td key={item.id}>
                          {(item as (typeof productGroups)[0]).industryImpact ||
                            "-"}
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
