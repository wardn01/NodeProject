import styles from "./header.module.css";
import logo from "../../img/logo.png";
import elementCryo from "../../img/element_cryo.webp";
import elementPyro from "../../img/element_pyro.webp";
import elementAnemo from "../../img/element_anemo.webp";

export default function Header({ page, setPage }) {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer} onClick={() => setPage("mainPage")}>
        <img src={logo} alt="XIAO Logo" className={styles.logo} />
        <h1 className={styles.title}>XIAO</h1>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li
            className={page === "mainPage" ? styles.active : ""}
            onClick={() => setPage("mainPage")}
          >
            Home
          </li>
          <li
            className={page === "profilePage" ? styles.active : ""}
            onClick={() => setPage("profilePage")}
          >
            Profile
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
