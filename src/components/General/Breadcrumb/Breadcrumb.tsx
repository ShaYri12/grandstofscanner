import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.css";
import { FaChevronRight } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className={styles.breadcrumb}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span>
              <FaChevronRight className={styles.breadcrumbIcon} />
            </span>
          )}
          {item.url ? (
            <Link to={item.url} className={styles.breadcrumbLink}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.breadcrumbCurrent}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
