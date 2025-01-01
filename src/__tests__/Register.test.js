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

// Helper function to render the Register component with i18n
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

    // Check if translation keys are correctly rendered
    expect(screen.getByText(i18n.t("register.title"))).toBeInTheDocument();
    expect(screen.getByText(i18n.t("register.subtitle"))).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(i18n.t("register.namePlaceholder"))
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(i18n.t("register.emailPlaceholder"))
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(i18n.t("register.passwordPlaceholder"))
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(i18n.t("register.confirmPasswordPlaceholder"))
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: i18n.t("register.button") })
    ).toBeInTheDocument();
  });

  test("allows user to fill out form", async () => {
    await renderRegister();

    await act(async () => {
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.namePlaceholder")),
        {
          target: { value: "John Doe" },
        }
      );
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.emailPlaceholder")),
        {
          target: { value: "john@example.com" },
        }
      );
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.passwordPlaceholder")),
        {
          target: { value: "password123" },
        }
      );
      fireEvent.change(
        screen.getByPlaceholderText(
          i18n.t("register.confirmPasswordPlaceholder")
        ),
        {
          target: { value: "password123" },
        }
      );
    });

    expect(
      screen.getByPlaceholderText(i18n.t("register.namePlaceholder"))
    ).toHaveValue("John Doe");
    expect(
      screen.getByPlaceholderText(i18n.t("register.emailPlaceholder"))
    ).toHaveValue("john@example.com");
    expect(
      screen.getByPlaceholderText(i18n.t("register.passwordPlaceholder"))
    ).toHaveValue("password123");
    expect(
      screen.getByPlaceholderText(i18n.t("register.confirmPasswordPlaceholder"))
    ).toHaveValue("password123");
  });

  test("displays error when email is already in use", async () => {
    localStorage.setItem(
      "userData",
      JSON.stringify([{ email: "existing@example.com" }])
    );
    await renderRegister();

    await act(async () => {
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.namePlaceholder")),
        {
          target: { value: "John Doe" },
        }
      );
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.emailPlaceholder")),
        {
          target: { value: "existing@example.com" },
        }
      );
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.passwordPlaceholder")),
        {
          target: { value: "password123" },
        }
      );
      fireEvent.change(
        screen.getByPlaceholderText(
          i18n.t("register.confirmPasswordPlaceholder")
        ),
        {
          target: { value: "password123" },
        }
      );

      fireEvent.click(
        screen.getByRole("button", { name: i18n.t("register.button") })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(i18n.t("register.error.emailInUse"))
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
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.namePlaceholder")),
        {
          target: { value: "John Doe" },
        }
      );
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.emailPlaceholder")),
        {
          target: { value: "john@example.com" },
        }
      );
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.passwordPlaceholder")),
        {
          target: { value: "password123" },
        }
      );
      fireEvent.change(
        screen.getByPlaceholderText(
          i18n.t("register.confirmPasswordPlaceholder")
        ),
        {
          target: { value: "password123" },
        }
      );

      fireEvent.click(
        screen.getByRole("button", { name: i18n.t("register.button") })
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
      expect(require("react-toastify").toast.success).toHaveBeenCalledWith(
        i18n.t("register.success")
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
    const submitButton = screen.getByRole("button", {
      name: i18n.t("register.button"),
    });
    expect(submitButton).toBeDisabled();

    await act(async () => {
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.namePlaceholder")),
        {
          target: { value: "John Doe" },
        }
      );
    });
    expect(submitButton).toBeDisabled();

    await act(async () => {
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.emailPlaceholder")),
        {
          target: { value: "john@example.com" },
        }
      );
    });
    expect(submitButton).toBeDisabled();

    await act(async () => {
      fireEvent.change(
        screen.getByPlaceholderText(i18n.t("register.passwordPlaceholder")),
        {
          target: { value: "password123" },
        }
      );
    });
    expect(submitButton).toBeDisabled();

    await act(async () => {
      fireEvent.change(
        screen.getByPlaceholderText(
          i18n.t("register.confirmPasswordPlaceholder")
        ),
        {
          target: { value: "password123" },
        }
      );
    });
    expect(submitButton).not.toBeDisabled();
  });

  test("changes language", async () => {
    await renderRegister();

    // Initially in English
    expect(screen.getByText(i18n.t("register.title"))).toBeInTheDocument();

    // Change language to Dutch
    await act(async () => {
      await i18n.changeLanguage("nl");
    });

    await waitFor(() => {
      expect(screen.getByText(i18n.t("register.title"))).toBeInTheDocument();
    });
  });
});
