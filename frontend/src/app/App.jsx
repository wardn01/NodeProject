import styles from "./app.module.css";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Main from "../components/main/Main";

import { useState } from "react";

/**
 * Main SIte component
 * @returns
 */
export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <div className={styles.app}>
      {isAuth && <Header title={"Theme"} />}

      <Main isAuth={isAuth} setIsAuth={setIsAuth} />

      {isAuth && <Footer prog=" Cryo" year="2026" />}
    </div>
  );
}
