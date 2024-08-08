import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import "../../../../features/adminCSS/adminListItemsFilter.css";
import filterIcon from "../../../../../assets/svg/settings.svg";
import { ADMIN_LIST_ITEMS_LIMIT_DEFAULT } from "../../../../../data/constants";
import closeIcon from "../../../../../assets/svg/X.svg";
import { useSearchParams } from "react-router-dom";
import { ButtonType1 } from "../../../../../environmentCommon/components/buttons/buttonType1/ButtonType1";

const idRef = React.createRef();
const vacancyIdRef = React.createRef();
const emailRef = React.createRef();
const statusRef = React.createRef();
const vacancyNameRef = React.createRef();
const companyRef = React.createRef();
const userIdRef = React.createRef();
const firstNameRef = React.createRef();
const lastNameRef = React.createRef();
const phoneRef = React.createRef();

export const AdminApplicatiosFilterComponent = () => {
  let listItemsOnPage = localStorage.getItem("AdminListItemsOnPage");
  const [onPageListItems, setOnPageListItems] = useState(
    listItemsOnPage ? listItemsOnPage : ADMIN_LIST_ITEMS_LIMIT_DEFAULT
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetFiltersButtonDisplayValue, setResetFiltersButtonDisplayValue] =
    useState("none");

  const navigate = useNavigate();

  useEffect(() => {
    let showCancelFilterButton = false;
    if (searchParams.size > 0) {
      for (let paramKey of searchParams.keys()) {
        if (paramKey !== "limit" && paramKey !== "offset") {
          showCancelFilterButton = true;
          break;
        }
      }
    }
    if (showCancelFilterButton)
      setResetFiltersButtonDisplayValue("inline-block");
    else setResetFiltersButtonDisplayValue("none");
  }, [searchParams]);

  const changeOnPageListItemsLimit = (e) => {
    localStorage.setItem("AdminListItemsOnPage", e.target.value);
    setOnPageListItems(e.target.value);
  };

  const buildFIlterQueryString = () => {
    const id = idRef.current.value;
    const vacancyId = vacancyIdRef.current.value;
    const email = emailRef.current.value;
    const status = statusRef.current.value;
    const vacancyName = vacancyNameRef.current.value;
    const company = companyRef.current.value;
    const userId = userIdRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const phone = phoneRef.current.value;

    let queryStringArray = [];
    let queryString = "";

    if (onPageListItems) queryStringArray.push("limit=" + onPageListItems);
    if (id) queryStringArray.push("id=" + id);
    if (vacancyId) queryStringArray.push("vacancy_id=" + vacancyId);
    if (email) queryStringArray.push("email=" + email);
    if (status) queryStringArray.push("status=" + status);
    if (vacancyName) queryStringArray.push("vacancy_name=" + vacancyName);
    if (company) queryStringArray.push("company=" + company);
    if (userId) queryStringArray.push("user_id=" + userId);
    if (firstName) queryStringArray.push("first_name=" + firstName);
    if (lastName) queryStringArray.push("last_name=" + lastName);
    if (phone) queryStringArray.push("phone=" + phone);

    if (queryStringArray.length > 0) {
      queryString = "?" + queryStringArray.join("&");
    }
    // console.log('queryString:', queryString)
    return queryString;
  };

  const filterButtonHandler = () => {
    navigate("" + buildFIlterQueryString());
  };

  const filterFormSubmitHandler = (e) => {
    e.preventDefault();
    filterButtonHandler();
  };

  const resetFiltersHandler = (e) => {
    e.preventDefault();
    idRef.current.value = "";
    vacancyIdRef.current.value = "";
    emailRef.current.value = "";
    statusRef.current.value = "";
    vacancyNameRef.current.value = "";
    companyRef.current.value = "";
    userIdRef.current.value = "";
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    phoneRef.current.value = "";
    navigate("");
  };

  return (
    <section className="admin-list-items-filter-section">
      <div className="admin-list-items-filter-main-container">
        <form
          className="admin-list-items-filter-form"
          onSubmit={filterFormSubmitHandler}
        >
          <div className="admin-list-items-filter-form-inputs">
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="admin-list-items-filter-application-id-input">
                Application ID
              </label>
              <input
                className="admin-list-items-filter-input"
                id="application-filter-application-id-input"
                type="text"
                ref={idRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="application-filter-vacancy-id-input">
                Vacancy ID
              </label>
              <input
                className="admin-list-items-filter-input"
                id="application-filter-vacancy-id-input"
                type="text"
                ref={vacancyIdRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="application-filter-vacancy-name-input">
                Vacancy name
              </label>
              <input
                className="admin-list-items-filter-input"
                id="application-filter-vacancy-name-input"
                type="text"
                ref={vacancyNameRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="application-filter-company-input">Company</label>
              <input
                className="admin-list-items-filter-input"
                id="application-filter-company-input"
                type="text"
                ref={companyRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="application-filter-user-id-input">User ID</label>
              <input
                className="admin-list-items-filter-input"
                id="application-filter-user-id-input"
                type="text"
                ref={userIdRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="application-filter-first-name-input">
                First Name
              </label>
              <input
                className="admin-list-items-filter-input"
                id="application-filter-first-name-input"
                type="text"
                ref={firstNameRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="application-filter-last-name-input">
                Last Name
              </label>
              <input
                className="admin-list-items-filter-input"
                id="application-filter-last-name-input"
                type="text"
                ref={lastNameRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="application-filter-phone-input">Phone</label>
              <input
                className="admin-list-items-filter-input"
                id="application-filter-phone-input"
                type="text"
                ref={phoneRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="application-filter-email-input">Email</label>
              <input
                className="admin-list-items-filter-input"
                id="application-filter-email-input"
                type="text"
                ref={emailRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="application-filter-status-input">Status</label>
              <input
                className="admin-list-items-filter-input"
                id="application-filter-status-input"
                type="text"
                ref={statusRef}
              />
            </div>
          </div>

          <div className="admin-list-items-form-controls">
            <div className="admin-list-items-form-buttons-container">
              <ButtonType1
                value={
                  <span>
                    Filter{" "}
                    <img
                      className="admin-filter-button-icon"
                      src={filterIcon}
                      alt=""
                      height="14px"
                    />
                  </span>
                }
                onClickHandler={filterButtonHandler}
                strength="1"
              />

              <div
                className="admin-reset-filters-button-container"
                style={{ display: resetFiltersButtonDisplayValue }}
              >
                <ButtonType1
                  value={
                    <span>
                      Reset Filters{" "}
                      <img
                        className="admin-filter-button-icon"
                        src={closeIcon}
                        alt=""
                        height="14px"
                      />
                    </span>
                  }
                  onClickHandler={resetFiltersHandler}
                  strength="2"
                />
              </div>

            </div>

            <div>
              <label htmlFor="applicaption-filter-on-page-input">on Page</label>
              <select
                className="admin-list-items-filter-input admin-list-items-filter-on-page-input"
                id="applicaption-filter-on-page-input"
                value={onPageListItems}
                onChange={changeOnPageListItemsLimit}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
