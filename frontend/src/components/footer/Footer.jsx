import classes from "./footer.module.css";

/**
 * footer component
 * @returns footer jsx
 */
function Footer({ prog, year }) {
  return (
    <footer className={`${classes.footer}`}>
      <p>
        &copy; {prog} {year}
      </p>
    </footer>
  );
}

export default Footer;
