import agencyLogoIcon from "../../svg/agency_logo_yellow.svg";
import iconListIcon from "../../svg/icon_list.svg";
import {
  Link
} from "react-router-dom";

export const AdminSideBarComponent = () => {
  return (
    <aside className="admin-side-bar">
      <div className="admin-footer-comany-container">
        <img className="footer-logo-img" src={agencyLogoIcon} alt="Logo" />
        <p className="footer-company-name">BEE Rercuitment</p>
      </div>

      <ul>
        <li>
          <a href="/"></a>
          <Link to="/" className="navLinks admin-side-baar-nav-links">
            <img
              className="admin-side-bar-nav-icons"
              src={iconListIcon}
            //   height={80}
              alt="logo"
            />
            <p>
                Vacancies
            </p>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
