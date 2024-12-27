import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Login.module.css";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        toast.success("Login Successful");
        navigate("/");
      } else {
        setError("Incorrect email or password!");
      }
    } else {
      setError("No user data found in the system.");
    }
  };

  const isFormIncomplete = () => {
    return Object.values(formData).some((value) => value.trim() === "");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Login</h2>
          <p className={`${styles.subtitle} ${!error && styles.extraPadding}`}>
            Sign in to your account
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
                placeholder="Email"
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
                placeholder="Password"
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
              Login
            </button>
          </form>
        </div>
        <div className={styles.signupText}>
          <span>Don't have an account?</span>{" "}
          <Link to="/register" className={styles.signupLink}>
            Sign up
          </Link>
        </div>
        <div className={styles.forgotPassword}>
          <a href="#" className={styles.forgotPasswordLink}>
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
