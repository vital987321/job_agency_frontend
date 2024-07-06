import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import "../../../css/adminArea/adminApplicationsFilter.css";
import filterIcon from "../../../svg/settings.svg";
import { ADMIN_APPLICATION_LIST_LIMIT_DEFAULT } from "../../../constants";
import closeIcon from "../../../svg/X.svg";
import { useSearchParams } from "react-router-dom";

const vacancyIdRef = React.createRef();
const locationRef = React.createRef();
const activeRef = React.createRef();
const vacancyNameRef = React.createRef();
const companyRef = React.createRef();
const salaryMinRef = React.createRef();
const salaryMaxRef = React.createRef();
const sectorRef = React.createRef();
const residanceTypeRef = React.createRef();

export const AdminVacanciesFilterComponent = () => {
  let ApplicationsOnPage = localStorage.getItem("ApplicationsOnPage");
  const [onPageApplications, setOnPageApplications] = useState(
    ApplicationsOnPage
      ? ApplicationsOnPage
      : ADMIN_APPLICATION_LIST_LIMIT_DEFAULT
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

  const changeOpPageApplicationsLimit = (e) => {
    localStorage.setItem("ApplicationsOnPage", e.target.value);
    setOnPageApplications(e.target.value);
  };

  const buildFilterQueryString = () => {
    const vacancyId = vacancyIdRef.current.value;
    const location = locationRef.current.value;
    const active = activeRef.current.value;
    const vacancyName = vacancyNameRef.current.value;
    const company = companyRef.current.value;
    const salaryMin = salaryMinRef.current.value;
    const salaryMax = salaryMaxRef.current.value;
    const sector = sectorRef.current.value;
    const residanceType = residanceTypeRef.current.value;

    let queryStringArray = [];
    let queryString = "";

    if (onPageApplications)
      queryStringArray.push("limit=" + onPageApplications);
    if (location) queryStringArray.push("location=" + location);
    if (active) queryStringArray.push("active=" + active);
    if (vacancyId) queryStringArray.push("vacancyId=" + vacancyId);
    if (vacancyName) queryStringArray.push("vacancy_name=" + vacancyName);
    if (company) queryStringArray.push("company=" + company);
    if (salaryMin) queryStringArray.push("salaryMin=" + salaryMin);
    if (salaryMax) queryStringArray.push("salaryMax=" + salaryMax);
    if (sector) queryStringArray.push("sector=" + sector);
    if (residanceType) queryStringArray.push("residanceType=" + residanceType);

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

  const vacancyIdRef = React.createRef();
  const locationRef = React.createRef();
  const activeRef = React.createRef();
  const vacancyNameRef = React.createRef();
  const companyRef = React.createRef();
  const salaryMinRef = React.createRef();
  const salaryMaxRef = React.createRef();
  const sectorRef = React.createRef();
  const residanceTypeRef = React.createRef();

  return (
    <section className="admin-application-filter-section">
      <div className="admin-application-filter-main-container">
        <form
          className="admin-application-filter-form"
          onSubmit={filterFormSubmitHandler}
        >
          <div className="admin-application-filter-form-inputs">
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-vacancy-id-input">
                Vacancy ID
              </label>
              <input
                className="application-filter-input"
                id="application-filter-vacancy-id-input"
                type="text"
                ref={vacancyIdRef}
              />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-vacancy-name-input">
                Vacancy name
              </label>
              <input
                className="application-filter-input"
                id="application-filter-vacancy-name-input"
                type="text"
                ref={vacancyNameRef}
              />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-salary-min-input">
                Salary min
              </label>
              <input
                className="application-filter-input"
                id="application-filter-salary-min-input"
                type="text"
                ref={salaryMinRef}
              />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-salary-max-input">
                Salary max
              </label>
              <input
                className="application-filter-input"
                id="application-filter-salary-max-input"
                type="text"
                ref={salaryMaxRef}
              />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-first-company-input">
                Company
              </label>
              <input
                className="application-filter-input"
                id="application-filter-first-company-input"
                type="text"
                ref={companyRef}
              />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-sector-input">Sector</label>
              <input
                className="application-filter-input"
                id="application-filter-sector-input"
                type="text"
                ref={sectorRef}
              />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-residence-type-input">
                Residence
              </label>
              <input
                className="application-filter-input"
                id="application-filter-residence-type-input"
                type="text"
                ref={residanceTypeRef}
              />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-location-input">
                Location
              </label>
              <input
                className="application-filter-input"
                id="application-filter-location-input"
                type="text"
                ref={locationRef}
              />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-active-input">Active</label>
              <input
                className="application-filter-input"
                id="application-filter-active-input"
                type="text"
                ref={activeRef}
              />
            </div>
          </div>

          <div className="admin-applications-form-controls">
            <div className="admin-applications-form-buttons-container">
              <button
                className="applications-filter-button-general button-common button-common-color1"
                onClick={filterButtonHandler}
              >
                Filter <img src={filterIcon} alt="" height="14px" />
              </button>

              <button
                className="applications-filter-button-general button-common button-common-color2"
                id="admin-applications-reset-filters-button"
                onClick={resetFiltersHandler}
                style={{ display: resetFiltersButtonDisplayValue }}
              >
                Reset Filters <img src={closeIcon} alt="" height="14px" />
              </button>
            </div>

            <div className="application-filter-input-container">
              <label htmlFor="application-filter-status-input">on Page</label>
              <select
                className="application-filter-input"
                id="applicaption-filter-on-page-input"
                value={onPageApplications}
                onChange={changeOpPageApplicationsLimit}
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