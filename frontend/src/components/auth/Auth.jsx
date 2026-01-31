import axios from "axios";
import styles from "./auth.module.css";
import { useState } from "react";

/**
 * auth component
 * @returns Auth.jsx
 */
function Auth({ setPage }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for login and registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const url = isLogin
      ? "http://localhost:8000/user/login"
      : "http://localhost:8000/user/register";
    try {
      const loginData = await axios.post(url, formData, {
        withCredentials: true,
      });
      if (isLogin) {
        setPage("mainPage");
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error("Error during authentication:", error);
      }
    }
  };
  // Toggle between login and registration forms
  const handleToggle = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <p className={styles.authTitle}>
          {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
        </p>
        {!isLogin && (
          <input
            className={styles.authInput}
            type="text"
            name="username"
            placeholder="User Name"
            onChange={handleChange}
            minLength={2}
            required
          />
        )}
        {!isLogin && (
          <input
            className={styles.authInput}
            type="text"
            name="nickname"
            placeholder="Nick Name"
            onChange={handleChange}
            required
          />
        )}
        <input
          className={styles.authInput}
          type={(!isLogin && "email") || "text"}
          name={(!isLogin && "email") || "username"}
          placeholder={(!isLogin && "Email Address") || "Username or Email"}
          onChange={handleChange}
          required
        />
        <input
          className={styles.authInput}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          minLength={3}
          maxLength={8}
          required
        />
        {!isLogin && (
          <input
            className={styles.authInput}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            minLength={3}
            maxLength={8}
            required
          />
        )}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <button type="submit" className={styles.authSubmitButton}>
          {isLogin ? "LOGIN" : "SIGN UP"}
        </button>

        <p onClick={handleToggle} className={styles.authToggle}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}
export default Auth;
