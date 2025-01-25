import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PrivacyStatement.module.css";
import { HiOutlineExternalLink } from "react-icons/hi";

const PrivacyStatement: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.texts}>
          <div className={styles.textsinner}>
            <div>
              <h2 className={styles.heading1}>
                {t("privacyStatement.headings.heading1")}
              </h2>
              <p className={styles.para1}>
                {t("privacyStatement.paragraphs.para1")}
              </p>
              <p className={styles.paraWithLink}>
                <a
                  href="https://english.rvo.nl/topics/privacy"
                  className={styles.paraWithLink}
                >
                  {t("privacyStatement.paragraphs.para1Link")}{" "}
                  <HiOutlineExternalLink />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyStatement;
