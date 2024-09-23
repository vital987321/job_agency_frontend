import agencyLogoIcon from "../../../assets/svg/agency_logo_yellow.svg";
import { ReactComponent as IconListIcon } from "../../../assets/svg/icon_list.svg";
import { ReactComponent as MessageIcon } from "../../../assets/svg/message.svg";
import { ReactComponent as PartnersIcon } from "../../../assets/svg/partners.svg";
import { ReactComponent as ApplicationsIcon } from "../../../assets/svg/form_icon.svg";
import { ReactComponent as IconPeople } from "../../../assets/svg/icon_people.svg";
import { NavLink } from "react-router-dom";
import styles from "./adminSideBar.module.css";
import { ButtonType1 } from "../../../commonItems/components/buttons/buttonType1/ButtonType1";
import { useLogOut } from "../../../hooks/useLogout";

export const AdminSideBarComponent = () => {

  //* Hooks
  const {logout}=useLogOut()

  //* Main Body
  return (
    <>
      <nav className={styles["navigation-container"]}>
        <NavLink to="" className={styles["home-page-link"]}>
          <div className={styles["comany-container"]}>
            <img src={agencyLogoIcon} alt="Logo" />
            <p className={styles["company-name"]}>BEE Rercuitment</p>
          </div>
        </NavLink>

        <div className={styles["main-links"]}>
          <NavLink
            to="vacancies"
            className={({ isActive }) => {
              return (
                styles["admin-nav-link"] +
                " " +
                (isActive
                  ? styles["admin-nav-link-active"]
                  : styles["admin-nav-link-non-active"])
              );
            }}
          >
            <IconListIcon />
            <p className={styles["nav-link-text"]}>Vacancies</p>
          </NavLink>
          <NavLink
            to="applications"
            className={({ isActive }) => {
              return (
                styles["admin-nav-link"] +
                " " +
                (isActive
                  ? styles["admin-nav-link-active"]
                  : styles["admin-nav-link-non-active"])
              );
            }}
          >
            <ApplicationsIcon />

            <p className={styles["nav-link-text"]}>Applications</p>
          </NavLink>

          <NavLink
            to="reviews"
            className={({ isActive }) => {
              return (
                styles["admin-nav-link"] +
                " " +
                (isActive
                  ? styles["admin-nav-link-active"]
                  : styles["admin-nav-link-non-active"])
              );
            }}
          >
            <MessageIcon />

            <p className={styles["nav-link-text"]}>Reviews</p>
          </NavLink>

          <NavLink
            to="partners"
            className={({ isActive }) => {
              return (
                styles["admin-nav-link"] +
                " " +
                (isActive
                  ? styles["admin-nav-link-active"]
                  : styles["admin-nav-link-non-active"])
              );
            }}
          >
            <PartnersIcon />
            <p className={styles["nav-link-text"]}>Partners</p>
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) => {
              return (
                styles["admin-nav-link"] +
                " " +
                (isActive
                  ? styles["admin-nav-link-active"]
                  : styles["admin-nav-link-non-active"])
              );
            }}
          >
            <IconPeople />
            <p className={styles["nav-link-text"]}>User flow</p>
          </NavLink>
        </div>
      </nav>

      <div className={styles["logOut-button-container"]}>
        <ButtonType1 value="LogOut" onClickHandler={()=>logout()} />
      </div>
    </>
  );
};
