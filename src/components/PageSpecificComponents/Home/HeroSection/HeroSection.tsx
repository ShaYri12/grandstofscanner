import React from "react";
import styles from "./HeroSection.module.css";
import { TFunction } from "i18next";

interface TranslationBody {
  title: string;
  subTitle: string;
}

interface HeroSectionProps {
  t: TFunction;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => {
  const { title, subTitle } = t("body", { returnObjects: true }) as TranslationBody;

  const heroStyle: React.CSSProperties = {
    backgroundImage: `url("/cover-photo.png")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div className={styles.homeHero} style={heroStyle}>
      <h1 className={styles.heroHeading}>{title}</h1>
      <p className={styles.heroSubHeading}>{subTitle}</p>
    </div>
  );
};

export default HeroSection;
