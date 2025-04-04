import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaChevronRight, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import styles from "./Detail.module.css";
import Tooltip from "../../components/General/Tooltip/Tooltip";
import ExpandableSection from "../../components/PageSpecificComponents/Antimoon/AntimoonExpandables/ExpandableSection";
import AntimoonSideContent from "../../components/PageSpecificComponents/Antimoon/AntimoonSideContent/AntimoonSideContent";

// Example grondstof data - same as in search results and browse
const exampleGrondstofData = [
  {
    id: 1,
    name: "Antimoon",
    code: "Sb",
    category: "Metaal",
    description:
      "Antimoon is een scheikundig element met symbool Sb en atoomnummer 51. Het wordt gebruikt in legeringen, batterijen, glas en keramiek.",
    riskLevel: "Hoog",
    availability: "Beperkt",
    priceVolatility: "+131%",
    worldProduction: "42,833 ton",
  },
  {
    id: 2,
    name: "IJzer",
    code: "Fe",
    category: "Metaal",
    description:
      "IJzer is een veelvoorkomend metaal dat wordt gebruikt in de productie van staal en voor verschillende constructiedoeleinden.",
    riskLevel: "Laag",
    availability: "Ruim beschikbaar",
    priceVolatility: "+15%",
    worldProduction: "2,500,000 ton",
  },
  {
    id: 3,
    name: "Aluminium",
    code: "Al",
    category: "Metaal",
    description:
      "Aluminium is een lichtgewicht metaal dat wordt gebruikt in verpakkingen, voertuigen en bouwmaterialen.",
    riskLevel: "Medium",
    availability: "Goed beschikbaar",
    priceVolatility: "+45%",
    worldProduction: "65,000,000 ton",
  },
  {
    id: 4,
    name: "Koper",
    code: "Cu",
    category: "Metaal",
    description:
      "Koper is een uitstekende elektrische geleider en wordt gebruikt in elektronica, leidingen en constructie.",
    riskLevel: "Medium",
    availability: "Matig beschikbaar",
    priceVolatility: "+85%",
    worldProduction: "20,000,000 ton",
  },
  {
    id: 5,
    name: "Lithium",
    code: "Li",
    category: "Metaal",
    description:
      "Lithium is een essentieel onderdeel van moderne batterijen en wordt gebruikt in elektrische voertuigen en elektronica.",
    riskLevel: "Hoog",
    availability: "Beperkt",
    priceVolatility: "+210%",
    worldProduction: "82,000 ton",
  },
  {
    id: 6,
    name: "Kobalt",
    code: "Co",
    category: "Metaal",
    description:
      "Kobalt wordt gebruikt in batterijen, legeringen en katalysatoren. Het is een kritieke grondstof voor elektrische voertuigen.",
    riskLevel: "Zeer hoog",
    availability: "Schaars",
    priceVolatility: "+180%",
    worldProduction: "140,000 ton",
  },
  {
    id: 7,
    name: "Zeldzame aardmetalen",
    code: "REE",
    category: "Metaal",
    description:
      "Zeldzame aardmetalen zijn 17 chemische elementen die worden gebruikt in hoogwaardige technologie en elektronica.",
    riskLevel: "Zeer hoog",
    availability: "Zeer beperkt",
    priceVolatility: "+150%",
    worldProduction: "280,000 ton",
  },
  {
    id: 8,
    name: "Natuurrubber",
    code: "NR",
    category: "Biotisch",
    description:
      "Natuurrubber wordt gewonnen uit de Hevea brasiliensis boom en wordt gebruikt voor banden, handschoenen en vele andere producten.",
    riskLevel: "Medium",
    availability: "Goed beschikbaar",
    priceVolatility: "+65%",
    worldProduction: "13,000,000 ton",
  },
  {
    id: 9,
    name: "Katoen",
    code: "Ct",
    category: "Biotisch",
    description:
      "Katoen is een natuurlijke vezel die wordt gebruikt voor kleding, meubels en industriële toepassingen.",
    riskLevel: "Laag",
    availability: "Ruim beschikbaar",
    priceVolatility: "+30%",
    worldProduction: "25,000,000 ton",
  },
  {
    id: 10,
    name: "Hout",
    code: "Wd",
    category: "Biotisch",
    description:
      "Hout is een hernieuwbare grondstof die wordt gebruikt voor bouw, meubels en papier.",
    riskLevel: "Laag",
    availability: "Ruim beschikbaar",
    priceVolatility: "+20%",
    worldProduction: "3,900,000,000 m³",
  },
  {
    id: 11,
    name: "Soja",
    code: "Soy",
    category: "Biotisch",
    description:
      "Soja wordt gebruikt voor menselijke consumptie, diervoeder en industriële toepassingen zoals biodiesel.",
    riskLevel: "Medium",
    availability: "Goed beschikbaar",
    priceVolatility: "+45%",
    worldProduction: "350,000,000 ton",
  },
  {
    id: 12,
    name: "Palmolie",
    code: "PO",
    category: "Biotisch",
    description:
      "Palmolie wordt gebruikt in voedsel, cosmetica en biobrandstoffen en is een belangrijke landbouwgrondstof.",
    riskLevel: "Hoog",
    availability: "Beperkt duurzaam",
    priceVolatility: "+75%",
    worldProduction: "73,000,000 ton",
  },
];

// Example productgroep data - same as in search results and browse
const exampleProductgroepData = [
  {
    id: 1,
    name: "Elektronische apparaten",
    code: "85",
    category: "Technologie",
    keyMaterials: ["Koper", "Lithium", "Kobalt", "Zeldzame aardmetalen"],
    industryImpact: "Zeer hoog",
    description:
      "Deze productgroep omvat smartphones, computers, servers en andere elektronische apparaten die essentieel zijn voor moderne technologie.",
  },
  {
    id: 2,
    name: "Voertuigen",
    code: "87",
    category: "Transport",
    keyMaterials: ["Staal", "Aluminium", "Koper", "Lithium", "Kobalt"],
    industryImpact: "Hoog",
    description:
      "Inclusief personenauto's, vrachtwagens, bussen en andere transportmiddelen, met een groeiend aandeel elektrische voertuigen.",
  },
  {
    id: 3,
    name: "Landbouwmachines",
    code: "84",
    category: "Landbouw",
    keyMaterials: ["Staal", "Koper", "Aluminium"],
    industryImpact: "Medium",
    description:
      "Tractoren, oogstmachines en andere apparatuur die essentieel is voor moderne landbouwpraktijken.",
  },
  {
    id: 4,
    name: "Weefsels van katoen",
    code: "52",
    category: "Textiel",
    keyMaterials: ["Katoen", "Synthetische vezels"],
    industryImpact: "Medium",
    description:
      "Stoffen en materialen gemaakt van katoen, gebruikt in kleding, huishoudelijk textiel en industriële toepassingen.",
  },
  {
    id: 5,
    name: "Farmaceutische producten",
    code: "30",
    category: "Gezondheid",
    keyMaterials: ["Diverse chemische verbindingen", "Zeldzame mineralen"],
    industryImpact: "Hoog",
    description:
      "Medicijnen, vaccins en andere farmaceutische producten die cruciaal zijn voor de gezondheidszorg.",
  },
];

interface LangParams {
  lang?: string;
  id?: string;
  [key: string]: string | undefined;
}

const Detail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { lang, id } = useParams<LangParams>();
  const [itemData, setItemData] = useState<any | null>(null);
  const [itemType, setItemType] = useState<"material" | "product" | null>(null);

  // Get the current language with fallback
  const currentLang =
    lang || localStorage.getItem("i18nextLng") || i18n.language || "en";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (id) {
      const itemId = parseInt(id);

      // Try to find the item in raw materials
      const material = exampleGrondstofData.find((item) => item.id === itemId);
      if (material) {
        setItemData(material);
        setItemType("material");
        return;
      }

      // Try to find the item in product groups
      const product = exampleProductgroepData.find(
        (item) => item.id === itemId
      );
      if (product) {
        setItemData(product);
        setItemType("product");
        return;
      }
    }
  }, [id]);

  if (!itemData) {
    return (
      <div className={styles.section}>
        <div className={styles.container}>
          <h1>{t("detail.notFound")}</h1>
          <p>{t("detail.itemNotFound")}</p>
          <Link to={`/${currentLang}/browse`} className={styles.backLink}>
            {t("detail.backToBrowse")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to={`/${currentLang}/home`} className={styles.breadcrumbLink}>
            {t("productGroup.breadcrumb.home")}
          </Link>
          <FaChevronRight className={styles.breadcrumbIcon} />
          <Link to={`/${currentLang}/browse`} className={styles.breadcrumbLink}>
            {t("detail.breadcrumb.browse")}
          </Link>
          <FaChevronRight className={styles.breadcrumbIcon} />
          <span className={styles.breadcrumbCurrent}>{itemData.name}</span>
        </nav>

        <div className={styles.mainContent}>
          <div className={styles.grid}>
            <div className={styles.gridMain}>
              <div className={styles.header}>
                <div>
                  <h1 className={styles.subtitle}>
                    {itemType === "material"
                      ? t("detail.factsheet.material")
                      : t("detail.factsheet.product")}
                  </h1>
                  <div className={styles.titleContainer}>
                    <h2 className={styles.title}>{itemData.name}</h2>
                    <span className={styles.symbol}>{itemData.code}</span>
                  </div>
                </div>
                <Tooltip
                  title={t("antimoon.max_price_increase")}
                  text={t("antimoon.max_price_increase_text")}
                />
              </div>

              <p className={styles.description}>{itemData.description}</p>

              {itemType === "material" && (
                <div className={styles.infoBoxes}>
                  <div className={styles.infoBox}>
                    <Tooltip
                      title={t("antimoon.max_price_increase")}
                      text={t("antimoon.max_price_increase_text")}
                      position="absolute"
                    />
                    <h3 className={styles.infoBoxTitle}>
                      {t("antimoon.price_volatility")}
                    </h3>
                    <p className={styles.infoBoxValue1}>
                      {itemData.priceVolatility}
                    </p>
                  </div>
                  <div className={styles.infoBox}>
                    <Tooltip
                      title={t("antimoon.max_price_increase")}
                      text={t("antimoon.max_price_increase_text")}
                      position="absolute"
                    />
                    <h3 className={styles.infoBoxTitle}>
                      {t("antimoon.world_production")}
                    </h3>
                    <p className={styles.infoBoxValue2}>
                      {itemData.worldProduction}
                    </p>
                  </div>
                </div>
              )}

              {itemType === "product" && (
                <div className={styles.infoBoxes}>
                  <div className={styles.infoBox}>
                    <Tooltip
                      title={t("antimoon.max_price_increase")}
                      text={t("antimoon.max_price_increase_text")}
                      position="absolute"
                    />
                    <h3 className={styles.infoBoxTitle}>
                      {t("detail.keyMaterials")}
                    </h3>
                    <p className={styles.infoBoxValue1}>
                      {itemData.keyMaterials?.length || 0}
                    </p>
                  </div>
                  <div className={styles.infoBox}>
                    <Tooltip
                      title={t("antimoon.max_price_increase")}
                      text={t("antimoon.max_price_increase_text")}
                      position="absolute"
                    />
                    <h3 className={styles.infoBoxTitle}>
                      {t("detail.industryImpact")}
                    </h3>
                    <p className={styles.infoBoxValue2}>
                      {itemData.industryImpact}
                    </p>
                  </div>
                </div>
              )}

              {/* Use the actual ExpandableSection component from Antimoon */}
              <ExpandableSection />

              <div className={styles.share}>
                <p>{t("antimoon.share_page")}</p>
                <span>
                  <FaLinkedin />
                  <FaFacebookSquare />
                  <IoMdMail />
                </span>
              </div>
            </div>

            {/* Use the actual AntimoonSideContent component */}
            <AntimoonSideContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
