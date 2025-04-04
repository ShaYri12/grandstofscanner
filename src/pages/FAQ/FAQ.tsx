import type React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/General/Breadcrumb/Breadcrumb";
import Accordion from "./Accordion/Accordion";
import styles from "./FAQ.module.css";

interface LangParam extends Record<string, string | undefined> {
  lang: string;
}

interface FAQItem {
  questionKey: string;
  answerKey: string;
  defaultOpen?: boolean;
}

const NewFAQPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<LangParam>();

  // Language change is now managed centrally in App.tsx

  const breadcrumbItems = [
    { label: t("faq.breadcrumb.home"), url: "/" },
    { label: t("faq.breadcrumb.current") },
  ];

  const faqData: FAQItem[] = [
    {
      questionKey: "faq.question1",
      answerKey: "faq.answer1",
      defaultOpen: true,
    },
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

  return (
    <div className={styles.container}>
      <Breadcrumb items={breadcrumbItems} />

      <h1 className={styles.title}>{t("faq.title")}</h1>

      <div className={styles.accordionContainer}>
        {faqData.map((item, index) => {
          const answer = t(item.answerKey, { returnObjects: true }) as Record<
            string,
            any
          >;

          return (
            <Accordion
              key={index}
              title={t(item.questionKey)}
              defaultOpen={item.defaultOpen || false}
            >
              <div className={styles.accordionContent}>
                {answer.para1 && <p>{answer.para1}</p>}

                {answer.listDescribe && <p>{answer.listDescribe}</p>}

                {answer.list && (
                  <ul className={styles.bulletList}>
                    {Object.keys(answer.list)
                      .filter((key) => !key.includes("Link"))
                      .map((key) => (
                        <li key={key}>{answer.list[key]}</li>
                      ))}
                  </ul>
                )}

                {answer.para2 && <p>{answer.para2}</p>}

                {answer.para2Link && (
                  <p>
                    <a
                      href={answer.para2Link.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {answer.para2Link.text}
                    </a>
                  </p>
                )}

                {answer.para1Start && (
                  <p>
                    {answer.para1Start}{" "}
                    <a
                      href={answer.para1Link?.link || "#"}
                      rel="noopener noreferrer"
                    >
                      {answer.para1Link?.text}
                    </a>{" "}
                    {answer.para1End}
                  </p>
                )}
              </div>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default NewFAQPage;
