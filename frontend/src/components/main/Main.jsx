import styles from "./main.module.css";
import Auth from "../auth/Auth";
import Profile from "../profile/Profile";
import Builds from "../builds/Builds";
import About from "../about/About";

function Main({ page, setPage }) {
  return (
    <main className={styles.main}>
      {page === "authPage" && <Auth setPage={setPage} />}
      {page === "profilePage" && <Profile setPage={setPage} />}
      {page === "buildPage" && <Builds />}
      {page === "aboutPage" && <About />}
    </main>
  );
}

export default Main;
