import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
  FaEuroSign,
  FaLeaf,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Trade.module.css";
import { LuClock3 } from "react-icons/lu";
import { RiSettings5Fill } from "react-icons/ri";
import longTermSecurtiy from "../../assets/long-term-security.png";
import shortTermSecurity from "../../assets/short-term-security.png";
import world from "../../assets/world.png";
import people from "../../assets/people-stars.png";
import chart from "../../assets/chart.png";
import truck from "../../assets/truck.png";
import { IconType } from "react-icons";

type FilterOption = {
  label: string;
  image: string;
};

type FilterSection = {
  title: string;
  options: (string | FilterOption)[];
};

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

const Trade = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filterOptions: FilterSection[] = [
    {
      title: "Type supply",
      options: [
        "Andere supply (2)",
        "Betere supply (5)",
        "Minder verbruik (5)",
      ],
    },
    {
      title: "Bedrijfsvoering",
      options: [
        {
          label: "Lange termijn leveringszekerheid (5)",
          image: longTermSecurtiy, // Replace with actual image path
        },
        {
          label: "Korte termijn leveringszekerheid (10)",
          image: shortTermSecurity, // Replace with actual image path
        },
        {
          label: "Impact op mens en milieu (22)",
          image: people, // Replace with actual image path
        },
        {
          label: "Bedrijfsresultaat (33)",
          image: chart, // Replace with actual image path
        },
        {
          label: "IMVO (46)",
          image: world, // Replace with actual image path
        },
      ],
    },
  ];

  const results = [
    {
      title:
        "Zet een systeem op om het supply-chain-risico te managen in de organisatie",
      bedrijfsvoering: ["long-term-security", "world", "people", "chart"],
      kosten: 1,
      tijd: 2,
      complexiteit: 1,
      abiotisch: ["truck", "leaf"],
      description:
        "Zet supply chain risk management en een passende strategie op: - Borg het belang en de continuïteit in de organisatie (bijvoorbeeld: passend budget en impact op targets). - Analyseer welke competenties en verantwoordelijkheden nodig zijn en betrek die (bijvoorbeeld: inkoop, marketing & sales, R&D, techniek). - Definieer indicatoren voor de bepaling van impact en risico's. - Breng kritieke afhankelijkheden (leveranciers, componenten, resources, en dergelijke) in kaart. - Stel per afhankelijkheid een actieplan op (vergelijk met HACCP-aanpak). - Analyseer de kans op en impact van leveringsproblemen (financieel, reputatie, enzovoorts) bijvoorbeeld met een Kraljic-analyse. - Stel businesscontinuïteitsplannen op (bijvoorbeeld: verzekeringen). - Ontwerp een strategie hoe met leveranciers om te gaan (bijvoorbeeld periodieke audits, communicatiestrategie, etc.).",
    },
    {
      title:
        "Zet een systeem op om het supply-chain-risico te managen in de organisatie",
      bedrijfsvoering: ["long-term-security", "world", "people", "chart"],
      kosten: 2,
      tijd: 2,
      complexiteit: 1,
      abiotisch: ["truck", "leaf"],
      description:
        "Zet supply chain risk management en een passende strategie op: - Borg het belang en de continuïteit in de organisatie (bijvoorbeeld: passend budget en impact op targets). - Analyseer welke competenties en verantwoordelijkheden nodig zijn en betrek die (bijvoorbeeld: inkoop, marketing & sales, R&D, techniek). - Definieer indicatoren voor de bepaling van impact en risico's. - Breng kritieke afhankelijkheden (leveranciers, componenten, resources, en dergelijke) in kaart. - Stel per afhankelijkheid een actieplan op (vergelijk met HACCP-aanpak). - Analyseer de kans op en impact van leveringsproblemen (financieel, reputatie, enzovoorts) bijvoorbeeld met een Kraljic-analyse. - Stel businesscontinuïteitsplannen op (bijvoorbeeld: verzekeringen). - Ontwerp een strategie hoe met leveranciers om te gaan (bijvoorbeeld periodieke audits, communicatiestrategie, etc.).",
    },
    {
      title:
        "Zet een systeem op om het supply-chain-risico te managen in de organisatie",
      bedrijfsvoering: ["long-term-security", "world", "people", "chart"],
      kosten: 2,
      tijd: 1,
      complexiteit: 1,
      abiotisch: ["truck", "leaf"],
      description:
        "Zet supply chain risk management en een passende strategie op: - Borg het belang en de continuïteit in de organisatie (bijvoorbeeld: passend budget en impact op targets). - Analyseer welke competenties en verantwoordelijkheden nodig zijn en betrek die (bijvoorbeeld: inkoop, marketing & sales, R&D, techniek). - Definieer indicatoren voor de bepaling van impact en risico's. - Breng kritieke afhankelijkheden (leveranciers, componenten, resources, en dergelijke) in kaart. - Stel per afhankelijkheid een actieplan op (vergelijk met HACCP-aanpak). - Analyseer de kans op en impact van leveringsproblemen (financieel, reputatie, enzovoorts) bijvoorbeeld met een Kraljic-analyse. - Stel businesscontinuïteitsplannen op (bijvoorbeeld: verzekeringen). - Ontwerp een strategie hoe met leveranciers om te gaan (bijvoorbeeld periodieke audits, communicatiestrategie, etc.).",
    },
    {
      title:
        "Zet een systeem op om het supply-chain-risico te managen in de organisatie",
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
      description:
        "Zet supply chain risk management en een passende strategie op: - Borg het belang en de continuïteit in de organisatie (bijvoorbeeld: passend budget en impact op targets). - Analyseer welke competenties en verantwoordelijkheden nodig zijn en betrek die (bijvoorbeeld: inkoop, marketing & sales, R&D, techniek). - Definieer indicatoren voor de bepaling van impact en risico's. - Breng kritieke afhankelijkheden (leveranciers, componenten, resources, en dergelijke) in kaart. - Stel per afhankelijkheid een actieplan op (vergelijk met HACCP-aanpak). - Analyseer de kans op en impact van leveringsproblemen (financieel, reputatie, enzovoorts) bijvoorbeeld met een Kraljic-analyse. - Stel businesscontinuïteitsplannen op (bijvoorbeeld: verzekeringen). - Ontwerp een strategie hoe met leveranciers om te gaan (bijvoorbeeld periodieke audits, communicatiestrategie, etc.).",
    },
    {
      title:
        "Zet een systeem op om het supply-chain-risico te managen in de organisatie",
      bedrijfsvoering: ["long-term-security", "world", "people", "chart"],
      kosten: 1,
      tijd: 2,
      complexiteit: 1,
      abiotisch: ["truck", "leaf"],
      description:
        "Zet supply chain risk management en een passende strategie op: - Borg het belang en de continuïteit in de organisatie (bijvoorbeeld: passend budget en impact op targets). - Analyseer welke competenties en verantwoordelijkheden nodig zijn en betrek die (bijvoorbeeld: inkoop, marketing & sales, R&D, techniek). - Definieer indicatoren voor de bepaling van impact en risico's. - Breng kritieke afhankelijkheden (leveranciers, componenten, resources, en dergelijke) in kaart. - Stel per afhankelijkheid een actieplan op (vergelijk met HACCP-aanpak). - Analyseer de kans op en impact van leveringsproblemen (financieel, reputatie, enzovoorts) bijvoorbeeld met een Kraljic-analyse. - Stel businesscontinuïteitsplannen op (bijvoorbeeld: verzekeringen). - Ontwerp een strategie hoe met leveranciers om te gaan (bijvoorbeeld periodieke audits, communicatiestrategie, etc.).",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.texts}>
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <FaChevronRight className={styles.breadcrumbIcon} />
            <span className={styles.breadcrumbCurrent}>Handelen</span>
          </nav>
          <h4 className={styles.step}>Stap 3</h4>
          <div>
            <h2 className={styles.heading1}>Handelen</h2>
            <p className={styles.para1}>
              Hier vindt u handelingsperspectieven die u kunnen helpen bij het
              managen van uw bedrijfsrisico’s en (de risico’s van) impacts op
              mens en milieu.
            </p>
            <p className={styles.para2}>
              Bent u op zoek naar meer informatie en ondersteuning bij het
              identificeren en adresseren van negatieve impacts op mens en
              milieu in metaalketens? Bekijk de website van het Internationaal
              MVO convenant voor de metaalsector. Daarnaast kunt u de tool
              Wegwijzer Circulair Inkopen raadplegen voor aanvullende ideeën
              rondom het sluiten van materiaalkringlopen.
            </p>
          </div>
        </div>
      </div>
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
          <div className={styles.mainContent}>
            <h2 className={styles.resultsCount}>
              <span>2335</span> zoekresultaten
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
                        <span className={styles.category}>Bedrijfsvoering</span>
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
                        <span className={styles.category}>Kosten</span>
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
                        <span className={styles.category}>Tijd</span>
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
                        <span className={styles.category}>Complexiteit</span>
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
                        <span className={styles.category}>(A)-biotisch</span>
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
        </div>
      </div>
    </div>
  );
};

export default Trade;
