import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FAQ from "../pages/FAQ/FAQ"; // Adjust the import path accordingly
import "@testing-library/jest-dom";
import { I18nextProvider } from "react-i18next";
import i18nMock from "../locales/en.json"; // Mocked i18n instance

// Mocking the useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key, // Returning the key itself for translation
  }),
}));

const setup = () => {
  render(
    <I18nextProvider i18n={i18nMock}>
      <FAQ />
    </I18nextProvider>
  );
};

describe("FAQ Component", () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <FAQ />
      </MemoryRouter>
    );
  };

  test("renders FAQ title", () => {
    setup();

    // Check if the FAQ title is rendered
    expect(screen.getByText("faq.title")).toBeInTheDocument();
  });

  test("renders FAQ questions", () => {
    setup();

    // Check if all the FAQ questions are rendered
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`faq.question${i}`)).toBeInTheDocument();
    }
  });

  //   test("toggles the answer when clicking a question", () => {
  //     setup();

  //     // Initially, no answers are visible
  //     for (let i = 1; i <= 10; i++) {
  //       expect(screen.queryByText(`faq.answer${i}`)).not.toBeInTheDocument();
  //     }

  //     // Click the first question to reveal the answer
  //     fireEvent.click(screen.getByText("faq.question1"));
  //     expect(screen.getByText("faq.answer1")).toBeInTheDocument();

  //     // Click the first question again to collapse the answer
  //     fireEvent.click(screen.getByText("faq.question1"));
  //     expect(screen.queryByText("faq.answer1")).not.toBeInTheDocument();
  //   });

  //   test("toggles only the clicked question's answer", () => {
  //     setup();

  //     // Click the first question to reveal the answer
  //     fireEvent.click(screen.getByText("faq.question1"));
  //     expect(screen.getByText("faq.answer1")).toBeInTheDocument();

  //     // Click the second question and check that only the second answer is revealed
  //     fireEvent.click(screen.getByText("faq.question2"));
  //     expect(screen.getByText("faq.answer2")).toBeInTheDocument();
  //     expect(screen.queryByText("faq.answer1")).not.toBeInTheDocument();
  //   });

  //   test("does not reveal answer for collapsed questions", () => {
  //     setup();

  //     // Click the first question to reveal the answer
  //     fireEvent.click(screen.getByText("faq.question1"));
  //     expect(screen.getByText("faq.answer1")).toBeInTheDocument();

  //     // Click another question, the previous one should collapse
  //     fireEvent.click(screen.getByText("faq.question2"));
  //     expect(screen.getByText("faq.answer2")).toBeInTheDocument();

  //     // Now, check if the answer for the first question has been collapsed
  //     expect(screen.queryByText("faq.answer1")).not.toBeInTheDocument();
  //   });
});
