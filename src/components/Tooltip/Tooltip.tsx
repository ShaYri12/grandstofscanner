import React, { useState } from "react";
import styles from "./Tooltip.module.css";
import { IoInformationCircle, IoClose } from "react-icons/io5";

const Tooltip: React.FC<{
  title: string;
  text: string;
  position?: "absolute" | "relative";
}> = ({ title, text, position = "relative" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={styles.tooltipContainer} style={{ position }}>
      <IoInformationCircle
        size={24}
        className={styles.infoIcon}
        onClick={() => setShowTooltip(!showTooltip)}
      />
      {showTooltip && (
        <div
          className={`${styles.tooltip} ${
            position === "absolute" ? styles.absolutePosition : ""
          }`}
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
