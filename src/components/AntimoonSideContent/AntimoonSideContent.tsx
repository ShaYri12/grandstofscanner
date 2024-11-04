import styles from "./AntimoonSideContent.module.css";
import { FaFile } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AntimoonSideContent = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>
        {t("antimoon.sideContent.general_information")}
      </h3>
      <div className={styles.sidebarSection}>
        <p className={styles.sidebarPara}>
          <span className={styles.symbolLabel}>Sb</span>{" "}
          {t("antimoon.sideContent.is_abbreviation")}{" "}
          <span className={styles.symbolLabel}>
            {t("antimoon.sideContent.antimony")}
          </span>{" "}
          {t("antimoon.sideContent.in_periodic_table")}
        </p>
        <div className={styles.nonConflictLabel}>
          {t("antimoon.sideContent.no_conflict_material")}
        </div>
      </div>

      <h3 className={styles.ProductGroup}>
        {t("antimoon.sideContent.product_groups")}
      </h3>
      <div className={styles.productList}>
        <div className={styles.productItem}>
          <FaFile className={styles.fileIcon1} />
          <span>{t("antimoon.sideContent.air_balloons_and_dirigibles")}</span>
        </div>
        <div className={styles.productItem}>
          <FaFile className={styles.fileIcon2} />
          <span>{t("antimoon.sideContent.lift_screw_aircraft")}</span>
        </div>
      </div>
    </div>
  );
};

export default AntimoonSideContent;
