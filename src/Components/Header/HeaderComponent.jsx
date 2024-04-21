import agencyLogoIcon from '../../svg/agency_logo.svg'
import {BrowserRouter as Router, Route, Routes, useNavigate, Link, Outlet} from "react-router-dom"
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
    </div>
  )
}

const HeaderControls =()=>{ 
    const username = localStorage.getItem('username')
    const navigate = useNavigate();

    const logOutButtonClick=()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('username')
      navigate('/')
    }

    const logInButtonClick=()=>{
      navigate('/auth')
    }

  return (
    <div className="header-controls">
      {(()=>{

        if (username){
          return <>
            <Link 
              to='/profile' 
              className="button-common header-user-logo-button " 
              key="profile"
              title={username}
              >
              <p>{username[0].toUpperCase()}</p>  
            </Link>
            <button onClick={logOutButtonClick} className="button-common header-button ">LogOut</button>
          </>
        }
        return(
          <button onClick={logInButtonClick} className="header-button button-common">Log In</button>
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
          <Link to='/' className="navLinks" key="homepage">
            <img src={agencyLogoIcon} height={80} alt="logo" />
          </Link>
        </div>
        <NavMenu />
        <HeaderControls/>
      </div>
    </header>
  );
};