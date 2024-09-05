import styles from './navMenu.module.css'
import {Link} from "react-router-dom";

export const NavMenu = () => {
    return (
      <nav className={styles.menu}>
        <Link to="/" className="navLinks">
          Home
        </Link>
        <Link to="/vacancies" className="navLinks">
          Vacancies
        </Link>
        <Link to="/about" className="navLinks">
          About us
        </Link>
        <Link to="/reviews" className="navLinks">
          Rewiews
        </Link>
        <Link to="/certificates" className="navLinks">
          Certificates
        </Link>
        <Link to="/contacts" className="navLinks">
          Contacts
        </Link>
      </nav>
    );
  };