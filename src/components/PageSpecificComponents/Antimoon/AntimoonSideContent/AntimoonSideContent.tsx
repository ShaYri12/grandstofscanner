import { FC } from "react";
import styles from "./AntimoonSideContent.module.css";
import { FaFile } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface AntimoonSideContentProps {}

const AntimoonSideContent: FC<AntimoonSideContentProps> = () => {
  const { t } = useTranslation();

  const renderProductItem = (iconClass: string, labelKey: string) => (
    <div className={styles.productItem}>
      <FaFile className={iconClass} />
      <span>{t(labelKey)}</span>
    </div>
  );

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
        {renderProductItem(
          styles.fileIcon1,
          "antimoon.sideContent.air_balloons_and_dirigibles"
        )}
        {renderProductItem(
          styles.fileIcon2,
          "antimoon.sideContent.lift_screw_aircraft"
        )}
      </div>
    </div>
  );
};

export default AntimoonSideContent;
