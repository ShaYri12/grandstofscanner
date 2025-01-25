import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Accessibility.module.css";
import { MdEmail } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";

const Accessibility: React.FC = () => {
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
                {t("accessibility.headings.heading1")}
              </h2>
              <p className={styles.para1}>
                {t("accessibility.paragraphs.para1")}
              </p>
            </div>
            <div>
              <h2 className={styles.heading2}>
                {t("accessibility.headings.heading2")}
              </h2>
              <p className={styles.paraWithLink}>
                <span>{t("accessibility.paragraphs.para2Start")}</span>{" "}
                <a href="https://wetten.overheid.nl/BWBR0040936/">
                  {t("accessibility.paragraphs.para2Link")}{" "}
                  <HiOutlineExternalLink />
                </a>
                . <span>{t("accessibility.paragraphs.para2End")}</span>
              </p>
            </div>
            <div>
              <h2 className={styles.heading2}>
                {t("accessibility.headings.heading3")}
              </h2>
              <div className={styles.imageWrapper}>
                <img
                  src="/accessibility-statement.svg"
                  alt="statement image"
                  height={251}
                  width={692}
                />
              </div>
            </div>
            <div>
              <h2 className={styles.heading2}>
                {t("accessibility.headings.heading4")}
              </h2>
              <p className={styles.para1}>
                {t("accessibility.paragraphs.para4.aboutPara")}
              </p>
              <ul className={styles.para1}>
                <li>{t("accessibility.paragraphs.para4.point1")}</li>
                <li>{t("accessibility.paragraphs.para4.point2")}</li>
                <li>{t("accessibility.paragraphs.para4.point3")}</li>
              </ul>
            </div>

            <div>
              <h2 className={styles.heading2}>
                {t("accessibility.headings.heading5")}
              </h2>
              <p className={styles.paraWithLink}>
                {t("accessibility.paragraphs.para5")}{" "}
                <a
                  onClick={() =>
                    (window.location.href = "mailto:toegankelijkheid@rvo.nl")
                  }
                >
                  toegankelijkheid@rvo.nl <MdEmail />
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accessibility;
