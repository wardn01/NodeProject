import styles from "./main.module.css";
import Auth from "../auth/Auth";
import Profile from "../profile/Profile";
import Builds from "../builds/Builds";

function Main({ page, setPage }) {
  return (
    <main className={styles.main}>
      {page === "authPage" && <Auth setPage={setPage} />}
      {page === "profilePage" && <Profile setPage={setPage} />}
      {page === "mainPage" && <Builds />}
    </main>
  );
}

export default Main;
