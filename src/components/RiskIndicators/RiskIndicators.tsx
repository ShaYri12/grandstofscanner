import Tooltip from "../Tooltip/Tooltip";
import styles from "./RiskIndicators.module.css";
import { useTranslation } from "react-i18next";

interface RiskSectionProps {
  title: string;
  items: string[];
}

// Reusable Section Component with props typing
function RiskSection({ title, items }: RiskSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <img src="/sheild.png" className={styles.icon} alt="Shield Icon" />
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
  const { t } = useTranslation(); // Use the translation hook

  const sections = [
    {
      title: t("antimoon.riskIndicators.long_term_security"),
      items: [
        t("antimoon.riskIndicators.long_term_items.0"),
        t("antimoon.riskIndicators.long_term_items.1"),
        t("antimoon.riskIndicators.long_term_items.2"),
      ],
    },
    {
      title: t("antimoon.riskIndicators.short_term_security"),
      items: [
        t("antimoon.riskIndicators.short_term_items.0"),
        t("antimoon.riskIndicators.short_term_items.1"),
        t("antimoon.riskIndicators.short_term_items.2"),
        t("antimoon.riskIndicators.short_term_items.3"),
      ],
    },
    {
      title: t("antimoon.riskIndicators.business_performance"),
      items: [t("antimoon.riskIndicators.business_items.0")],
    },
    {
      title: t("antimoon.riskIndicators.human_environment_impact"),
      items: [
        t("antimoon.riskIndicators.human_environment_items.0"),
        t("antimoon.riskIndicators.human_environment_items.1"),
        t("antimoon.riskIndicators.human_environment_items.2"),
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
          <img src="/sheild.png" className={styles.icon} alt="Shield Icon" />
          <h2 className={styles.title}>
            {t("antimoon.riskIndicators.low_reserves_risk")}
          </h2>
          <Tooltip
            title={t("antimoon.riskIndicators.max_price_increase")}
            text={t("antimoon.riskIndicators.max_price_increase_text")}
            position="relative2"
          />
        </div>
        <div className={styles.imageContainer}>
          <img src="/chart.png" alt="Chart" />
        </div>
        <p className={styles.viewDataIn}>
          {t("antimoon.riskIndicators.view_data")}
        </p>
      </div>
    </div>
  );
}
