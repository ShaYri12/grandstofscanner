import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FAQ from "../pages/FAQ/FAQ";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; // Adjust the path as needed

// Mock the react-i18next hook
jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const renderFAQ = () => {
  return render(
    <I18nextProvider i18n={i18n}>
      <FAQ />
    </I18nextProvider>
  );
};

describe("FAQ Component", () => {
  test("renders FAQ title", () => {
    renderFAQ();
    expect(screen.getByText("faq.title")).toBeInTheDocument();
  });

  test("renders all FAQ questions", () => {
    renderFAQ();
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`faq.question${i}`)).toBeInTheDocument();
    }
  });

  test("expands and collapses accordion items", () => {
    renderFAQ();
    const firstQuestion = screen.getByText("faq.question1");
    const secondQuestion = screen.getByText("faq.question2");

    // First question should be expanded by default
    expect(screen.getByText("faq.answer1")).toBeInTheDocument();

    // Click on the second question
    fireEvent.click(secondQuestion);

    // Second answer should be visible, first answer should be hidden
    expect(screen.getByText("faq.answer2")).toBeInTheDocument();
    expect(screen.queryByText("faq.answer1")).not.toBeInTheDocument();

    // Click on the first question again
    fireEvent.click(firstQuestion);

    // First answer should be visible, second answer should be hidden
    expect(screen.getByText("faq.answer1")).toBeInTheDocument();
    expect(screen.queryByText("faq.answer2")).not.toBeInTheDocument();
  });

  test("collapses expanded item when clicked again", () => {
    renderFAQ();
    const firstQuestion = screen.getByText("faq.question1");

    // First question should be expanded by default
    expect(screen.getByText("faq.answer1")).toBeInTheDocument();

    // Click on the first question
    fireEvent.click(firstQuestion);

    // First answer should be hidden
    expect(screen.queryByText("faq.answer1")).not.toBeInTheDocument();
  });

  test("applies correct CSS classes for expanded and collapsed states", () => {
    renderFAQ();
    const firstQuestion = screen.getByText("faq.question1");
    const secondQuestion = screen.getByText("faq.question2");

    // First question should not have 'collapsed' class
    expect(firstQuestion).not.toHaveClass("collapsed");

    // Second question should have 'collapsed' class
    expect(secondQuestion).toHaveClass("collapsed");

    // Click on the second question
    fireEvent.click(secondQuestion);

    // Now first question should have 'collapsed' class and second should not
    expect(firstQuestion).toHaveClass("collapsed");
    expect(secondQuestion).not.toHaveClass("collapsed");
  });

  test("renders the correct number of FAQ items", () => {
    renderFAQ();
    const questions = screen.getAllByRole("button");
    expect(questions).toHaveLength(10); // Assuming there are 10 FAQ items
  });
});
