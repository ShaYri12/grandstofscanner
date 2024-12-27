import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import styles from "./Login.module.css";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

interface LangParam extends Record<string, string | undefined> {
  lang: string;
}

const Login: React.FC = () => {
  const { lang } = useParams<LangParam>();
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const currentLanguage = i18n.language || "en";

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  useEffect(() => {
    const initialUserData = [
      { name: "admin", email: "admin@example.com", password: "admin" },
      { name: "John Doe", email: "john@example.com", password: "password123" },
      { name: "Jane Smith", email: "jane@example.com", password: "mypassword" },
    ];
    if (!localStorage.getItem("userData")) {
      localStorage.setItem("userData", JSON.stringify(initialUserData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    const storedUsers = localStorage.getItem("userData");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);

      const user = users.find(
        (u: { email: string; password: string }) =>
          u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("auth", JSON.stringify(user));
        toast.success(t("login.success"));
        navigate("/");
      } else {
        setError(t("login.incorrectCredentials"));
      }
    } else {
      setError(t("login.noUserData"));
    }
  };

  const isFormIncomplete = () => {
    return Object.values(formData).some((value) => value.trim() === "");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>{t("login.title")}</h2>
          <p className={`${styles.subtitle} ${!error && styles.extraPadding}`}>
            {t("login.subtitle")}
          </p>
          <form className={styles.form} onSubmit={handleLogin}>
            <p className={`${styles.error} ${!error && styles.invisible}`}>
              <span className={styles.errorIcon}>
                <IoWarningOutline height={32} size={24} />
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
                placeholder={t("login.emailPlaceholder")}
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputIcon}>
                <CiLock color="rgb(19, 38, 66)" strokeWidth={1} size={24} />
              </span>
              <input
                type="password"
                id="password"
                placeholder={t("login.passwordPlaceholder")}
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.button}
              disabled={isFormIncomplete()}
            >
              {t("login.button")}
            </button>
          </form>
        </div>
        <div className={styles.signupText}>
          <span>{t("login.noAccount")}</span>{" "}
          <Link
            to={`/${currentLanguage}/register`}
            className={styles.signupLink}
          >
            {t("login.signUp")}
          </Link>
        </div>
        <div className={styles.forgotPassword}>
          <a href="#" className={styles.forgotPasswordLink}>
            {t("login.forgotPassword")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
