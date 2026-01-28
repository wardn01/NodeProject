import styles from "./main.module.css";
import { useState } from "react";
import axios from "axios";
import Auth from "../auth/Auth";
import Profile from "../profile/Profile";
// import AllEnemies from "../allEnemies/AllEnemies";

function Main({ isAuth, setIsAuth }) {
  return (
    <main className={styles.main}>
      {!isAuth ? (
        <Auth setisAuth={setIsAuth} />
      ) : (
        <Profile setisAuth={setIsAuth} />
      )}
    </main>
  );
}

export default Main;
