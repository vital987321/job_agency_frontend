import agencyLogoIcon from '../../svg/agency_logo.svg'
import {BrowserRouter as Router, Route, Routes, Link, Outlet} from "react-router-dom"
import '../../css/header.css'

const NavMenu = () => {
  return(
    <div className="header-menu">
      <Link to="/vacancies" className="navLinks" key="vacancies">
        Vacancies
      </Link>
      <Link to="/about" className="navLinks" key="about">
        About us
      </Link>
      <Link to="/reviews" className="navLinks" key="reviews">
        Rewiews
      </Link>
      <Link to="/certificates" className="navLinks" key="certificates">
        Certificates
      </Link>
      <Link to="/contacts" className="navLinks" key="contacts">
        Contacts
      </Link>
      <Link to="/profile" className="navLinks" key="profile">
        Profile
      </Link>
    </div>
  )
}

export const HeaderComponent = () => {
    return (
      <header>
        <div className="header">
          <div className="header-logo">
            <Link to='/' className="navLinks" key="homepage">
              <img src={agencyLogoIcon} height={80} alt="logo" />
            </Link>
          </div>
          <NavMenu />
          <div className="header-controls">
            <button className="header-button button-common">LogIn</button>
            <button className="header-button button-common">User</button>
          </div>

        </div>

      </header>
    );
};