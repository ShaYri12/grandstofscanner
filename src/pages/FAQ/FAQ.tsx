import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./FAQ.module.css";

interface FAQItem {
  questionKey: string; // Key for translation
  answerKey: string; // Key for translation
}

// Translation keys for FAQ data
const faqData: FAQItem[] = [
  { questionKey: "faq.question1", answerKey: "faq.answer1" },
  { questionKey: "faq.question2", answerKey: "faq.answer2" },
  { questionKey: "faq.question3", answerKey: "faq.answer3" },
  { questionKey: "faq.question4", answerKey: "faq.answer4" },
  { questionKey: "faq.question5", answerKey: "faq.answer5" },
  { questionKey: "faq.question6", answerKey: "faq.answer6" },
  { questionKey: "faq.question7", answerKey: "faq.answer7" },
  { questionKey: "faq.question8", answerKey: "faq.answer8" },
  { questionKey: "faq.question9", answerKey: "faq.answer9" },
  { questionKey: "faq.question10", answerKey: "faq.answer10" },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { t } = useTranslation();

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>{t("faq.title")}</h1>
        <div className={styles.headingLine}></div>
      </div>
      <div className={styles.faqText}>
        <div className={styles.accordion}>
          {faqData.map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <h2 className={styles.accordionHeader}>
                <button
                  className={`${styles.accordionButton} ${
                    activeIndex === index ? "" : styles.collapsed
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  {t(item.questionKey)}
                </button>
              </h2>
              {activeIndex === index && (
                <div className={styles.accordionBody}>{t(item.answerKey)}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
