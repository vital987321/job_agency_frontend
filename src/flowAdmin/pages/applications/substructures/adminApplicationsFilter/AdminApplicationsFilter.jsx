import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styles from "../../../../../commonItems/css/adminListItemsFilter.module.css";
import { ADMIN_LIST_ITEMS_LIMIT_DEFAULT } from "../../../../../data/constants";
import { useSearchParams } from "react-router-dom";
import { AdminFilterControls } from "../../../../../commonItems/features/adminFilterControls/AdminFilterControls";

export const AdminApplicatiosFilter = () => {
  //* Refs
  const idRef = useRef();
  const vacancyIdRef = useRef();
  const emailRef = useRef();
  const statusRef = useRef();
  const vacancyNameRef = useRef();
  const companyRef = useRef();
  const userIdRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();

  //* States
  let listItemsOnPage = localStorage.getItem("AdminListItemsOnPage");
  const [onPageListItems, setOnPageListItems] = useState(
    listItemsOnPage ? listItemsOnPage : ADMIN_LIST_ITEMS_LIMIT_DEFAULT
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayResetFilterButton, setDisplayResetFilterButton]=useState(false)

  //* Hooks
  const navigate = useNavigate();

  //* useEffects
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
      setDisplayResetFilterButton(true)
    else 
      setDisplayResetFilterButton(false)
  }, [searchParams]);

  //* Functions
  const changeOnPageListItemsLimit = (e) => {
    localStorage.setItem("AdminListItemsOnPage", e.target.value);
    setOnPageListItems(e.target.value);
  };

  const buildFilterQueryString = () => {
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
    return queryString;
  };

  const filterButtonHandler = () => {
    navigate("" + buildFilterQueryString());
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

  //* Main Body
  return (
    <section className={styles["admin-list-items-filter-section"]}>
      <div className={styles["admin-list-items-filter-main-container"]}>
        <form
          className={styles["admin-list-items-filter-form"]}
          onSubmit={filterFormSubmitHandler}
        >
          <div className={styles["admin-list-items-filter-form-inputs"]}>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="admin-list-items-filter-application-id-input">
                Application ID
              </label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="application-filter-application-id-input"
                type="text"
                ref={idRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="application-filter-vacancy-id-input">
                Vacancy ID
              </label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="application-filter-vacancy-id-input"
                type="text"
                ref={vacancyIdRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="application-filter-vacancy-name-input">
                Vacancy name
              </label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="application-filter-vacancy-name-input"
                type="text"
                ref={vacancyNameRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="application-filter-company-input">Company</label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="application-filter-company-input"
                type="text"
                ref={companyRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="application-filter-user-id-input">User ID</label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="application-filter-user-id-input"
                type="text"
                ref={userIdRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="application-filter-first-name-input">
                First Name
              </label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="application-filter-first-name-input"
                type="text"
                ref={firstNameRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="application-filter-last-name-input">
                Last Name
              </label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="application-filter-last-name-input"
                type="text"
                ref={lastNameRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="application-filter-phone-input">Phone</label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="application-filter-phone-input"
                type="text"
                ref={phoneRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="application-filter-email-input">Email</label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="application-filter-email-input"
                type="text"
                ref={emailRef}
              />
            </div>

            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="application-filter-status-select">Status</label>
              <select
                className={styles["admin-list-items-filter-input"]}
                id="application-filter-status-select"
                ref={statusRef}
              >
                <option value=""></option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <AdminFilterControls
            filterButtonHandler={filterButtonHandler}
            displayResetFilterButton={displayResetFilterButton}
            resetFiltersHandler={resetFiltersHandler}
            onPageListItemsAmount={onPageListItems}
            onChangeListItemsAmount={changeOnPageListItemsLimit}
          />
        </form>
      </div>
    </section>
  );
};
