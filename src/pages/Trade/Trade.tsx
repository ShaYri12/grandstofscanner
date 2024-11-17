import React, { useEffect } from "react";
import TradeSearch from "../../components/PageSpecificComponents/Trade/TradeSearch/TradeSearch";
import TradeSearchExplain from "../../components/PageSpecificComponents/Trade/TradeSearchExplain/TradeSearchExplain";
import styles from "./Trade.module.css";

const Trade: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <TradeSearchExplain />
      </div>
      <TradeSearch />
    </div>
  );
};

export default Trade;
