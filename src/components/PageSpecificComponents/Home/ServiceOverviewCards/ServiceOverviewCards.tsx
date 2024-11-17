import React from "react";
import { TFunction } from "i18next";
import styles from "./ServiceOverviewCards.module.css";

interface Box3 {
  box3line1: string;
  box3line2: string;
}

interface Box4 {
  box4line1: string;
  box4line2: string;
}

interface Box5 {
  box5line1: string;
  box5line2: string;
}

interface Mobile {
  heading: string;
  subHeading: string;
}

interface ServiceOverviewCardsProps {
  t: TFunction;  
}

const ServiceOverviewCards: React.FC<ServiceOverviewCardsProps> = ({ t }) => {
  const { box3line1, box3line2 } = t("box3", { returnObjects: true }) as Box3;
  const { box4line1, box4line2 } = t("box4", { returnObjects: true }) as Box4;
  const { box5line1, box5line2 } = t("box5", { returnObjects: true }) as Box5;
  const { heading, subHeading } = t("mobile", { returnObjects: true }) as Mobile;

  return (
    <>
      <div className={`row g-5 ${styles.heroBottomCard}`}>
        <div className="col-xl-4">
          <img src="/Frame.png" alt="Frame" />
          <h3 className={styles.card1Heading}>{box3line1}</h3>
          <p className={styles.card1Desc}>{box3line2}</p>
        </div>
        <div className="col-xl-4">
          <img src="/Frame-1.png" alt="Frame" />
          <h3 className={styles.card1Heading}>{box4line1}</h3>
          <p className={styles.card1Desc}>{box4line2}</p>
        </div>
        <div className="col-xl-4">
          <img src="/Frame-2.png" alt="Frame" />
          <h3 className={styles.card1Heading}>{box5line1}</h3>
          <p className={styles.card1Desc}>{box5line2}</p>
        </div>
      </div>
      <div className={styles.mblbottomdiv}>
        <h3 className={styles.bottomdivHeading}>{heading}</h3>
        <p className={styles.card1Desc}>{subHeading}</p>
        <div className={styles.mblbottomimg}></div>
      </div>
    </>
  );
};

export default ServiceOverviewCards;
