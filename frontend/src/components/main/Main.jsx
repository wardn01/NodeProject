import styles from "./main.module.css";
import { useState } from "react";
import Auth from "../auth/Auth";
import Profile from "../profile/Profile";
import AllEnemies from "../allEnemies/AllEnemies";

function Main({ page, setPage }) {
  return (
    <main className={styles.main}>
      {page === "authPage" && <Auth setPage={setPage} />}
      {page === "mainPage" && <button onClick={() => setPage("allEnemiesProp")}>Enemies</button>}
      {page === "allEnemiesProp" && <AllEnemies setPage={setPage} />}
      {page === "profilePage" && <Profile setPage={setPage} />}
    </main>
  );
}

export default Main;
