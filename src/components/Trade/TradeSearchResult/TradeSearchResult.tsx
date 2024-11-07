import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaEuroSign, FaLeaf } from "react-icons/fa";
import styles from "./TradeSearchResult.module.css";
import { LuClock3 } from "react-icons/lu";
import { RiSettings5Fill } from "react-icons/ri";
import longTermSecurtiy from "../../../assets/long-term-security.png";
import shortTermSecurity from "../../../assets/short-term-security.png";
import world from "../../../assets/world.png";
import people from "../../../assets/people-stars.png";
import chart from "../../../assets/chart.png";
import truck from "../../../assets/truck.png";
import { IconType } from "react-icons";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import i18next from "i18next";

type IconMapKeys =
  | "long-term-security"
  | "world"
  | "people"
  | "chart"
  | "short-term-security";

// Define a union type for your icon keys
type Icon2MapKeys = "truck" | "leaf";

// Define the icon map with a specific type
const iconMap: Record<Icon2MapKeys, string | IconType> = {
  truck: truck, // Using the imported truck icon
  leaf: FaLeaf, // Using the imported FaLeaf component
};

const TradeSearchResult = () => {
  const { t } = useTranslation();
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  const toggleCard = (index: number) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const results = [
    {
      title: t("tradeSearch.tradeSearchResult.cards.0.title"),
      bedrijfsvoering: ["long-term-security", "world", "people", "chart"],
      kosten: 1,
      tijd: 2,
      complexiteit: 1,
      abiotisch: ["truck", "leaf"],
      description: t("tradeSearch.tradeSearchResult.cards.0.description"),
    },
    {
      title: t("tradeSearch.tradeSearchResult.cards.1.title"),
      bedrijfsvoering: ["long-term-security", "world", "people", "chart"],
      kosten: 2,
      tijd: 2,
      complexiteit: 1,
      abiotisch: ["truck", "leaf"],
      description: t("tradeSearch.tradeSearchResult.cards.1.description"),
    },
    {
      title: t("tradeSearch.tradeSearchResult.cards.2.title"),
      bedrijfsvoering: ["long-term-security", "world", "people", "chart"],
      kosten: 2,
      tijd: 1,
      complexiteit: 1,
      abiotisch: ["truck", "leaf"],
      description: t("tradeSearch.tradeSearchResult.cards.2.description"),
    },
    {
      title: t("tradeSearch.tradeSearchResult.cards.3.title"),
      bedrijfsvoering: [
        "short-term-security",
        "world",
        "long-term-security",
        "chart",
      ],
      kosten: 1,
      tijd: 2,
      complexiteit: 3,
      abiotisch: ["truck", "leaf"],
      description: t("tradeSearch.tradeSearchResult.cards.3.description"),
    },
    {
      title: t("tradeSearch.tradeSearchResult.cards.4.title"),
      bedrijfsvoering: ["long-term-security", "world", "people", "chart"],
      kosten: 1,
      tijd: 2,
      complexiteit: 1,
      abiotisch: ["truck", "leaf"],
      description: t("tradeSearch.tradeSearchResult.cards.4.description"),
    },
  ];
  return (
    <div className={styles.mainContent}>
      <h2 className={styles.resultsCount}>
        <span>2335</span> {t("tradeSearch.tradeSearchResult.results.count")}
      </h2>
      <div className={styles.mainContentInner}>
        {results.map((result, index) => (
          <div key={index} className={styles.card}>
            <div
              className={styles.cardHeader}
              onClick={() => toggleCard(index)}
            >
              <h3 className={styles.cardTitle}>{result.title}</h3>
              <div className={styles.circle}>
                {expandedCards.includes(index) ? (
                  <FaChevronUp className={styles.icon} />
                ) : (
                  <FaChevronDown className={styles.icon} />
                )}
              </div>
            </div>

            <div className={styles.cardDescription}>
              <div className={styles.cardDetail}>
                <div className={styles.detail}>
                  <span className={styles.category}>
                    {t(
                      "tradeSearch.tradeSearchResult.results.business_operations"
                    )}
                  </span>
                  <div className={styles.detailsIcons}>
                    {result.bedrijfsvoering.map((iconName, idx) => {
                      const iconMap: Record<IconMapKeys, string> = {
                        "long-term-security": longTermSecurtiy,
                        "short-term-security": shortTermSecurity,
                        world: world,
                        people: people,
                        chart: chart,
                      };
                      return (
                        <span key={idx} className={styles.detailIcon}>
                          <img
                            src={iconMap[iconName as IconMapKeys]}
                            alt={iconName}
                          />
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.detail}>
                  <span className={styles.category}>
                    {t("tradeSearch.tradeSearchResult.results.cost")}
                  </span>
                  <div className={styles.detailsIcons}>
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={
                          idx < result.kosten
                            ? styles.detailIcon
                            : styles.detailIconGray
                        }
                      >
                        <FaEuroSign />
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.detail}>
                  <span className={styles.category}>
                    {t("tradeSearch.tradeSearchResult.results.time")}
                  </span>
                  <div className={styles.detailsIcons}>
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={
                          idx < result.tijd
                            ? styles.detailIcon
                            : styles.detailIconGray
                        }
                      >
                        <LuClock3 />
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.detail}>
                  <span className={styles.category}>
                    {t("tradeSearch.tradeSearchResult.results.complexity")}
                  </span>
                  <div className={styles.detailsIcons}>
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={
                          idx < result.complexiteit
                            ? styles.detailIcon
                            : styles.detailIconGray
                        }
                      >
                        <RiSettings5Fill />
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.detail}>
                  <span className={styles.category}>
                    {t("tradeSearch.tradeSearchResult.results.abiotic")}
                  </span>
                  <div className={styles.detailsIcons}>
                    {result.abiotisch.map((iconName, idx) => {
                      const icon = iconMap[iconName as Icon2MapKeys];
                      return (
                        <span key={idx} className={styles.detailIcon}>
                          {typeof icon === "string" ? (
                            <img src={icon} alt={iconName} />
                          ) : (
                            React.createElement(icon)
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              {expandedCards.includes(index) && (
                <p className={styles.cardPara}>{result.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeSearchResult;
