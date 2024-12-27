import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, spyOn } from "@jasmine/spec-core";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "../../src/pages/Register/Register";

// Mock react-router-dom
const mockNavigate = jasmine.createSpy("navigate");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: "en",
    },
  }),
}));

describe("Register Component", () => {
  beforeEach(() => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  it("should render registration form with all elements", () => {
    expect(
      screen.getByPlaceholderText("register.namePlaceholder")
    ).toBeTruthy();
    expect(
      screen.getByPlaceholderText("register.emailPlaceholder")
    ).toBeTruthy();
    expect(
      screen.getByPlaceholderText("register.passwordPlaceholder")
    ).toBeTruthy();
    expect(
      screen.getByPlaceholderText("register.confirmPasswordPlaceholder")
    ).toBeTruthy();
    expect(screen.getByText("register.button")).toBeTruthy();
  });

  it("should handle input changes", () => {
    const nameInput = screen.getByPlaceholderText("register.namePlaceholder");
    const emailInput = screen.getByPlaceholderText("register.emailPlaceholder");
    const passwordInput = screen.getByPlaceholderText(
      "register.passwordPlaceholder"
    );
    const confirmPasswordInput = screen.getByPlaceholderText(
      "register.confirmPasswordPlaceholder"
    );

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(passwordInput.value).toBe("password123");
    expect(confirmPasswordInput.value).toBe("password123");
  });

  it("should handle successful registration", async () => {
    const nameInput = screen.getByPlaceholderText("register.namePlaceholder");
    const emailInput = screen.getByPlaceholderText("register.emailPlaceholder");
    const passwordInput = screen.getByPlaceholderText(
      "register.passwordPlaceholder"
    );
    const confirmPasswordInput = screen.getByPlaceholderText(
      "register.confirmPasswordPlaceholder"
    );
    const submitButton = screen.getByText("register.button");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
      expect(toast.success).toHaveBeenCalledWith("register.success");
    });
  });

  it("should show error for existing email", async () => {
    const existingUser = {
      email: "existing@example.com",
      password: "password123",
    };
    localStorage.setItem("userData", JSON.stringify([existingUser]));

    const nameInput = screen.getByPlaceholderText("register.namePlaceholder");
    const emailInput = screen.getByPlaceholderText("register.emailPlaceholder");
    const passwordInput = screen.getByPlaceholderText(
      "register.passwordPlaceholder"
    );
    const confirmPasswordInput = screen.getByPlaceholderText(
      "register.confirmPasswordPlaceholder"
    );
    const submitButton = screen.getByText("register.button");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "existing@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("register.error.emailInUse")).toBeTruthy();
    });
  });
});
