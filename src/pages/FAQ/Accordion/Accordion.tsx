"use client";

import type React from "react";
import { useState } from "react";
import styles from "./Accordion.module.css";
import { FaChevronUp } from "react-icons/fa";

interface AccordionProps {
  title: string; // Will receive translated title from parent component
  children: React.ReactNode; // Will contain translated content
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionHeader}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <h2 className={styles.accordionTitle}>{title}</h2>
        <span
          className={`${styles.accordionIcon} ${isOpen ? styles.open : ""}`}
        >
          <FaChevronUp />
        </span>
      </button>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
};

export default Accordion;
