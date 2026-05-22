import { Link } from "react-router-dom";
import Banner from "@assets/images/banner.webp";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={Banner} alt="Rick and Morty portal" className={styles.logo} />
      <span className={styles.title}>
        Rick and Morty <span>Explorer</span>
      </span>
      <nav className={styles.nav}>
        <Link to="/">
          <span className={styles.link}>Home</span>
        </Link>
        <Link to="/docs">
          <span className={styles.link}>Docs</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
