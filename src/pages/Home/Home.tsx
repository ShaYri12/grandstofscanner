import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/HeroSection/HeroSection";
import InformationCards from "../../components/InformationCards/InformationCard";
import ServiceOverviewCards from "../../components/ServiceOverviewCards/ServiceOverviewCards";

const Home = () => {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <>
      <div className={styles.container}>
        <HeroSection t={t} />
        <InformationCards t={t} />
        <ServiceOverviewCards t={t} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
