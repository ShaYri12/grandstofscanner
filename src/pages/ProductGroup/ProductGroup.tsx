import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import styles from "./ProductGroup.module.css";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Factsheet {
  symbol: string;
  title: string;
  linkText: string;
}

interface ProductGroup {
  code: string;
  title: string;
  linkText: string;
  info: string[]; // Explicitly define as an array of strings
  isAlt: boolean;
}

interface ProductGroupTranslations {
  breadcrumb: {
    home: string;
    exploreReview: string;
    review: string;
  };
  heading1: string;
  paragraphs: {
    intro1: string;
    intro2: string;
    selectedGroups: string;
    riskAction: string;
    note: string;
  };
  heading2: string;
  actionButton: string;
  factsheets: Factsheet[];
  productGroups: ProductGroup[];
}

const ProductGroups: React.FC = () => {
  const { t } = useTranslation(); // Initialize the translation function

  // Use the translation structure from your provided data
  const productGroup: ProductGroupTranslations = {
    breadcrumb: {
      home: t("productGroup.breadcrumb.home"),
      exploreReview: t("productGroup.breadcrumb.exploreReview"),
      review: t("productGroup.breadcrumb.review"),
    },
    heading1: t("productGroup.heading1"),
    paragraphs: {
      intro1: t("productGroup.paragraphs.intro1"),
      intro2: t("productGroup.paragraphs.intro2"),
      selectedGroups: t("productGroup.paragraphs.selectedGroups"),
      riskAction: t("productGroup.paragraphs.riskAction"),
      note: t("productGroup.paragraphs.note"),
    },
    heading2: t("productGroup.heading2"),
    actionButton: t("productGroup.actionButton"),
    factsheets: [
      {
        symbol: "Fe",
        title: t("productGroup.factsheets.0.title"),
        linkText: t("productGroup.factsheetLinkText"),
      },
      {
        symbol: "Sb",
        title: t("productGroup.factsheets.1.title"),
        linkText: t("productGroup.factsheetLinkText"),
      },
      {
        symbol: "Fe",
        title: t("productGroup.factsheets.2.title"),
        linkText: t("productGroup.factsheetLinkText"),
      },
    ],
    productGroups: [
      {
        code: "340600",
        title: t("productGroup.productGroups.0.title"),
        linkText: t("productGroup.productGroups.0.linkText"),
        info: t("productGroup.productGroups.0.info", {
          returnObjects: true,
        }) as string[], // Cast to string[]
        isAlt: false,
      },
      {
        code: "340600",
        title: t("productGroup.productGroups.1.title"),
        linkText: t("productGroup.productGroups.1.linkText"),
        info: t("productGroup.productGroups.1.info", {
          returnObjects: true,
        }) as string[], // Cast to string[]
        isAlt: true,
      },
      {
        code: "340600",
        title: t("productGroup.productGroups.2.title"),
        linkText: t("productGroup.productGroups.2.linkText"),
        info: t("productGroup.productGroups.2.info", {
          returnObjects: true,
        }) as string[], // Cast to string[]
        isAlt: false,
      },
    ],
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>
            {productGroup.breadcrumb.home}
          </Link>
          <FaChevronRight className={styles.breadcrumbIcon} />
          <Link to="/" className={styles.breadcrumbLink}>
            {productGroup.breadcrumb.exploreReview}
          </Link>
          <FaChevronRight className={styles.breadcrumbIcon} />
          <span className={styles.breadcrumbCurrent}>
            {productGroup.breadcrumb.review}
          </span>
        </nav>
        <div>
          <h2 className={styles.heading1}>{productGroup.heading1}</h2>
          <p className={styles.para}>{productGroup.paragraphs.intro1}</p>
          <p className={styles.para}>{productGroup.paragraphs.intro2}</p>
        </div>
        <h3 className={styles.heading2}>{productGroup.heading2}</h3>
        <p className={styles.para}>{productGroup.paragraphs.selectedGroups}</p>

        <div className={styles.boxes}>
          {/* Side Panel */}
          <div className={styles.sidePanel}>
            {productGroup.factsheets.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.icon}>{item.symbol}</div>
                <div>
                  <p className={styles.title}>{item.title}</p>
                  <a href="#" className={styles.link}>
                    {item.linkText}{" "}
                    <FaChevronRight className={styles.linkIcon} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content and Alternate Content */}
          {productGroup.productGroups.map((product, index) => (
            <div
              key={index}
              className={
                product.isAlt ? styles.mainContentAlt : styles.mainContent
              }
            >
              <p className={styles.code}>{product.code}</p>
              <h3 className={styles.mainTitle}>{product.title}</h3>
              <a href="#" className={styles.mainLink}>
                {product.linkText}{" "}
                <FaChevronRight className={styles.linkIcon} />
              </a>
              <div className={styles.info}>
                {product.info.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className={styles.para}>{productGroup.paragraphs.riskAction}</p>
        <p className={styles.para}>{productGroup.paragraphs.note}</p>
        <button className={styles.actionButton}>
          {productGroup.actionButton}
        </button>
      </div>
    </div>
  );
};

export default ProductGroups;
