import React, { useEffect, useState } from "react";
import styles from "./ProductGroup.module.css";
import { FaChevronRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import FactSheet from "../../components/FactSheet/FactSheet";
import { useProductGroupData } from "../../assets/productGroupData";
import i18next from "i18next";

const ProductGroups: React.FC = () => {
  const productGroup = useProductGroupData();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to={`/${lang}/home`} className={styles.breadcrumbLink}>
            {productGroup.breadcrumb.home}
          </Link>
          <FaChevronRight className={styles.breadcrumbIcon} />
          <Link to={`/${lang}/home`} className={styles.breadcrumbLink}>
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

        <FactSheet />

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
