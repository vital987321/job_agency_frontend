import agencyLogoIcon from "../../../assets/svg/agency_logo_yellow.svg";
import {ReactComponent as IconListIcon} from "../../../assets/svg/icon_list.svg";
import {ReactComponent as MessageIcon} from "../../../assets/svg/message.svg";
import {ReactComponent as SettingsGearIcon} from "../../../assets/svg/settings_gear.svg";
import {ReactComponent as PartnersIcon} from "../../../assets/svg/partners.svg";
import {ReactComponent as ApplicationsIcon} from '../../../assets/svg/form_icon.svg'
import { NavLink } from "react-router-dom";
import styles from "./adminSideBar.module.css";

export const AdminSideBarComponent = () => {

  return (
    <>
      <div className={styles["comany-container"]}>
        <img src={agencyLogoIcon} alt="Logo" />
        <p className={styles["company-name"]}>BEE Rercuitment</p>
      </div>

      <nav className={styles["navigation-container"]}>
        <NavLink
          to="vacancies"
          className={({ isActive }) => {
            return (
              styles["admin-nav-link"] +' '+
              (isActive ? styles["admin-nav-link-active"] : styles["admin-nav-link-non-active"])
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
              styles["admin-nav-link"] +' '+
              (isActive ? styles["admin-nav-link-active"] : styles["admin-nav-link-non-active"])
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
              styles["admin-nav-link"] +' '+
              (isActive ? styles["admin-nav-link-active"] : styles["admin-nav-link-non-active"])
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
              styles["admin-nav-link"] +' '+
              (isActive ? styles["admin-nav-link-active"] : styles["admin-nav-link-non-active"])
            );
          }}
        >
          <PartnersIcon />
          <p className={styles["nav-link-text"]}>Partners</p>
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) => {
            return (
              styles["admin-nav-link"] +' '+
              (isActive ? styles["admin-nav-link-active"] : styles["admin-nav-link-non-active"])
            );
          }}
        >
          <SettingsGearIcon />
          <p className={styles["nav-link-text"]}>Settings</p>
        </NavLink>
      </nav>
    </>
  );
};
