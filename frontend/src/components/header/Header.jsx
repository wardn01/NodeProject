import classes from "./header.module.css";

/**
 * Header component code
 * @returns Header JSX
 */
export default function Header({ page, setPage, title }) {
  return (
    <header className={`${classes.header}`}>
      <nav>
        <ul>
          <li onClick={() => setPage("mainPage")}>Home</li>
          <li onClick={() => setPage("profilePage")}>Profile</li>
        </ul>
      </nav>
    </header>
  );
}
