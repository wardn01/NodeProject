import styles from "./app.module.css";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Main from "../components/main/Main";

import { useState } from "react";

/**
 * App component
 * @returns
 */
export default function App() {
  const [page, setPage] = useState("authPage");
  return (
    <div className={styles.app}>
      {page !== "authPage" && <Header page={page} setPage={setPage} />}

      <Main page={page} setPage={setPage} />

      {page !== "authPage" && <Footer prog=" Cryo" year="2026" />}
    </div>
  );
}
