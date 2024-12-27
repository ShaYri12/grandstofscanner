import React, { useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Register.module.css";
import { CiLock } from "react-icons/ci";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = localStorage.getItem("userData");
    let users = storedUsers ? JSON.parse(storedUsers) : [];

    const userExists = users.some(
      (user: { email: string }) => user.email === formData.email
    );

    if (userExists) {
      setError("Email already in use, please use another.");
    } else {
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      users.push(newUser);

      localStorage.setItem("userData", JSON.stringify(users));

      toast.success("Registration Successful");
      navigate("/login");
    }
  };

  const isFormIncomplete = () => {
    return Object.values(formData).some((value) => value.trim() === "");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Register</h2>
          <p className={`${styles.subtitle} ${!error && styles.extraPadding}`}>
            Create Your Account
          </p>
          <form className={styles.form} onSubmit={handleRegister}>
            {error && (
              <div className={styles.error}>
                <span className={styles.errorIcon}>
                  <img
                    src="/assets/icons/error.svg"
                    alt="Error"
                    width={24}
                    height={24}
                  />
                </span>
                <div className={styles.errorContent}>
                  <span className={styles.errorTitle}>Registration error</span>
                  <div className={styles.errorMessage}>
                    <span className={styles.errorDot}></span>
                    {error}
                  </div>
                </div>
              </div>
            )}
            <div className={styles.inputContainer}>
              <span className={styles.inputIcon}>
                <LuUser2 color="rgb(19, 38, 66)" size={24} />
              </span>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputIcon}>
                <MdOutlineMail
                  color={error ? "#ca242c" : "rgb(19, 38, 66)"}
                  size={24}
                />
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
            <div className={styles.inputContainer}>
              <span className={styles.inputIcon}>
                <CiLock color="rgb(19, 38, 66)" strokeWidth={1} size={24} />
              </span>
              <input
                type="password"
                id="cpassword"
                placeholder="Confirm Password"
                className={styles.input}
                value={formData.cpassword}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.button}
              disabled={isFormIncomplete()}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className={styles.loginText}>
          <span>Already have an account?</span>
          <Link to="/login" className={styles.loginLink}>
            {" "}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
