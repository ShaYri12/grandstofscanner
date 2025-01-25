import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import styles from "./ForgetPassword.module.css";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

interface LangParam extends Record<string, string | undefined> {
  lang: string;
}

const ForgotPassword: React.FC = () => {
  const { lang } = useParams<LangParam>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = localStorage.getItem("userData");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const userExists = users.find(
        (u: { email: string }) => u.email === email
      );

      if (userExists) {
        if (newPassword !== confirmPassword) {
          setError(t("forgotPassword.passwordMismatch"));
          return;
        }

        // Update password
        userExists.password = newPassword;
        localStorage.setItem("userData", JSON.stringify(users));

        toast.success(t("forgotPassword.passwordUpdated"));
        navigate(`/${lang || "en"}/login`);
      } else {
        setError(t("forgotPassword.emailNotFound"));
      }
    } else {
      setError(t("forgotPassword.noUserData"));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>{t("forgotPassword.resetTitle")}</h2>
          <p className={styles.subtitle}>{t("forgotPassword.resetSubtitle")}</p>
          <form className={styles.form} onSubmit={handleResetPassword}>
            <p className={`${styles.error} ${!error && styles.invisible}`}>
              <span className={styles.errorIcon}>
                <IoWarningOutline size={24} />
              </span>
              <span>{error}</span>
            </p>
            <div className={styles.inputContainer}>
              <span className={styles.inputIcon}>
                <MdOutlineEmail color="rgb(19, 38, 66)" size={24} />
              </span>
              <input
                type="email"
                id="email"
                placeholder={t("forgotPassword.emailPlaceholder")}
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputIcon}>
                <CiLock color="rgb(19, 38, 66)" strokeWidth={1} size={24} />
              </span>
              <input
                type="password"
                id="newPassword"
                placeholder={t("forgotPassword.newPasswordPlaceholder")}
                className={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputIcon}>
                <CiLock color="rgb(19, 38, 66)" strokeWidth={1} size={24} />
              </span>
              <input
                type="password"
                id="confirmPassword"
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
              disabled={!email.trim() || !newPassword || !confirmPassword}
            >
              {t("forgotPassword.button")}
            </button>
          </form>
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
