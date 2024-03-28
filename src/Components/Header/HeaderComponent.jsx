import agency_logo from "../../img/CONTROL_Agency_logo.png"

export const HeaderComponent = () => {
    return (
      <header>
        <div className="header">
          <div className="header-logo">
            <img src={agency_logo} height={80} alt="logo" />
          </div>

          <ul className="header-menu">
            <li>Vacancies</li>
            <li>About us</li>
            <li>Rewiews</li>
            <li>Certificates</li>
            <li>Contacts</li>
          </ul>

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