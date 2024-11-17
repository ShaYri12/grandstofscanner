import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import HeroSection from "../../components/PageSpecificComponents/Home/HeroSection/HeroSection";
import InformationCards from "../../components/PageSpecificComponents/Home/InformationCards/InformationCard";
import ServiceOverviewCards from "../../components/PageSpecificComponents/Home/ServiceOverviewCards/ServiceOverviewCards";

const Home = () => {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

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
