import styles from "../../../../../commonItems/css/adminListItemsFilter.module.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ADMIN_LIST_ITEMS_LIMIT_DEFAULT } from "../../../../../data/constants";
import { AdminFilterControls } from "../../../../../commonItems/features/adminFilterControls/adminFilterControls";

export const PartnerFilter = () => {
  //* Variables
  let listItemsOnPage = localStorage.getItem("AdminListItemsOnPage");

  //* Refs
  const companyRef = useRef();
  const hrSpecialistRef = useRef();
  const phoneRef = useRef();

  //* States
  const [onPageListItems, setOnPageListItems] = useState(
    listItemsOnPage ? listItemsOnPage : ADMIN_LIST_ITEMS_LIMIT_DEFAULT
  );
  const [resetFiltersButtonDisplayValue, setResetFiltersButtonDisplayValue] =
    useState("none");

  //* Hooks
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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
      setResetFiltersButtonDisplayValue("inline-block");
    else setResetFiltersButtonDisplayValue("none");
  }, [searchParams]);

  //* Functions
  const changeOnPageListItemsLimit = (e) => {
    localStorage.setItem("AdminListItemsOnPage", e.target.value);
    setOnPageListItems(e.target.value);
  };

  const buildFilterQueryString = () => {
    const company = companyRef.current.value;
    const hrSpecialist = hrSpecialistRef.current.value;
    const phone = phoneRef.current.value;
    let queryStringArray = [];
    let queryString = "";
    if (onPageListItems) queryStringArray.push("limit=" + onPageListItems);
    if (company) queryStringArray.push("company=" + company);
    if (hrSpecialist) queryStringArray.push("hr_name=" + hrSpecialist);
    if (phone) queryStringArray.push("phone=" + phone);
    if (queryStringArray.length > 0) {
      queryString = "?" + queryStringArray.join("&");
    }
    return queryString;
  };

  const filterButtonHandler = (e) => {
    navigate("" + buildFilterQueryString());
  };

  const filterFormSubmitHandler = (e) => {
    e.preventDefault();
    filterButtonHandler();
  };

  const resetFiltersHandler = (e) => {
    e.preventDefault();
    companyRef.current.value = "";
    hrSpecialistRef.current.value = "";
    phoneRef.current.value = "";
    navigate("");
  };

  //* Main Body
  return (
    <section className={styles["admin-list-items-filter-section"]}>
      <div className={styles["admin-list-items-filter-main-container"]}>
        <form onSubmit={filterFormSubmitHandler}>
          <div className={styles["admin-list-items-filter-form-inputs"]}>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="partner-filter-company-input">Company</label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="partner-filter-company-input"
                type="text"
                ref={companyRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="partner-filter-hr-specialist-input">
                HR Specialist
              </label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="partner-filter-hr-specialist-input"
                type="text"
                ref={hrSpecialistRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="review-filter-phone-input">Phone</label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="partner-filter-phone-input"
                type="text"
                ref={phoneRef}
              />
            </div>
          </div>

          <AdminFilterControls
            filterButtonHandler={filterButtonHandler}
            resetFiltersButtonDisplayValue={resetFiltersButtonDisplayValue}
            resetFiltersHandler={resetFiltersHandler}
            onPageListItemsAmount={onPageListItems}
            onChangeListItemsAmount={changeOnPageListItemsLimit}
          />
        </form>
      </div>
    </section>
  );
};
