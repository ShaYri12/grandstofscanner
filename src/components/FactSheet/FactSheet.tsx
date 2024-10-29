import { useTranslation } from "react-i18next"; // Import useTranslation
import styles from "./FactSheet.module.css";
import { FaChevronRight } from "react-icons/fa";
import { useProductGroupData } from "../../assets/productGroupData";

const FactSheet = () => {
  const productGroup = useProductGroupData();

  return (
    <div className={styles.boxes}>
      {/* Side Panel */}
      <div className={styles.sidePanel}>
        {productGroup.factsheets.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.icon}>{item.symbol}</div>
            <div>
              <p className={styles.title}>{item.title}</p>
              <a href="#" className={styles.link}>
                {item.linkText} <FaChevronRight className={styles.linkIcon} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content and Alternate Content */}
      {productGroup.productGroups.map((product, index) => (
        <div
          key={index}
          className={product.isAlt ? styles.mainContentAlt : styles.mainContent}
        >
          <p className={styles.code}>{product.code}</p>
          <h3 className={styles.mainTitle}>{product.title}</h3>
          <a href="#" className={styles.mainLink}>
            {product.linkText} <FaChevronRight className={styles.linkIcon} />
          </a>
          <div className={styles.info}>
            {product.info.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FactSheet;
