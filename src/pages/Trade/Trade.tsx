import styles from "./Trade.module.css";
import TradeSearch from "../../components/Trade/TradeSearch/TradeSearch";
import TradeSearchExplain from "../../components/Trade/TradeSearchExplain/TradeSearchExplain";
import { useEffect } from "react";

const Trade = () => {
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
