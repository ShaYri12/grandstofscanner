import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, spyOn } from "@jasmine/spec-core";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "../../src/pages/Login/Login";

// Mock react-router-dom
const mockNavigate = jasmine.createSpy("navigate");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ lang: "en" }),
}));

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: "en",
      changeLanguage: jasmine.createSpy("changeLanguage"),
    },
  }),
}));

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  it("should render login form with all elements", () => {
    expect(screen.getByPlaceholderText("login.emailPlaceholder")).toBeTruthy();
    expect(
      screen.getByPlaceholderText("login.passwordPlaceholder")
    ).toBeTruthy();
    expect(screen.getByText("login.button")).toBeTruthy();
  });

  it("should handle input changes", () => {
    const emailInput = screen.getByPlaceholderText("login.emailPlaceholder");
    const passwordInput = screen.getByPlaceholderText(
      "login.passwordPlaceholder"
    );

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("should handle successful login", async () => {
    const testUser = { email: "test@example.com", password: "password123" };
    localStorage.setItem("userData", JSON.stringify([testUser]));

    const emailInput = screen.getByPlaceholderText("login.emailPlaceholder");
    const passwordInput = screen.getByPlaceholderText(
      "login.passwordPlaceholder"
    );
    const submitButton = screen.getByText("login.button");

    fireEvent.change(emailInput, { target: { value: testUser.email } });
    fireEvent.change(passwordInput, { target: { value: testUser.password } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
      expect(toast.success).toHaveBeenCalledWith("login.success");
    });
  });

  it("should show error for invalid credentials", async () => {
    const emailInput = screen.getByPlaceholderText("login.emailPlaceholder");
    const passwordInput = screen.getByPlaceholderText(
      "login.passwordPlaceholder"
    );
    const submitButton = screen.getByText("login.button");

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("login.incorrectCredentials")).toBeTruthy();
    });
  });

  it("should disable submit button when form is incomplete", () => {
    const submitButton = screen.getByText("login.button");
    expect(submitButton).toBeDisabled();

    const emailInput = screen.getByPlaceholderText("login.emailPlaceholder");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(submitButton).toBeDisabled();
  });
});
