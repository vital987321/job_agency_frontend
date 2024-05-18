import agencyLogoIcon from "../../svg/agency_logo_yellow.svg";
import {ReactComponent as IconListIcon} from "../../svg/icon_list.svg";
import {ReactComponent as MessageIcon} from "../../svg/message.svg";
import {ReactComponent as SettingsGearIcon} from "../../svg/settings_gear.svg";
import {ReactComponent as PartnersIcon} from "../../svg/partners.svg";
import { NavLink } from "react-router-dom";

import "../../css/adminArea/adminSideBar.css";

export const AdminSideBarComponent = () => {
  return (
    <aside className="admin-side-bar">
      <div className="admin-side-bar-comany-container">
        <img className="footer-logo-img" src={agencyLogoIcon} alt="Logo" />
        <p className="footer-company-name">BEE Rercuitment</p>
      </div>

      <nav className="admin-side-bar-navigation-container">
        <NavLink
          to="vacancies"
          className={({ isActive }) => {
            return (
              "admin-nav-link " +
              (isActive ? "admin-nav-link-active" : "admin-nav-link-non-active")
            );
          }}
        > 
          <IconListIcon/>
          <p className="admin-side-bar-nav-link-text">Vacancies</p>
        </NavLink>
        <NavLink to="applications" className={({ isActive }) => {
            return (
              "admin-nav-link " +
              (isActive ? "admin-nav-link-active" : "admin-nav-link-non-active")
            );
          }}>
          <MessageIcon/>
          
          <p className="admin-side-bar-nav-link-text">Applications</p>
        </NavLink>
        <NavLink to="partners" className={({ isActive }) => {
            return (
              "admin-nav-link " +
              (isActive ? "admin-nav-link-active" : "admin-nav-link-non-active")
            );
          }}>
          <PartnersIcon/>  
          <p className="admin-side-bar-nav-link-text">Partners</p>
        </NavLink>
        <NavLink to="settings" className={({ isActive }) => {
            return (
              "admin-nav-link " +
              (isActive ? "admin-nav-link-active" : "admin-nav-link-non-active")
            );
          }}>
          <SettingsGearIcon/>  
          <p className="admin-side-bar-nav-link-text">Settings</p>
        </NavLink>
      </nav>
    </aside>
  );
};
