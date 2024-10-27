import React from "react";
import styles from "./HeroSection.module.css";
import { TFunction } from "i18next";

interface HeroSectionProps {
  t: TFunction;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => {
  const { title, subTitle } = t("body", { returnObjects: true }) as {
    title: string;
    subTitle: string;
  };

  return (
    <div
      className={styles.homeHero}
      style={{
        backgroundImage: `url("/cover-photo.png")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 className={styles.heroHeading}>{title}</h1>
      <p className={styles.heroSubHeading}>{subTitle}</p>
    </div>
  );
};

export default HeroSection;
