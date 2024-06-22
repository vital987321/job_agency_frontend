import { useNavigate } from "react-router-dom";
import React from "react"
import "../../css/adminArea/adminApplicationsFilter.css";
import filterIcon from "../../svg/settings.svg";

const idRef=React.createRef()
const vacancyIdRef=React.createRef()
const emailRef=React.createRef()
const statusRef=React.createRef()
const vacancyNameRef=React.createRef()
const companyRef=React.createRef()
const userIdRef=React.createRef()
const firstNameRef=React.createRef()
const lastNameRef=React.createRef()
const phoneRef=React.createRef()

export const AdminApplicatiosFilterComponent = () => {

  const navigate = useNavigate();

  const buildFIlterQueryString = () => {
    const id=idRef.current.value
    const vacancyId=vacancyIdRef.current.value
    const email=emailRef.current.value
    const status=statusRef.current.value
    const vacancyName=vacancyNameRef.current.value
    const company=companyRef.current.value
    const userId=userIdRef.current.value
    const firstName=firstNameRef.current.value
    const lastName=lastNameRef.current.value
    const phone=phoneRef.current.value

    let queryStringArray = [];
    let queryString = "";

    if (id) queryStringArray.push('id='+id)
    if (vacancyId) queryStringArray.push('vacancy_id='+vacancyId)
    if (email) queryStringArray.push('email='+email)
    if (status) queryStringArray.push('status='+status)
    if (vacancyName) queryStringArray.push('vacancy_name='+vacancyName)
    if (company) queryStringArray.push('company='+company)
    if (userId) queryStringArray.push('user_id='+userId)
    if (firstName) queryStringArray.push('first_name='+firstName)
    if (lastName) queryStringArray.push('last_name='+lastName)
    if (phone) queryStringArray.push('phone='+phone)

    if (queryStringArray.length > 0) {
      queryString = "?" + queryStringArray.join("&");
    }
    return queryString;
  };

  const filterButtonHandler = (e) => {
    e.preventDefault();
    navigate("" + buildFIlterQueryString());
    // props.setVacancyFilterDisplayValue("none");
  };

  return (
    <section className="admin-application-filter-section">
      <div className="admin-application-filter-main-container">
        <form className="admin-application-filter-form" onSubmit={filterButtonHandler}>
          <div className="admin-application-filter-form-inputs">
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-application-id-input">
                Application ID
              </label>
              <input id="application-filter-application-id-input" type="text" ref={idRef}/>
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-vacancy-id-input">
                Vacancy ID
              </label>
              <input id="application-filter-vacancy-id-input" type="text" ref={vacancyIdRef}/>
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-vacancy-name-input">
                Vacancy nane
              </label>
              <input id="application-filter-vacancy-name-input" type="text" ref={vacancyIdRef}/>
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-company-input">Company</label>
              <input id="application-filter-company-input" type="text" ref={companyRef}/>
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-user-id-input">User ID</label>
              <input id="application-filter-user-id-input" type="text" ref={userIdRef}/>
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-first-name-input">
                First Name
              </label>
              <input id="application-filter-first-name-input" type="text" ref={firstNameRef}/>
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-last-name-input">
                Last Name
              </label>
              <input id="application-filter-last-name-input" type="text" ref={lastNameRef}/>
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-phone-input">Phone</label>
              <input id="application-filter-phone-input" type="text" ref={phoneRef}/>
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-email-input">Email</label>
              <input id="application-filter-email-input" type="text" ref={emailRef}/>
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-status-input">Status</label>
              <input id="application-filter-status-input" type="text" ref={statusRef}/>
            </div>
          </div>

          <div className="admin-applications-form-controls">
            <button
              className="applications-filter-button-general button-common button-common-color1"
                onClick={filterButtonHandler}
            >
              Filter <img src={filterIcon} alt="" height="14px" />
            </button>
            <div>
              <p>on Page: 10</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
