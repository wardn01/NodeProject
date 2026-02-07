import classes from "./footer.module.css";

/**
 * footer component
 * @returns footer jsx
 */
function Footer() {
  const year = new Date().getFullYear();
  const prog = "The Vision Of Light";
  return (
    <footer className={`${classes.footer}`}>
      <p>
        &copy; {prog} {year}
      </p>
    </footer>
  );
}

export default Footer;
