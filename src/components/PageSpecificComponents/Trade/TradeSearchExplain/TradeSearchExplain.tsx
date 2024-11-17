import { FaChevronRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import styles from "./TradeSearchExplain.module.css";
import { useEffect } from "react";

interface LangParam extends Record<string, string | undefined> {
  lang: string;
}

const TradeSearchExplain: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<LangParam>();  

  useEffect(() => {
    if (lang && lang !== i18next.language) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <div className={styles.texts}>
      <nav className={styles.breadcrumb}>
        <Link to={`/${lang}/home`} className={styles.breadcrumbLink}>
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
  );
};

export default TradeSearchExplain;
