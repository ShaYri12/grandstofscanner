import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "@jasmine/spec-core";
import FAQ from "../../src/pages/FAQ/FAQ";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("FAQ Component", () => {
  beforeEach(() => {
    render(<FAQ />);
  });

  it("should render FAQ title", () => {
    expect(screen.getByText("faq.title")).toBeTruthy();
  });

  it("should render all FAQ questions", () => {
    const questions = screen.getAllByRole("button");
    expect(questions).toHaveLength(10);
  });

  it("should show answer when question is clicked", () => {
    const firstQuestion = screen.getAllByRole("button")[0];
    fireEvent.click(firstQuestion);
    expect(screen.getByText("faq.answer1")).toBeTruthy();
  });

  it("should hide answer when question is clicked again", () => {
    const firstQuestion = screen.getAllByRole("button")[0];

    // First click to show
    fireEvent.click(firstQuestion);
    expect(screen.getByText("faq.answer1")).toBeTruthy();

    // Second click to hide
    fireEvent.click(firstQuestion);
    expect(screen.queryByText("faq.answer1")).toBeFalsy();
  });

  it("should only show one answer at a time", () => {
    const questions = screen.getAllByRole("button");

    // Click first question
    fireEvent.click(questions[0]);
    expect(screen.getByText("faq.answer1")).toBeTruthy();

    // Click second question
    fireEvent.click(questions[1]);
    expect(screen.queryByText("faq.answer1")).toBeFalsy();
    expect(screen.getByText("faq.answer2")).toBeTruthy();
  });
});
