import styles from "./auth.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

/**
 * Auth component for user login and registration
 * @param {function} setPage - Function to set the current page
 * @returns JSX for the authentication component
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
  const [eyeInvisible, setEyeInvisible] = useState(true);
  const [eyeInvisibleConfirm, setEyeInvisibleConfirm] = useState(true);

  // Check authentication status on component mount
 useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/profile", {
          withCredentials: true,
        });
        if (response.data.authenticated) {
          setPage("aboutPage");
        }
      } catch (error) {
        if (error.response && error.response.status !== 401) {
          console.error("Authentication check failed:", error);
        }
      }
    };
    checkAuth();
  }, [setPage]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { password } = formData;

    if (!isLogin && password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return false;
    }
    return true;
  };

  // Handle form submission for login and registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) return;

    const url = isLogin
      ? "http://localhost:8000/user/login"
      : "http://localhost:8000/user/register";
    try {
      await axios.post(url, formData, { withCredentials: true });
      if (isLogin) {
        setPage("aboutPage");
      } else {
        setIsLogin(true);
        resetForm();
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Error during authentication.",
      );
    }
  };

  // Reset form fields to initial state
  const resetForm = () => {
    setFormData({
      username: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Toggle between login and registration forms
  const handleToggle = () => {
    resetForm();
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
            value={formData.username}
            onChange={handleChange}
          />
        )}

        {!isLogin && (
          <input
            className={styles.authInput}
            type="text"
            name="nickname"
            placeholder="Nick Name"
            value={formData.nickname}
            onChange={handleChange}
          />
        )}

        <input
          className={styles.authInput}
          type={!isLogin ? "email" : "text"}
          name={!isLogin ? "email" : "username"}
          placeholder={!isLogin ? "Email Address" : "Username or Email"}
          value={!isLogin ? formData.email : formData.username}
          onChange={handleChange}
        />

        <div className={styles.passwordInputContainer}>
          <input
            className={styles.authInput}
            type={eyeInvisible ? "password" : "text"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            className={styles.passwordToggleIcon}
            onClick={() => setEyeInvisible(!eyeInvisible)}
          >
            {eyeInvisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        {!isLogin && (
          <div className={styles.passwordInputContainer}>
            <input
              className={styles.authInput}
              type={eyeInvisibleConfirm ? "password" : "text"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
              className={styles.passwordToggleIcon}
              onClick={() => setEyeInvisibleConfirm(!eyeInvisibleConfirm)}
            >
              {eyeInvisibleConfirm ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </div>
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
