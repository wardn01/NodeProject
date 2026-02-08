import styles from "./header.module.css";
import logo from "../../img/logo.png";
import elementCryo from "../../img/element_cryo.webp";
import elementPyro from "../../img/element_pyro.webp";
import elementAnemo from "../../img/element_anemo.webp";

/**
 * Header component
 * @param {string} page - Current page to determine active navigation item
 * @param {function} setPage - Function to set the current page
 * @returns JSX for the header component
 */
export default function Header({ page, setPage }) {
  return (
    <header className={styles.header}>
      <div
        className={styles.logoContainer}
        onClick={() => setPage("buildPage")}
      >
        <img src={logo} alt="Vision Logo" className={styles.logo} />
        <h1 className={styles.title}>VISION</h1>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li
            className={page === "profilePage" ? styles.active : ""}
            onClick={() => setPage("profilePage")}
          >
            Profile
          </li>
          <li
            className={page === "buildPage" ? styles.active : ""}
            onClick={() => setPage("buildPage")}
          >
            Build
          </li>

          <li
            className={page === "aboutPage" ? styles.active : ""}
            onClick={() => setPage("aboutPage")}
          >
            About
          </li>
        </ul>
      </nav>

      <div className={styles.rightSection}>
        <img src={elementCryo} alt="Cryo" className={styles.elementIcon} />
        <img src={elementPyro} alt="Pyro" className={styles.elementIcon} />
        <img src={elementAnemo} alt="Anemo" className={styles.elementIcon} />
      </div>
    </header>
  );
}
