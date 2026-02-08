import styles from "./main.module.css";
import Auth from "../auth/Auth";
import Profile from "../profile/Profile";
import Builds from "../builds/Builds";
import About from "../about/About";

/**
 * Main component to render different pages based on the current state
 * @param {string} page - Current page to determine which component to render
 * @param {function} setPage - Function to set the current page
 * @returns JSX for the main component
 */
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
