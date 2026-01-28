import axios from "axios";
import styles from "./auth.module.css";
import { useState } from "react";

/**
 * auth component
 * @returns Auth.jsx
 */
function Auth({ setisAuth, setUser, setAllEnemies }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    nickname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:8000/user/login"
      : "http://localhost:8000/user/register";
    try {
      const loginRes = await axios.post(url, formData, {
        withCredentials: true,
      });
      if (isLogin) {
        setUser(loginRes.data.user);
        const enemiesRes = await axios.get(
          "http://localhost:8000/enemy/allEnemies",
          {
            withCredentials: true,
          },
        );
        setAllEnemies(enemiesRes.data);
        setisAuth(true);
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2 className={styles.authHeading}>
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {!isLogin && (
          <input
            className={styles.authInput}
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        )}
        {!isLogin && (
          <input
            className={styles.authInput}
            type="text"
            name="nickname"
            placeholder="Nickname"
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
          required
        />

        <button type="submit" className={styles.authSubmitButton}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} className={styles.authToggle}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}
export default Auth;
