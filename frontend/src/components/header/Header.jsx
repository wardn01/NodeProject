import classes from "./header.module.css";

/**
 * Header component code
 * @returns Header JSX
 */
export default function Header({ title }) {
  return (
    <header className={`${classes.header}`}>
      <h1>{title}</h1>
    </header>
  );
}
