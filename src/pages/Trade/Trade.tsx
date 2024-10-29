import styles from "./Trade.module.css";
import TradeSearch from "../../components/TradeSearch/TradeSearch";
import TradeSearchExplain from "../../components/TradeSearchExplain/TradeSearchExplain";

const Trade = () => {
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
