import React, { useState } from "react";
import styles from "./Tooltip.module.css";
import { IoInformationCircle, IoClose } from "react-icons/io5";

const Tooltip: React.FC<{
  title: string;
  text: string;
  position?: "absolute" | "relative" | "relative2";
}> = ({ title, text, position = "relative" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={
        position === "relative2"
          ? styles.tooltipContainer2
          : styles.tooltipContainer
      }
      style={{ position: position === "relative2" ? "relative" : position }}
    >
      <IoInformationCircle
        size={24}
        className={styles.infoIcon}
        onClick={() => setShowTooltip(!showTooltip)}
      />
      {showTooltip && (
        <div
          className={`${
            position === "absolute"
              ? `${styles.absolutePosition} ${styles.tooltip2}`
              : styles.tooltip1
          } `}
        >
          <div className={styles.tooltipHeader}>
            <span className={styles.tooltipTitle}>{title}</span>
            <IoClose
              className={styles.closeIcon}
              onClick={() => setShowTooltip(false)}
            />
          </div>
          <div className={styles.tooltipText}>{text}</div>
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
