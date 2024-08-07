import agencyLogoIcon from "../../../assets/svg/agency_logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link,
  Outlet,
} from "react-router-dom";
import "../../../css/commonElements.css";
import "./header.css";
import { AvatarComponent } from "../../../environmentCommon/components/AvatarComponent";
import {useEffect, useState } from "react";
import { ButtonType1 } from "../../../environmentCommon/components/buttons/buttonType1/ButtonType1";

const NavMenu = () => {
  return (
    <nav className="header-menu">
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
    </nav>
  );
};

const HeaderControls = () => {
  const [userAvatarUrl, setUserAvatarUrl] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    setUserAvatarUrl(localStorage.getItem("userAvatarUrl"));
  }, [localStorage.getItem("userAvatarUrl")]);

  const logOutButtonClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("userAvatarUrl");
    setUserAvatarUrl('');
    navigate("/");
  };

  const logInButtonClick = () => {
    navigate("/auth");
  };


  return (
    <div className="header-controls">
      {(() => {
        if (username) {
          return (
            <>
              <Link
                to="/profile"
                className="button-common header-user-logo-button "
                key="profile"
                title={username}
              >
                <AvatarComponent
                  userAvatarUrl={userAvatarUrl}
                  title={username}
                  iconSymbol={username[0].toUpperCase()}
                />
              </Link>
              <div className="log-button-container">
                <ButtonType1 value='LogOut' onClickHandler={logOutButtonClick} strength='2'/>
              </div>
            </>
          );
        }
        return (
          <div className="log-button-container">
            <ButtonType1 value='LogIn' onClickHandler={logInButtonClick} strength='2'/>
          </div>
        );
      })()}

      {/* <button className="language-button">En</button> */}
    </div>
  );
};

export const HeaderComponent = () => {

  return (
    <header>
      <div className="header">
        <div className="header-logo">
          <Link to="/" className="navLinks header-logo-link" key="homepage">
            <img
              className="header-logo-img"
              src={agencyLogoIcon}
              height={80}
              alt="logo"
            />
          </Link>
        </div>
        <NavMenu />
        <HeaderControls />
      </div>
    </header>
  );
};
