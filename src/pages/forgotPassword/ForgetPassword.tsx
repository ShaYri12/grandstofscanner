import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import styles from "./ForgetPassword.module.css";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { TbPasswordUser } from "react-icons/tb";

interface LangParam extends Record<string, string | undefined> {
  lang: string;
}

const ForgotPassword: React.FC = () => {
  const { lang } = useParams<LangParam>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password Reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = localStorage.getItem("userData");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const userExists = users.find(
        (u: { email: string }) => u.email === email
      );

      if (userExists) {
        setStep(2); // Move to OTP step
        toast.info("OTP has been sent to your email (mock).");
      } else {
        setError(t("forgotPassword.emailNotFound"));
      }
    } else {
      setError(t("forgotPassword.noUserData"));
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.trim().length !== 6) {
      setError("Invalid OTP. Please enter a valid 6-digit OTP.");
      return;
    }

    setStep(3); // Move to password reset step
    setError(""); // Clear errors
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError(t("forgotPassword.passwordMismatch"));
      return;
    }

    const storedUsers = localStorage.getItem("userData");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const userIndex = users.findIndex(
        (u: { email: string }) => u.email === email
      );

      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("userData", JSON.stringify(users));

        toast.success(t("forgotPassword.passwordUpdated"));
        navigate(`/${lang || "en"}/login`);
      } else {
        setError(t("forgotPassword.emailNotFound"));
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>{t("forgotPassword.resetTitle")}</h2>
          <p className={styles.subtitle}>
            {step === 1
              ? "Enter your email to receive an OTP."
              : step === 2
              ? "Enter the OTP sent to your email."
              : t("forgotPassword.resetSubtitle")}
          </p>

          {error && (
            <p className={styles.error}>
              <IoWarningOutline size={24} />
              {error}
            </p>
          )}

          {step === 1 && (
            <form className={styles.form} onSubmit={handleEmailSubmit}>
              <div className={styles.inputContainer}>
                <MdOutlineEmail size={24} className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder={t("forgotPassword.emailPlaceholder")}
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className={styles.button}
                disabled={!email.trim()}
              >
                Send OTP
              </button>
            </form>
          )}

          {step === 2 && (
            <form className={styles.form} onSubmit={handleOtpSubmit}>
              <div className={styles.inputContainer}>
                <TbPasswordUser size={24} className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Enter OTP (6 digits)"
                  className={styles.input}
                  value={otp}
                  onChange={handleOtpChange}
                  required
                />
              </div>
              <button
                type="submit"
                className={styles.button}
                disabled={otp.length !== 6}
              >
                Verify OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <form className={styles.form} onSubmit={handlePasswordReset}>
              <div className={styles.inputContainer}>
                <CiLock size={24} className={styles.inputIcon} />
                <input
                  type="password"
                  placeholder={t("forgotPassword.newPasswordPlaceholder")}
                  className={styles.input}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <CiLock size={24} className={styles.inputIcon} />
                <input
                  type="password"
                  placeholder={t("forgotPassword.confirmPasswordPlaceholder")}
                  className={styles.input}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className={styles.button}
                disabled={!newPassword.trim() || !confirmPassword.trim()}
              >
                Reset Password
              </button>
            </form>
          )}
        </div>

        <div className={styles.signupText}>
          <Link to={`/${lang || "en"}/login`} className={styles.signupLink}>
            {t("forgotPassword.backToLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
