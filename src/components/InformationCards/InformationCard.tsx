import React from "react";
import styles from "./InformationCards.module.css";
import { TFunction } from "i18next";
import { FaChevronRight } from "react-icons/fa";

interface InformationCardsProps {
  t: TFunction;
}

const InformationCards: React.FC<InformationCardsProps> = ({ t }) => {
  const {
    boxline1,
    boxline2,
    boxline3,
    boxbutton,
    boxline4,
    boxline5,
    boxline6,
  } = t("box1", { returnObjects: true }) as {
    boxline1: string;
    boxline2: string;
    boxline3: string;
    boxbutton: string;
    boxline4: string;
    boxline5: string;
    boxline6: string;
  };

  const { box2line1, box2line2, box2line3, box2button } = t("box2", {
    returnObjects: true,
  }) as {
    box2line1: string;
    box2line2: string;
    box2line3: string;
    box2button: string;
  };

  const { box4line1 } = t("box4", { returnObjects: true }) as {
    box4line1: string;
  };

  return (
    <div className={styles.heroCardCenter}>
      <div className={`d-flex ${styles.heroLeftCardUpper}`}>
        <div className={styles.col8Left}>
          <div>
            <div className={styles.card1}>1</div>
            <p className={styles.card1Title}>{boxline1}</p>
            <h3 className={styles.card1Heading}>{boxline2}</h3>
            <p className={styles.card1Desc}>{boxline3}</p>
            <button className={`rounded-1 ${styles.heroButton1}`}>
              {boxbutton}
            </button>
          </div>
          <FaChevronRight className={styles.rightIcon} />
        </div>

        <div className={styles.col8Right}>
          <div className={styles.col8RightInner}>
            <div>
              <div className={styles.card1}>2</div>
              <p className={styles.card1Title}>{boxline4}</p>
              <h3 className={styles.card1Heading}>{boxline5}</h3>
              <p className={styles.card1Desc}>{boxline6}</p>
            </div>
            <div className={styles.buttonsLG}>
              <button className={styles.card2mblbtn1}>{boxbutton}</button>
              <button className={styles.card2mblbtn2}>{box4line1}</button>
            </div>
            <FaChevronRight className={styles.rightIconSM} />
          </div>
          <div className={styles.buttonsSM}>
            <button className={styles.card2mblbtn1}>{boxbutton}</button>
            <button className={styles.card2mblbtn2}>{box4line1}</button>
          </div>
          <FaChevronRight className={styles.rightIconLG} />
        </div>
      </div>

      <div className={styles.col4Right}>
        <div className={styles.card1}>3</div>
        <p className={styles.card1Title}>{box2line1}</p>
        <h3 className={styles.card1Heading}>{box2line2}</h3>
        <p className={styles.card1Desc}>{box2line3}</p>
        <span
          className={`rounded-1 ${styles.heroButton2}`}
          style={{ cursor: "pointer" }}
        >
          {box2button}
        </span>
        <span className={styles.card2mblbtn2}>{box2button}</span>
      </div>
    </div>
  );
};

export default InformationCards;
