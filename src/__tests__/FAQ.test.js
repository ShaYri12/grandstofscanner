import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FAQ from "../pages/FAQ/FAQ";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; // Import your initialized i18n instance

// Helper function to render the FAQ component with i18n
const renderFAQ = () => {
  render(
    <I18nextProvider i18n={i18n}>
      <FAQ />
    </I18nextProvider>
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

  test("expands and collapses accordion items", () => {
    renderFAQ();
    const firstQuestion = screen.getByText(i18n.t("faq.question1"));

    // Initially, the answer should not be visible
    expect(
      screen.queryByText(i18n.t("faq.answer1.para1"))
    ).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(firstQuestion);
    expect(screen.getByText(i18n.t("faq.answer1.para1"))).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(firstQuestion);
    expect(
      screen.queryByText(i18n.t("faq.answer1.para1"))
    ).not.toBeInTheDocument();
  });

  test("only one accordion item is open at a time", () => {
    renderFAQ();
    const firstQuestion = screen.getByText(i18n.t("faq.question1"));
    const secondQuestion = screen.getByText(i18n.t("faq.question2"));

    // Open first question
    fireEvent.click(firstQuestion);
    expect(screen.getByText(i18n.t("faq.answer1.para1"))).toBeInTheDocument();

    // Open second question
    fireEvent.click(secondQuestion);
    expect(screen.getByText(i18n.t("faq.answer2.para1"))).toBeInTheDocument();
    expect(
      screen.queryByText(i18n.t("faq.answer1.para1"))
    ).not.toBeInTheDocument();
  });
});
