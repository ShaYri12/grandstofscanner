import React from "react";
import styles from "./ServiceOverviewCards.module.css";

const ServiceOverviewCards = ({ t }) => {
  const { box3line1, box3line2 } = t("box3");
  const { box4line1, box4line2 } = t("box4");
  const { box5line1, box5line2 } = t("box5");
  const { heading, subHeading } = t("mobile");
  return (
    <>
      <div className={` row g-5 ${styles.heroBottomCard}`}>
        <div className={`col-4`}>
          <img src="/Frame.png" alt="Frame" />
          <h3 className={`${styles.card1Heading}`}>{box3line1}</h3>
          <p className={`${styles.card1Desc}`}>{box3line2}</p>
        </div>
        <div className={`col-4`}>
          <img src="/Frame-1.png" alt="Frame" />
          <h3 className={`${styles.card1Heading}`}>{box4line1}</h3>
          <p className={`${styles.card1Desc}`}>{box4line2}</p>
        </div>
        <div className={`col-4`}>
          <img src="/Frame-2.png" alt="Frame" />
          <h3 className={`${styles.card1Heading}`}>{box5line1}</h3>
          <p className={`${styles.card1Desc}`}>{box5line2}</p>
        </div>
      </div>
      <div className={`${styles.mblbottomdiv}`}>
        <h3 className={`${styles.bottomdivHeading}`}>{heading}</h3>
        <p className={`${styles.card1Desc}`}>{subHeading}</p>
        <div className={`${styles.mblbottomimg}`}></div>
      </div>
    </>
  );
};

export default ServiceOverviewCards;
