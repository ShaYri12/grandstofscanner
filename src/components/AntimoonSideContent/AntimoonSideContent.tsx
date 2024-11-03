import styles from "./AntimoonSideContent.module.css";
import { FaFile } from "react-icons/fa";

const AntimoonSideContent = () => {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>Algemene informatie</h3>
      <div className={styles.sidebarSection}>
        <p className={styles.sidebarPara}>
          <span className={styles.symbolLabel}>Sb</span> is de afkorting van{" "}
          <span className={styles.symbolLabel}>Antimoon</span> in het periodiek
          systeem
        </p>
        <div className={styles.nonConflictLabel}>Geen conflict materiaal</div>
      </div>

      <h3 className={styles.ProductGroup}>Productgroepen</h3>
      <div className={styles.productList}>
        <div className={styles.productItem}>
          <FaFile className={styles.fileIcon1} />
          <span>Luchtballons en luchtschepen (0,002)</span>
        </div>
        <div className={styles.productItem}>
          <FaFile className={styles.fileIcon2} />
          <span>Hefschroefvliegtuigen (0,000)</span>
        </div>
      </div>
    </div>
  );
};

export default AntimoonSideContent;
