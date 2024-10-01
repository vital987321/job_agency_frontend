import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../../../../../commonItems/css/adminListItemsFilter.module.css";
import { ADMIN_LIST_ITEMS_LIMIT_DEFAULT } from "../../../../../data/constants";
import { useSearchParams } from "react-router-dom";
import { RESIDENCE_TYPES } from "../../../../../data/constants";
import { AdminFilterControls } from "../../../../../commonItems/features/adminFilterControls/AdminFilterControls";

export const AdminVacanciesFilter = () => {

  //* Refs
  const vacancyIdRef = React.createRef();
  const locationRef = React.createRef();
  const activeRef = React.createRef();
  const vacancyNameRef = React.createRef();
  const companyRef = React.createRef();
  const salaryMinRef = React.createRef();
  const salaryMaxRef = React.createRef();
  const sectorRef = React.createRef();
  const residanceTypeRef = React.createRef();

  //* Variavles
  let listItemsOnPage = localStorage.getItem("AdminListItemsOnPage");

  //* States
  const [onPageListItems, setOnPageListItems] = useState(
    listItemsOnPage ? listItemsOnPage : ADMIN_LIST_ITEMS_LIMIT_DEFAULT
  );
  const [resetFiltersButtonDisplayValue, setResetFiltersButtonDisplayValue] =
    useState("none");
  const [activeSelection, setActiveSelection] = useState("");
  
  //* Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  //* UseEffects
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
    const id = vacancyIdRef.current.value;
    const location = locationRef.current.value;
    const name = vacancyNameRef.current.value;
    const company = companyRef.current.value;
    const salary_gte = salaryMinRef.current.value;
    const salary_lte = salaryMaxRef.current.value;
    const sector = sectorRef.current.value;
    const residence_type = residanceTypeRef.current.value;
    const active = activeRef.current.value;

    let queryStringArray = [];
    let queryString = "";

    if (onPageListItems) queryStringArray.push("limit=" + onPageListItems);
    if (location) queryStringArray.push("location=" + location);
    if (["all", "deactivated"].includes(active))
      queryStringArray.push("active=" + active);
    if (id) queryStringArray.push("id=" + id);
    if (name) queryStringArray.push("name=" + name);
    if (company) queryStringArray.push("company=" + company);
    if (salary_gte) queryStringArray.push("salary_gte=" + salary_gte);
    if (salary_lte) queryStringArray.push("salary_lte=" + salary_lte);
    if (sector) queryStringArray.push("sector=" + sector);
    if (residence_type)
      queryStringArray.push("residence_type=" + residence_type);

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
    vacancyIdRef.current.value = "";
    locationRef.current.value = "";
    activeRef.current.value = "";
    vacancyNameRef.current.value = "";
    companyRef.current.value = "";
    salaryMinRef.current.value = "";
    salaryMaxRef.current.value = "";
    sectorRef.current.value = "";
    residanceTypeRef.current.value = "";
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
              <label htmlFor="vacancies-filter-vacancy-id-input">
                Vacancy ID
              </label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="vacancies-filter-vacancy-id-input"
                type="text"
                ref={vacancyIdRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="vacancies-filter-vacancy-name-input">
                Vacancy name
              </label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="vacancies-filter-vacancy-name-input"
                type="text"
                ref={vacancyNameRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="vacancies-filter-salary-min-input">
                Salary min
              </label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="vacancies-filter-salary-min-input"
                type="text"
                ref={salaryMinRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="vacancies-filter-salary-max-input">
                Salary max
              </label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="vacancies-filter-salary-max-input"
                type="text"
                ref={salaryMaxRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="vacancies-filter-first-company-input">
                Company
              </label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="vacancies-filter-first-company-input"
                type="text"
                ref={companyRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="vacancies-filter-sector-input">Sector</label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="vacancies-filter-sector-input"
                type="text"
                ref={sectorRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="vacancies-filter-residence-type-input">
                Residence
              </label>
              <select
                className={styles["admin-list-items-filter-input"]}
                id="vacancies-filter-residence-type-input"
                // defaultValue={props.searchParams.get("residence_type")}
                ref={residanceTypeRef}
              >
                <option value=""></option>
                {Object.keys(RESIDENCE_TYPES).map((objectKey, index) => {
                  return (
                    <option key={objectKey} value={objectKey}>
                      {RESIDENCE_TYPES[objectKey]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="vacancies-filter-location-input">Location</label>
              <input
                className={styles["admin-list-items-filter-input"]}
                id="vacancies-filter-location-input"
                type="text"
                ref={locationRef}
              />
            </div>
            <div className={styles["admin-list-items-filter-input-container"]}>
              <label htmlFor="vacancies-filter-active-input">Active</label>
              <select
                className={styles["admin-list-items-filter-input"]}
                id="vacancies-filter-active-input"
                ref={activeRef}
              >
                {/*<option value=""></option>*/}
                <option value="active">Active</option>
                <option value="deactivated">Deactivated</option>
                <option value="all">All</option>
              </select>
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
