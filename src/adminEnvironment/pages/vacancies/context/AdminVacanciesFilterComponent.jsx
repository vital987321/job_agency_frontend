import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import "../../../../css/adminArea/adminListItemsFilter.css";
import filterIcon from "../../../../assets/svg/settings.svg";
import { ADMIN_LIST_ITEMS_LIMIT_DEFAULT } from "../../../../data/constants";
import closeIcon from "../../../../assets/svg/X.svg";
import { useSearchParams } from "react-router-dom";
import { RESIDENCE_TYPES } from "../../../../data/constants";

export const AdminVacanciesFilterComponent = () => {
  const vacancyIdRef = React.createRef();
  const locationRef = React.createRef();
  const activeRef = React.createRef();
  const vacancyNameRef = React.createRef();
  const companyRef = React.createRef();
  const salaryMinRef = React.createRef();
  const salaryMaxRef = React.createRef();
  const sectorRef = React.createRef();
  const residanceTypeRef = React.createRef();

  let listItemsOnPage = localStorage.getItem("AdminListItemsOnPage");
  const [onPageListItems, setOnPageListItems] = useState(
    listItemsOnPage ? listItemsOnPage : ADMIN_LIST_ITEMS_LIMIT_DEFAULT
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetFiltersButtonDisplayValue, setResetFiltersButtonDisplayValue] =
    useState("none");
  const [activeSelection, setActiveSelection] = useState("");

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

  const changeOpPageListItemsLimit = (e) => {
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

  return (
    <section className="admin-list-items-filter-section">
      <div className="admin-list-items-filter-main-container">
        <form
          className="admin-list-items-filter-form"
          onSubmit={filterFormSubmitHandler}
        >
          <div className="admin-list-items-filter-form-inputs">
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="vacancies-filter-vacancy-id-input">
                Vacancy ID
              </label>
              <input
                className="admin-list-items-filter-input"
                id="vacancies-filter-vacancy-id-input"
                type="text"
                ref={vacancyIdRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="vacancies-filter-vacancy-name-input">
                Vacancy name
              </label>
              <input
                className="admin-list-items-filter-input"
                id="vacancies-filter-vacancy-name-input"
                type="text"
                ref={vacancyNameRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="vacancies-filter-salary-min-input">
                Salary min
              </label>
              <input
                className="admin-list-items-filter-input"
                id="vacancies-filter-salary-min-input"
                type="text"
                ref={salaryMinRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="vacancies-filter-salary-max-input">
                Salary max
              </label>
              <input
                className="admin-list-items-filter-input"
                id="vacancies-filter-salary-max-input"
                type="text"
                ref={salaryMaxRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="vacancies-filter-first-company-input">
                Company
              </label>
              <input
                className="admin-list-items-filter-input"
                id="vacancies-filter-first-company-input"
                type="text"
                ref={companyRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="vacancies-filter-sector-input">Sector</label>
              <input
                className="admin-list-items-filter-input"
                id="vacancies-filter-sector-input"
                type="text"
                ref={sectorRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="vacancies-filter-residence-type-input">
                Residence
              </label>
              <select
                className="admin-list-items-filter-input"
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
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="vacancies-filter-location-input">Location</label>
              <input
                className="admin-list-items-filter-input"
                id="vacancies-filter-location-input"
                type="text"
                ref={locationRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="vacancies-filter-active-input">Active</label>
              <select
                className="admin-list-items-filter-input"
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

          <div className="admin-list-items-form-controls">
            <div className="admin-list-items-form-buttons-container">
              <button
                className="button-common button-common-color1"
                onClick={filterButtonHandler}
              >
                Filter <img src={filterIcon} alt="" height="14px" />
              </button>

              <button
                className="vacancies-filter-button-general button-common button-common-color2 reset-filters-button"
                id="admin-vacancies-reset-filters-button"
                onClick={resetFiltersHandler}
                style={{ display: resetFiltersButtonDisplayValue }}
              >
                Reset Filters <img src={closeIcon} alt="" height="14px" />
              </button>
            </div>

            <div>
              <label htmlFor="vacancies-filter-status-input">on Page</label>
              <select
                className="admin-list-items-filter-input admin-list-items-filter-on-page-input"
                id="vacancies-filter-on-page-input"
                value={onPageListItems}
                onChange={changeOpPageListItemsLimit}
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
