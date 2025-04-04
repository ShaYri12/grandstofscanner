import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import FAQ from "../pages/FAQ/FAQ";
import { BrowserRouter } from "react-router-dom";

// Helper function to render the FAQ component with i18n
const renderFAQ = () => {
  return render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <FAQ />
      </I18nextProvider>
    </BrowserRouter>
  );
};

describe("FAQ Component", () => {
  test("renders FAQ title", () => {
    renderFAQ();
    expect(screen.getByText(i18n.t("faq.title"))).toBeInTheDocument();
  });

  test("renders FAQ questions", () => {
    renderFAQ();
    expect(screen.getByText(i18n.t("faq.question1"))).toBeInTheDocument();
    expect(screen.getByText(i18n.t("faq.question2"))).toBeInTheDocument();
  });

  test("first question is expanded by default", () => {
    renderFAQ();
    const firstQuestion = screen.getByText(i18n.t("faq.question1"));

    // Since the first question should be open by default,
    // we should be able to find the answer text
    const answerText = i18n.t("faq.answer1.para1");
    expect(screen.getByText(answerText)).toBeInTheDocument();
  });

  test("clicking on a question toggles its answer", () => {
    renderFAQ();

    // Get the second question which should be closed initially
    const secondQuestion = screen.getByText(i18n.t("faq.question2"));

    // The answer should not be visible initially
    const answerText = i18n.t("faq.answer2.para1");
    expect(screen.queryByText(answerText)).not.toBeInTheDocument();

    // Click the question to expand it
    fireEvent.click(secondQuestion);

    // Now the answer should be visible
    expect(screen.getByText(answerText)).toBeInTheDocument();
  });
});
