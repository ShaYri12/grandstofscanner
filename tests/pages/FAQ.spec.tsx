import React from "react"; // Explicit import
import { render, screen, fireEvent } from "@testing-library/react";
import FAQ from "../../src/pages/FAQ/FAQ"; // Adjust the import path as needed
import { useTranslation } from "react-i18next";

// Mock the `useTranslation` hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("FAQ Component", () => {
  beforeEach(() => {
    render(<FAQ />);
  });

  it("should render the FAQ title", () => {
    expect(screen.getByText("faq.title")).toBeInTheDocument();
  });

  it("should render all FAQ questions", () => {
    const faqQuestions = [
      "faq.question1",
      "faq.question2",
      "faq.question3",
      "faq.question4",
      "faq.question5",
      "faq.question6",
      "faq.question7",
      "faq.question8",
      "faq.question9",
      "faq.question10",
    ];

    faqQuestions.forEach((question) => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });
  });

  it("should expand and collapse the correct accordion item on click", () => {
    const firstQuestion = screen.getByText("faq.question1");
    const firstAnswer = "faq.answer1";

    // Initially, the first answer is displayed
    expect(screen.queryByText(firstAnswer)).toBeInTheDocument();

    // Collapse the first item
    fireEvent.click(firstQuestion);
    expect(screen.queryByText(firstAnswer)).not.toBeInTheDocument();

    // Expand the first item again
    fireEvent.click(firstQuestion);
    expect(screen.queryByText(firstAnswer)).toBeInTheDocument();
  });

  it("should only have one accordion item open at a time", () => {
    const firstQuestion = screen.getByText("faq.question1");
    const secondQuestion = screen.getByText("faq.question2");
    const firstAnswer = "faq.answer1";
    const secondAnswer = "faq.answer2";

    // Expand the first item
    fireEvent.click(firstQuestion);
    expect(screen.queryByText(firstAnswer)).toBeInTheDocument();

    // Expand the second item
    fireEvent.click(secondQuestion);
    expect(screen.queryByText(secondAnswer)).toBeInTheDocument();

    // Ensure the first item is collapsed
    expect(screen.queryByText(firstAnswer)).not.toBeInTheDocument();
  });
});
