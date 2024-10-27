import i18n from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "nl",
    returnObjects: true,
    resources: {
      en: {
        translation: {
          header1: {
            h1one: "Data source:",
            h1two: "EN (2018)",
          },
          header2: {
            h2one: "Home",
            h2two: "Explore & Review",
            h2three: "Trade",
            h2four: "Landinfo",
            h2btn1: "Register",
            h2btn2: "Login",
          },
          body: {
            title: "Grondstoffenscanner",
            subTitle:
              "Welcome to the Raw Materials Scanner. Here you can find out to what extent (Bio)raw materials on which you depend may be scarce in the future pose a risk to humans and the environment.",
          },
          box1: {
            boxline1: "Step 1",
            boxline2: "Explore",
            boxline3:
              "Gain insight into the raw materials and products that are part of your production process hear",
            boxbutton: "Start the scan",
            boxline4: "Step 2",
            boxline5: "Judge",
            boxline6:
              "Assess whether your business will be in the future at risk.",
          },
          box2: {
            box2line1: "Step 3",
            box2line2: "Trade",
            box2line3:
              "Then go through the risk analysis to gain insight into to get on the risks",
            box2button: " Go directly to trading",
          },
          box3: {
            box3line1: "Why?",
            box3line2:
              "Raw materials can suddenly be used due to circumstances more expensive, less available or even no longer available available. With the Raw Materials Scanner, you get Insight into the risk profile of the products you use Materials.",
          },
          box4: {
            box4line1: "How does it work?",
            box4line2:
              "Answer a few questions about your product and Immediately see which raw materials you use and how it is risk of, for example, scarcity, can be alleged. reduced.",
          },
          box5: {
            box5line1: "For whom?",
            box5line2:
              "For companies in the Netherlands that depend on a stable supply of raw materials, such as metals or bio raw materials.",
          },
          mobile: {
            heading: "International Social Corporate Responsibility",
            subHeading:
              "The scanner also provides companies with information about International Civil Society Corporate Responsibility (IRBC). IRBC is an ongoing process that focuses mainly on identifying, preventing and managing social and environmental risks. You can use the information in using the scanner as a first step towards the implementation of due diligence.",
          },
          footer: {
            fone: "About Raw Materials Scanner",
            ftwo: "Accessibility",
            fthree: "Cookies",
            ffour: "Privacy statement",
          },
        },
      },
      nl: {
        translation: {
          header1: {
            h1one: "Gegevens bron:",
            h1two: "NL (2018)",
          },
          header2: {
            h2one: "Home",
            h2two: "Verkennen & beoordelen",
            h2three: "Handelen",
            h2four: "Landinfo",
            h2btn1: "Register",
            h2btn2: "Login",
          },
          body: {
            title: "Grondstoffenscanner",
            subTitle:
              "Welkom bij de Grondstoffenscanner. Hier kunt u ontdekken in hoeverre (bio)grondstoffen waarvan u afhankelijk bent, in de toekomst mogelijk schaars worden of een risico vormen voor mens en milieu.",
          },
          box1: {
            boxline1: "Stap 1",
            boxline2: "Verkennen",
            boxline3:
              "Krijg inzicht in de grondstoffen en producten die bij uw productieproces horen",
            boxbutton: "Start de scan",
            boxline4: "Stap 2",
            boxline5: "Beoordelen",
            boxline6:
              "Beoordeel of uw bedrijf in de toekomst een risico loopt.",
          },
          box2: {
            box2line1: "Stap 3",
            box2line2: "Handelen",
            box2line3:
              "Doorloop dan de risico analyse om zicht te krijgen op de risco’s",
            box2button: "Ga direct naar handelen",
          },
          box3: {
            box3line1: "Waarom?",
            box3line2:
              "Grondstoffen kunnen door omstandigheden ineens duurder, slechter leverbaar of zelfs niet meer leverbaar zijn. Met de Grondstoffenscanner krijg je inzicht in het risicoprofiel van de door u gebruikte materialen.",
          },
          box4: {
            box4line1: "Hoe werkt het?",
            box4line2:
              "Beantwoord een aantal vragen over uw product en zie direct welke grondstoffen u gebruikt en hoe het risico op bijvoorbeeld schaarste kan worden verkleind.",
          },
          box5: {
            box5line1: "Voor wie?",
            box5line2:
              "Voor bedrijven in Nederland die afhankelijk zijn van een stabiele toevoer van grondstoffen, zoals metalen of bio grondstoffen.",
          },
          mobile: {
            heading: "Internationaal Maatschappelijk Verantwoord Ondernemen",
            subHeading:
              "De scanner geeft bedrijven ook informatie over Internationaal Maatschappelijk Verantwoord Ondernemen (IMVO). IMVO is een doorlopend proces dat vooral gericht is op het identificeren, voorkomen en managen van sociale en milieurisico’s. U kunt de informatie in de scanner gebruiken als een eerste stap naar de implementatie van ‘due diligence’.",
          },
          footer: {
            fone: "Over grondstoffenscanner",
            ftwo: "Toegankelijkheid",
            fthree: "Cookies",
            ffour: "Privacyverklaring",
          },
        },
      },
    },
  });

export default i18n;
