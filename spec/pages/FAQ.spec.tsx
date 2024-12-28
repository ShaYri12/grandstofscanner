import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FAQ from "../../src/pages/FAQ/FAQ";

describe("FAQ Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<FAQ />);
    expect(getByText("faq.title")).toBeTruthy();
  });

  it("renders all FAQ items", () => {
    const { getAllByRole } = render(<FAQ />);
    const questions = getAllByRole("button");
    expect(questions.length).toBe(10);
  });

  it("toggles accordion items when clicked", () => {
    const { getAllByRole, queryByText } = render(<FAQ />);
    const questions = getAllByRole("button");

    // First item should be open by default
    expect(queryByText("faq.answer1")).toBeTruthy();

    // Click the second item
    fireEvent.click(questions[1]);
    expect(queryByText("faq.answer2")).toBeTruthy();
    expect(queryByText("faq.answer1")).toBeFalsy();

    // Click the second item again to close it
    fireEvent.click(questions[1]);
    expect(queryByText("faq.answer2")).toBeFalsy();
  });
});
