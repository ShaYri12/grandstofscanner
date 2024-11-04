import Tooltip from "../Tooltip/Tooltip";
import styles from "./RiskIndicators.module.css";

interface RiskSectionProps {
  title: string;
  items: string[];
}

// Reusable Section Component with props typing
function RiskSection({ title, items }: RiskSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <img src="/sheild.png" className={styles.icon} />
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.spaceY4}>
        {items.map((item, index) => (
          <label key={index} className={styles.checkboxContainer}>
            <input type="checkbox" className={styles.checkbox} />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

export default function RiskIndicators() {
  const sections = [
    {
      title: "Lange termijn leveringszekerheid",
      items: [
        "Risico van lage bewezen reserves (abiotische grondstoffen)",
        "Companionality (mate waarin grondstof een bijproduct is)",
        "Concentratie van reserves van grondstoffen (abiotische grondstoffen)",
      ],
    },
    {
      title: "Korte termijn leveringszekerheid",
      items: [
        "Concentratie van grondstofwinning/productie",
        "Risico's in verband met lage stabiliteit en kwaliteit van bestuur in bronlanden",
        "Risico dat grondstof wordt geraakt door exportrestricties",
        "Risico's vanwege afwezigheid van recycling",
      ],
    },
    {
      title: "Bedrijfsresultaat",
      items: ["Risico van hoge prijsvolatiliteit van grondstoffen/materialen"],
    },
    {
      title: "Impact op mens en milieu",
      items: [
        "Risico in verband met milieu-impact winning en productie",
        "Risico's in verband met lage graad van Human Development (HDI)",
        "Impact op biodiversiteit",
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={`${styles.grid} ${styles.gridTwoCols}`}>
        {sections.map((section, index) => (
          <RiskSection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}
      </div>
      <div className={styles.lastSection}>
        <div className={styles.lastSectionHeader}>
          <img src="/sheild.png" className={styles.icon} />
          <h2 className={styles.title}>
            Risico van lage bewezen reserves (abiotische grondstoffen)
          </h2>
          <Tooltip
            title="Maximale prijsstijging even titel iets langer maken"
            text="Dit staat voor de grootste prijsstijging die -sinds 1900- in één enkel jaar is opgetreden. Een maximale prijsstijging van 100% wil zeggen dat in één enkel jaar de prijs van een grondstof is verdubbeld. Er wordt gerekend in jaargemiddelden; dag-, week- en maandgemiddelden zijn buiten beschouwing gelaten."
            position="relative2"
          />
        </div>
        <div className={styles.imageContainer}>
          <img src="/chart.png" />
        </div>
        <p className={styles.viewDataIn}>Bekijk data in cijfers</p>
      </div>
    </div>
  );
}
