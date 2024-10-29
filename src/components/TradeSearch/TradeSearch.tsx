import styles from "./TradeSearch.module.css";
import longTermSecurity from "../../assets/long-term-security.png";
import shortTermSecurity from "../../assets/short-term-security.png";
import world from "../../assets/world.png";
import people from "../../assets/people-stars.png";
import chart from "../../assets/chart.png";
import TradeSearchResult from "../TradeSearchResult/TradeSearchResult";
import { useTranslation } from "react-i18next";

type FilterOption = {
  label: string;
  image: string;
};

type FilterSection = {
  title: string;
  options: (string | FilterOption)[];
};

const TradeSearch = () => {
  const { t } = useTranslation();

  const filterOptions: FilterSection[] = [
    {
      title: t("tradeSearch.filterSections.0.title"), // Use dot notation instead of brackets
      options: [
        t("tradeSearch.filterSections.0.options.0"),
        t("tradeSearch.filterSections.0.options.1"),
        t("tradeSearch.filterSections.0.options.2"),
      ],
    },
    {
      title: t("tradeSearch.filterSections.1.title"),
      options: [
        {
          label: t("tradeSearch.filterSections.1.options.0.label"),
          image: longTermSecurity,
        },
        {
          label: t("tradeSearch.filterSections.1.options.1.label"),
          image: shortTermSecurity,
        },
        {
          label: t("tradeSearch.filterSections.1.options.2.label"),
          image: people,
        },
        {
          label: t("tradeSearch.filterSections.1.options.3.label"),
          image: chart,
        },
        {
          label: t("tradeSearch.filterSections.1.options.4.label"),
          image: world,
        },
      ],
    },
  ];

  return (
    <div className={styles.sidebarAndMain}>
      <div className={styles.box}>
        <div className={styles.sidebarContent}>
          {filterOptions.map((section, index) => (
            <div key={index} className={styles.filterSection}>
              <h3 className={styles.filterTitle}>{section.title}</h3>
              {section.options.map((option, optionIndex) => (
                <div key={optionIndex} className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id={`option-${index}-${optionIndex}`}
                    className={styles.checkbox}
                  />
                  {typeof option !== "string" && option.image && (
                    <img
                      src={option.image}
                      alt={option.label}
                      className={styles.optionImage}
                    />
                  )}
                  <label
                    htmlFor={`option-${index}-${optionIndex}`}
                    className={styles.checkboxLabel}
                  >
                    {typeof option === "string" ? option : option.label}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main content */}
        <TradeSearchResult />
      </div>
    </div>
  );
};

export default TradeSearch;
