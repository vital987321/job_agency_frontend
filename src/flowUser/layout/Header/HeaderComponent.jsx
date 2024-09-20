import agencyLogoIcon from "../../../assets/svg/agency_logo.svg";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styles from "./header.module.css";
import { NavMenu } from "./substructures/navMenu/navMenu";
import { HeaderControls } from "./substructures/headerControls/headerControls";

export const HeaderComponent = () => {
  return (
    <header>
      <div className={styles["header-container"]}>
        <div className={styles.header}>
          <div className={styles["header-logo"]}>
            <Link to="/">
              <img
                className={styles["logo-img"]}
                src={agencyLogoIcon}
                height={80}
                alt="logo"
              />
            </Link>
          </div>
          <NavMenu />
          <HeaderControls />
        </div>
      </div>
    </header>
  );
};

