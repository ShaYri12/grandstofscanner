import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "../pages/Register/Register";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; // Adjust the path as needed

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const renderRegister = async () => {
  await act(async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </I18nextProvider>
    );
  });
};

describe("Register Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders register form", async () => {
    await renderRegister();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
  });

  test("allows user to fill out form", async () => {
    await renderRegister();
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Your Name"), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "password123" },
      });
      fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
        target: { value: "password123" },
      });
    });

    expect(screen.getByPlaceholderText("Your Name")).toHaveValue("John Doe");
    expect(screen.getByPlaceholderText("Email")).toHaveValue(
      "john@example.com"
    );
    expect(screen.getByPlaceholderText("Password")).toHaveValue("password123");
    expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
      "password123"
    );
  });

  test("displays error when email is already in use", async () => {
    localStorage.setItem(
      "userData",
      JSON.stringify([{ email: "existing@example.com" }])
    );
    await renderRegister();

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Your Name"), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "existing@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "password123" },
      });
      fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
        target: { value: "password123" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    });

    await waitFor(() => {
      expect(
        screen.getByText("Email already in use, please use another.")
      ).toBeInTheDocument();
    });
  });

  test("successfully registers a new user", async () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => mockNavigate);

    await renderRegister();

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Your Name"), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "password123" },
      });
      fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
        target: { value: "password123" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
      expect(require("react-toastify").toast.success).toHaveBeenCalledWith(
        "Registration Successful"
      );
    });

    const storedUsers = JSON.parse(localStorage.getItem("userData") || "[]");
    expect(storedUsers).toContainEqual({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
  });

  test("disables submit button when form is incomplete", async () => {
    await renderRegister();
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    expect(submitButton).toBeDisabled();

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Your Name"), {
        target: { value: "John Doe" },
      });
    });
    expect(submitButton).toBeDisabled();

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "john@example.com" },
      });
    });
    expect(submitButton).toBeDisabled();

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "password123" },
      });
    });
    expect(submitButton).toBeDisabled();

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
        target: { value: "password123" },
      });
    });
    expect(submitButton).not.toBeDisabled();
  });

  test("changes language", async () => {
    await renderRegister();

    // Initially in English
    expect(screen.getByText("Register")).toBeInTheDocument();

    // Change language to Dutch
    await act(async () => {
      await i18n.changeLanguage("nl");
    });

    await waitFor(() => {
      expect(screen.getByText("Registreren")).toBeInTheDocument();
    });
  });
});
