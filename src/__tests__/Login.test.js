import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom"; // For extended matchers
import Login from "../pages/Login/Login";

describe("Login Component", () => {
  const setup = () => {
    render(
      <MemoryRouter initialEntries={["/en/login"]}>
        <Routes>
          <Route path="/en/login" element={<Login />} />
          <Route path="/en/register" element={<div>Register Page</div>} />
        </Routes>
      </MemoryRouter>
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
