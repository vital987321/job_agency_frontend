import agency_logo from "../../img/CONTROL_Agency_logo.png"
import {BrowserRouter as Router, Route, Routes, Link, Outlet} from "react-router-dom"

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
    </div>
  )
}

export const HeaderComponent = () => {
    return (
      <header>
        <div className="header">
          <div className="header-logo">
            <img src={agency_logo} height={80} alt="logo" />
          </div>
          <NavMenu />
          <div className="header-controls">
            <button className="header-button">LogIn</button>
            <button className="header-button">User</button>
          </div>
        </div>
        <h2> Routes</h2>
        <h3 className="textCenter">Header</h3>
        <hr />
      </header>
    );
};