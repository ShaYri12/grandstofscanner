import React, { useState } from "react";
import {
  FaShieldAlt,
  FaGlobeAmericas,
  FaUsers,
  FaChartBar,
  FaClock,
  FaCogs,
  FaTractor,
  FaLeaf,
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
} from "react-icons/fa";
import { MdEuro } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./Trade.module.css";

const Trade = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filterOptions = [
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
        "Lange termijn leveringszekerheid (5)",
        "Korte termijn leveringszekerheid (10)",
        "Impact op mens en milieu (22)",
        "Bedrijfsresultaat (33)",
        "IMVO (46)",
      ],
    },
  ];

  const results = [
    {
      title:
        "Zet een systeem op om het supply-chain-risico te managen in de organisatie",
      bedrijfsvoering: ["shield", "globe", "users", "chart"],
      kosten: 1,
      tijd: 2,
      complexiteit: 1,
      abiotisch: ["tractor", "leaf"],
      description:
        "Zet supply chain risk management en een passende strategie op: - Borg het belang en de continuïteit in de organisatie (bijvoorbeeld: passend budget en impact op targets). - Analyseer welke competenties en verantwoordelijkheden nodig zijn en betrek die (bijvoorbeeld: inkoop, marketing & sales, R&D, techniek). - Definieer indicatoren voor de bepaling van impact en risico's. - Breng kritieke afhankelijkheden (leveranciers, componenten, resources, en dergelijke) in kaart. - Stel per afhankelijkheid een actieplan op (vergelijk met HACCP-aanpak). - Analyseer de kans op en impact van leveringsproblemen (financieel, reputatie, enzovoorts) bijvoorbeeld met een Kraljic-analyse. - Stel businesscontinuïteitsplannen op (bijvoorbeeld: verzekeringen). - Ontwerp een strategie hoe met leveranciers om te gaan (bijvoorbeeld periodieke audits, communicatiestrategie, etc.).",
    },
    {
      title:
        "Zet een systeem op om het supply-chain-risico te managen in de organisatie",
      bedrijfsvoering: ["shield", "globe", "users", "chart"],
      kosten: 1,
      tijd: 2,
      complexiteit: 1,
      abiotisch: ["tractor", "leaf"],
      description:
        "Zet supply chain risk management en een passende strategie op: - Borg het belang en de continuïteit in de organisatie (bijvoorbeeld: passend budget en impact op targets). - Analyseer welke competenties en verantwoordelijkheden nodig zijn en betrek die (bijvoorbeeld: inkoop, marketing & sales, R&D, techniek). - Definieer indicatoren voor de bepaling van impact en risico's. - Breng kritieke afhankelijkheden (leveranciers, componenten, resources, en dergelijke) in kaart. - Stel per afhankelijkheid een actieplan op (vergelijk met HACCP-aanpak). - Analyseer de kans op en impact van leveringsproblemen (financieel, reputatie, enzovoorts) bijvoorbeeld met een Kraljic-analyse. - Stel businesscontinuïteitsplannen op (bijvoorbeeld: verzekeringen). - Ontwerp een strategie hoe met leveranciers om te gaan (bijvoorbeeld periodieke audits, communicatiestrategie, etc.).",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <FaChevronRight className={styles.breadcrumbIcon} />
          <Link to="/" className={styles.breadcrumbLink}>
            Handelen
          </Link>
        </nav>
        <h4>Stap 3</h4>
        <div>
          <h2 className={styles.heading1}>Handelen</h2>
          <p className={styles.para}>
            Hier vindt u handelingsperspectieven die u kunnen helpen bij het
            managen van uw bedrijfsrisico’s en (de risico’s van) impacts op mens
            en milieu.
          </p>
          <p className={styles.para}>
            Bent u op zoek naar meer informatie en ondersteuning bij het
            identificeren en adresseren van negatieve impacts op mens en milieu
            in metaalketens? Bekijk de website van het Internationaal MVO
            convenant voor de metaalsector. Daarnaast kunt u de tool Wegwijzer
            Circulair Inkopen raadplegen voor aanvullende ideeën rondom het
            sluiten van materiaalkringlopen.
          </p>
        </div>
      </div>
      <div className={styles.sidebarAndMain}>
        <div className={styles.sidebarContent}>
          <h2 className={styles.resultsCount}>2335 zoekresultaten</h2>
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
                  <label
                    htmlFor={`option-${index}-${optionIndex}`}
                    className={styles.checkboxLabel}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className={styles.mainContent}>
          {results.map((result, index) => (
            <div key={index} className={styles.card}>
              <div
                className={styles.cardHeader}
                onClick={() => toggleCard(index)}
              >
                <h3 className={styles.cardTitle}>{result.title}</h3>
                {expandedCards.includes(index) ? (
                  <FaChevronUp className={styles.icon} />
                ) : (
                  <FaChevronDown className={styles.icon} />
                )}
              </div>
              {expandedCards.includes(index) && (
                <div className={styles.cardDescription}>
                  <div className={styles.cardDetail}>
                    <div className={styles.cardDetailSection}>
                      <FaShieldAlt className={styles.iconMargin} />
                      <span className={styles.cardDetailTitle}>Kosten:</span>
                      <span className={styles.textGray600}>
                        {result.kosten}
                      </span>
                    </div>
                    <div className={styles.cardDetailSection}>
                      <FaClock className={styles.iconMargin} />
                      <span className={styles.cardDetailTitle}>Tijd:</span>
                      <span className={styles.textGray600}>{result.tijd}</span>
                    </div>
                    <div className={styles.cardDetailSection}>
                      <FaCogs className={styles.iconMargin} />
                      <span className={styles.cardDetailTitle}>
                        Complexiteit:
                      </span>
                      <span className={styles.textGray600}>
                        {result.complexiteit}
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardDetail}>
                    <div className={styles.cardDetailSection}>
                      {result.abiotisch.map((icon, i) => {
                        if (icon === "tractor") {
                          return (
                            <FaTractor key={i} className={styles.iconMargin} />
                          );
                        }
                        if (icon === "leaf") {
                          return (
                            <FaLeaf key={i} className={styles.iconMargin} />
                          );
                        }
                        return null;
                      })}
                      <span className={styles.cardDetailTitle}>Abiotisch:</span>
                    </div>
                  </div>
                  <p className={styles.textGray300}>{result.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trade;
