import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../../components/PageSpecificComponents/Home/HeroSection/HeroSection";
import InformationCards from "../../components/PageSpecificComponents/Home/InformationCards/InformationCard";
import ServiceOverviewCards from "../../components/PageSpecificComponents/Home/ServiceOverviewCards/ServiceOverviewCards";

interface LangParam extends Record<string, string | undefined> {
  lang: string;
}

const Home: React.FC = () => {
  const { lang } = useParams<LangParam>();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.container}>
      <HeroSection t={t} />
      <InformationCards t={t} />
      <ServiceOverviewCards t={t} />
    </div>
  );
};

export default Home;
