import styles from "./NavMenu.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../../hooks/useAuth";

export const NavMenu = () => {
  const { auth } = useAuth();
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
      {(() => {
        if (auth.role == "2250" || auth.role == "1001")
          return (
            <Link to="/admin" className="navLinks">
              Admin
            </Link>
          );
      })()}
    </nav>
  );
};
