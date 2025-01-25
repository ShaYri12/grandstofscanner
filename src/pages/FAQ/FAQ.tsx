import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./FAQ.module.css";

interface FAQItem {
  questionKey: string;
  answerKey: string;
}

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

const isPdfLink = (link: string) => link.endsWith(".pdf");

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    if (isPdfLink(link)) {
      event.preventDefault(); // Prevent the default link behavior

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = link;
      a.download = link.split("/").pop() || "document.pdf"; // Use the filename as the download name
      a.target = "_blank"; // Open in a new tab if download fails
      a.rel = "noopener noreferrer";

      // Append to the body, click, and remove
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>{t("faq.title")}</h1>
        <div className={styles.headingLine}></div>
      </div>
      <div className={styles.faqText}>
        <div className={styles.accordion}>
          {faqData.map((item, index) => {
            const answer = t(item.answerKey, { returnObjects: true }) as Record<
              string,
              any
            >;

            return (
              <div key={index} className={styles.accordionItem}>
                <h2 className={styles.accordionHeader}>
                  <button
                    className={`${styles.accordionButton} ${
                      activeIndex === index ? "" : styles.collapsed
                    }`}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={activeIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    {t(item.questionKey)}
                  </button>
                </h2>
                {activeIndex === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className={styles.accordionBody}
                  >
                    {/* Render Paragraphs */}
                    {answer.para1 && <p>{answer.para1}</p>}
                    {answer.para2 && <p>{answer.para2}</p>}

                    {/* Render Lists */}
                    {answer.listDescribe && (
                      <p>
                        <strong>{answer.listDescribe}</strong>
                      </p>
                    )}
                    {answer.list && (
                      <ul>
                        {Object.keys(answer.list).map((key) => {
                          if (key.includes("Link")) return null; // Ignore link keys

                          const linkKey = `${key}Link`; // Example: point1 -> point1Link
                          const hasLink = answer.list[linkKey];

                          return (
                            <li key={key}>
                              {hasLink ? (
                                <>
                                  <a
                                    href={hasLink.link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) =>
                                      handleLinkClick(e, hasLink.link || "")
                                    }
                                  >
                                    {t(answer.list[linkKey].text || "")}
                                  </a>
                                  ,
                                </>
                              ) : null}{" "}
                              {t(answer.list[key])}
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {/* Handle para2Link */}
                    {answer.para2Link && (
                      <p>
                        {answer.para2Link.text && (
                          <a
                            href={answer.para2Link.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t(answer.para2Link.text)}
                          </a>
                        )}
                      </p>
                    )}

                    {/* Handle Inline Links */}
                    {answer.para1Start && (
                      <p>
                        {answer.para1Start}{" "}
                        <a
                          href={answer.para1Link?.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) =>
                            handleLinkClick(e, answer.para1Link?.link || "")
                          }
                        >
                          {t(answer.para1Link?.text || "")}
                        </a>{" "}
                        {answer.para1End}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
