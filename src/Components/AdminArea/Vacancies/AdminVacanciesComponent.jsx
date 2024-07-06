
import { AdminVacancyFormComponent } from "./AdminVacancyFormComponent";
// import { AdminVacancyFilterComponent } from "./AdminVacancyFilterComponent";
import { AdminVacanciesListComponent } from "./AdminVacanciesListComponent.jsx";
import { AdminVacanciesFilterComponent } from "./AdminVacanciesFilterComponentNew";
import searchIcon from "../../../svg/search.svg";
import closeIcon from "../../../svg/X.svg";
import filterIcon from "../../../svg/settings.svg";
import "../../../css/adminArea/adminVacancies.css";
import React from "react";
import {
  LIST_VACANCIES_BASE_URL,
  VACANCY_LIST_LIMIT,
} from "../../../constants.js";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export const AdminVacanciesComponent = (props) => {
  const [vacancyFormDisplayValue, setVacancyFormDisplayValue] =
    useState("none");
  const [vacanciesResponseData, setVacanciesResponseData] = useState({});
  const [vacancyFilterDisplayValue, setVacancyFilterDisplayValue] =
    useState("none");
  const [adminListVacanciesRequestUrl, setAdminListVacanciesRequestUrl] = useState(
    LIST_VACANCIES_BASE_URL
  );
  const [vacancyListChangedState, setVacancyListChangedState] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const newVacancyButtonHandler = () => {
    setVacancyFormDisplayValue("block");
  };

  const filterButtonHandler = () => {
    setVacancyFilterDisplayValue("flex");
  };

const paginationButtonHandler = (e) => {
  const paginationDirection =
    e.target.id === "previousVacanciesButton" ? "previous" : "next";
  navigate("?" + getQueryString(vacanciesResponseData[paginationDirection]));
};

  const getQueryString = (urlString) => {
    if (urlString) {
      const queryString = urlString.split("?")[1];
      if (queryString) {
        return queryString;
      }
    }
    return "";
  };

  const generateListVacanciesRequestURL = () => {
    return (
      LIST_VACANCIES_BASE_URL + "?" + generateListVacanciesRequestQueryString()
    );
  };

  const generateListVacanciesRequestQueryString = (offset) => {
    let qstr = "";
    qstr += searchParams.get("limit")
      ? "limit=" + searchParams.get("limit")
      : "limit=" + VACANCY_LIST_LIMIT;
    if (isNaN(offset)) {
      qstr += searchParams.get("offset")
        ? "&offset=" + searchParams.get("offset")
        : "&offset=0";
    } else {
      qstr += "&offset=" + offset;
    }
    qstr += searchParams.get("vacancyId")
      ? "&vacancyId=" + searchParams.get("vacancyId")
      : "";
    qstr += searchParams.get("vacancy_name")
      ? "&vacancy_name=" + searchParams.get("vacancy_name")
      : "";
    // qstr += searchParams.get("salary_lte")
    //   ? "&salary_lte=" + searchParams.get("salary_lte")
    //   : "";
    qstr += searchParams.get("salaryMin")
      ? "&salaryMin=" + searchParams.get("salaryMin")
      : "";
    qstr += searchParams.get("salaryMax")
      ? "&salaryMax=" + searchParams.get("salaryMax")
      : "";
    qstr += searchParams.get("company")
      ? "&company=" + searchParams.get("company")
      : "";
    qstr += searchParams.get("sector")
      ? "&sector=" + searchParams.get("sector")
      : "";
      qstr += searchParams.get("residanceType")
      ? "&residanceType=" + searchParams.get("residanceType")
      : "";
      qstr += searchParams.get("location")
      ? "&location=" + searchParams.get("location")
      : "";
      qstr += searchParams.get("active")
      ? "&active=" + searchParams.get("active")
      : "";

    return qstr;
  };

  const updateAdminListVacanciesRequestURL = () => {
    const updatedURL = generateListVacanciesRequestURL();
    if (updatedURL !== adminListVacanciesRequestUrl) {
      setAdminListVacanciesRequestUrl(updatedURL);
    }
  };

  updateAdminListVacanciesRequestURL();

const PaginationNumberedLinks = () => {
  const vacanciesTotalNumber = vacanciesResponseData.count;
  if (vacanciesTotalNumber > VACANCY_LIST_LIMIT) {
    let paginationArray = new Array();
    const currentOffset = searchParams.get("offset")
      ? searchParams.get("offset")
      : "0";
    const currentPaginationNumber =
      Math.floor(currentOffset / VACANCY_LIST_LIMIT) + 1;
    const minPaginationNumber = Math.max(1, currentPaginationNumber - 3);
    const maxPaginationNumber = Math.min(
      currentPaginationNumber + 3,
      Math.ceil(vacanciesTotalNumber / VACANCY_LIST_LIMIT)
    );

    for (let i = minPaginationNumber; i <= maxPaginationNumber; i++) {
      paginationArray.push(i);
    }
    return (
      <>
        {paginationArray.map((item) => {
          return (
            <a
              key={item}
              className={
                "vacancies-pagination-link" +
                (item == currentPaginationNumber
                  ? " current-vacancy-pagination-link"
                  : "")
              }
              href={
                "?" +
                generateListVacanciesRequestQueryString(
                  (item - 1) * VACANCY_LIST_LIMIT
                )
              }
            >
              {item}
            </a>
          );
        })}
      </>
    );
  }
  return "";
};

  const resetFiltersHandler = () => {
    navigate("");
  };

  const ResetFiltersComponent = () => {
    if (searchParams.size > 0) {
      return (
        <button
          className="vacancy-filter-button-general cancel-filter-button button-common button-common-color3"
          onClick={resetFiltersHandler}
        >
          Reset Filters
          <img src={closeIcon} alt="" height="14px" />
        </button>
      );
    }
  };



  return (
    <div className="admin-vacancies-container">
      <section className="admin-vacancies-tools-section">
        {/* <AdminVacancyFilterComponent
          vacancyFilterDisplayValue={vacancyFilterDisplayValue}
          setVacancyFilterDisplayValue={setVacancyFilterDisplayValue}
          listVacanciesBaseUrl={LIST_VACANCIES_BASE_URL}
          setListVacanciesRequestUrl={setListVacanciesRequestUrl}
          generateListVacanciesRequestURL={generateListVacanciesRequestURL}
          searchParams={searchParams}
        /> */}
        <AdminVacanciesFilterComponent
          // setListVacanciesRequestUrl={setListVacanciesRequestUrl}
        />

        <div className="new-vacancy-button-container">
          <button
            className="button-common button-common-color1 add-new-vacancy-button"
            onClick={newVacancyButtonHandler}
          >
            Add new vacancy
          </button>
        </div>
      </section>

      <section className="admin-vacancies-main-section">
        <button
          className="vacancy-filter-button-general vacancies-filter-button button-common button-common-color1"
          onClick={filterButtonHandler}
        >
          Filter <img src={filterIcon} alt="" height="14px" />
        </button>
        <ResetFiltersComponent />
        <h2 className="h2-main-header h2-common">Vacancies</h2>
        <AdminVacanciesListComponent
          adminListVacanciesRequestUrl={adminListVacanciesRequestUrl}
          setVacanciesResponseData={setVacanciesResponseData}
          vacancyListChangedState={props.vacancyListChangedState}
        />
        <section className="vacancies-pagination-section">
          <div className="vacancies-pagination-previous-container">
            {(() => {
              if (vacanciesResponseData.previous !== null)
                return (
                  <button
                    id="previousVacanciesButton"
                    className="vacancies-pagination-button"
                    onClick={paginationButtonHandler}
                  >
                    {"<"} Previous
                  </button>
                );
            })()}
          </div>

          <PaginationNumberedLinks />

          <div className="vacancies-pagination-previous-container">
            {(() => {
              if (vacanciesResponseData.next !== null)
                return (
                  <button
                    className="vacancies-pagination-button"
                    id="nextVacanciesButton"
                    onClick={paginationButtonHandler}
                  >
                    Next {">"}
                  </button>
                );
            })()}
          </div>
        </section>
      </section>

      {/* <VacanciesComponent vacancyListChangedState={vacancyListChangedState} /> */}
      <AdminVacancyFormComponent
        vacancyData=""
        setVacancyFormDisplayValue={setVacancyFormDisplayValue}
        vacancyFormDisplayValue={vacancyFormDisplayValue}
        newVacancy={true}
        setVacancyListChangedState={setVacancyListChangedState}
      />
    </div>
  );
};
