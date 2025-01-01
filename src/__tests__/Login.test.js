import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom"; // For extended matchers
import Login from "../pages/Login/Login";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

describe("Login Component", () => {
  const setup = () => {
    return render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={["/en/login"]}>
          <Routes>
            <Route path="/en/login" element={<Login />} />
            <Route path="/en/register" element={<div>Register Page</div>} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    );
  };

  test("renders the login form", () => {
    setup();

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  test("enables the button when the form is filled", () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "admin@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "admin" },
    });

    expect(screen.getByRole("button", { name: /login/i })).not.toBeDisabled();
  });

  test("enables the button when the form is filled", () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "admin@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "admin" },
    });

    expect(screen.getByRole("button", { name: /login/i })).not.toBeDisabled();
  });
});
