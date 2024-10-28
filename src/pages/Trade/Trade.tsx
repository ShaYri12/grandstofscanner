import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Trade.module.css";

import { useTranslation } from "react-i18next";
import TradeSearch from "../../components/TradeSearch/TradeSearch";

const Trade = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.texts}>
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>
              {t("trade.breadcrumb.home")}
            </Link>
            <FaChevronRight className={styles.breadcrumbIcon} />
            <span className={styles.breadcrumbCurrent}>
              {t("trade.breadcrumb.current")}
            </span>
          </nav>
          <h4 className={styles.step}>{t("trade.step")}</h4>
          <div>
            <h2 className={styles.heading1}>{t("trade.heading")}</h2>
            <p className={styles.para1}>{t("trade.paragraph1")}</p>
            <p className={styles.para2}>{t("trade.paragraph2")}</p>
          </div>
        </div>
      </div>
      <TradeSearch />
    </div>
  );
};

export default Trade;
