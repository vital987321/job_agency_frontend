import agencyLogoIcon from '../../../svg/agency_logo.svg'
import {BrowserRouter as Router, Route, Routes, useNavigate, Link, Outlet} from "react-router-dom"
import '../../../css/commonElements.css'
import '../../../css/header.css'
import { AvatarComponent } from '../../AvatarComponent'


const NavMenu = () => {
  return(
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
  )
}

const HeaderControls =()=>{ 
  const username = localStorage.getItem('username')
  const userAvatarUrl = localStorage.getItem("userAvatarUrl");
  // const userAvatarUrl = "http://127.0.0.1:8000/media/media/avatars/avatar1.jpg";
    const navigate = useNavigate();

    const logOutButtonClick=()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('username')
      localStorage.removeItem("userAvatarUrl");
      navigate('/')
    }

    const logInButtonClick=()=>{
      navigate('/auth')
  }
  
  const clickTest = () => {
    console.log('Click!')
  }

  return (
    <div className="header-controls">
      {(()=>{

        if (username){
          return (
            <>
              <div onClick={clickTest}>
                <AvatarComponent
                  userAvatarUrl={userAvatarUrl}
                  username={username}
                />
              </div>

              <Link
                to="/profile"
                className="button-common header-user-logo-button "
                key="profile"
                title={username}
              >
                <p>{username[0].toUpperCase()}</p>
              </Link>
              <button
                onClick={logOutButtonClick}
                className="button-common button-common-color2 header-button "
              >
                LogOut
              </button>
            </>
          );
        }
        return(
          <button onClick={logInButtonClick} className="header-button button-common-color2 button-common">Log In</button>
        )
      })()}
      
      
      <button className="language-button">En</button>
    </div>
  )
}

export const HeaderComponent = () => {
  const onLogOut=()=>{
    
  }

  return (
    <header>
      <div className="header">
        <div className="header-logo">
          <Link to='/' className="navLinks header-logo-link" key="homepage">
            <img className='header-logo-img' src={agencyLogoIcon} height={80} alt="logo" />
          </Link>
        </div>
        <NavMenu />
        <HeaderControls/>
      </div>
    </header>
  );
};