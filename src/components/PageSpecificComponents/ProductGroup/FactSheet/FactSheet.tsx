import styles from "./FactSheet.module.css";
import { FaChevronRight } from "react-icons/fa";
import { useProductGroupData } from "../../../../assets/productGroupData";

interface FactSheetItem {
  symbol: JSX.Element;
  title: string;
  linkText: string;
}

interface ProductGroupItem {
  code: string;
  title: string;
  linkText: string;
  isAlt: boolean;
  info: string[];
}

interface ProductGroupData {
  factsheets: FactSheetItem[];
  productGroups: ProductGroupItem[];
}

const FactSheet: React.FC = () => {
  const productGroup = useProductGroupData() as unknown as ProductGroupData;

  return (
    <div className={styles.boxes}>
      <div className={styles.sidePanel}>
        {productGroup.factsheets.map((item) => (
          <div key={item.title} className={styles.item}>
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

      {productGroup.productGroups.map((product) => (
        <div
          key={product.code}
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
