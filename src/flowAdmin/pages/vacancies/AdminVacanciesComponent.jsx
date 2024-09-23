import { AdminVacancyFormComponent } from "../../../commonItems/features/vacancyForm/AdminVacancyFormComponent.jsx";
import { AdminVacanciesListComponent } from "./substructures/adminVacanciesList/AdminVacanciesListComponent.jsx";
import { AdminVacanciesFilterComponent } from "./substructures/adminVacanciesFilter/AdminVacanciesFilterComponent.jsx";
import styles from "./adminVacancies.module.css";
import React from "react";
import {
  LIST_VACANCIES_BASE_URL,
  ADMIN_LIST_ITEMS_LIMIT_DEFAULT,
} from "../../../data/constants.js";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ButtonType1 } from "../../../commonItems/components/buttons/buttonType1/ButtonType1.jsx";
import { PaginationComponent } from "../../../commonItems/features/pagination/Pagination.jsx";
import { generateRequestQueryString } from "../../../services/utils/generateRequestQueryString.js";

export const AdminVacanciesComponent = (props) => {

  //* States
  const [vacancyFormDisplayValue, setVacancyFormDisplayValue] =
    useState("none");
  const [vacanciesResponseData, setVacanciesResponseData] = useState({});
  const [adminListVacanciesRequestUrl, setAdminListVacanciesRequestUrl] =
    useState(LIST_VACANCIES_BASE_URL);
  const [vacancyListChangedState, setVacancyListChangedState] = useState({});
  const [currentClientUrl, setCurrentClientUrl] = useState(
    window.location.href
  );

  //* Hooks
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const listItemsOnPage = localStorage.getItem("AdminListItemsOnPage")
    ? localStorage.getItem("AdminListItemsOnPage")
    : ADMIN_LIST_ITEMS_LIMIT_DEFAULT;

  //* UseEffects
  useEffect(() => {
    // This hook is nesessary due to filter
    setCurrentClientUrl(window.location.href);
  }, [window.location.href]);

  useEffect(() => {
    if (currentClientUrl !== window.location.href) {
      const params = new URL(currentClientUrl).searchParams;
      navigate(`/admin/vacancies?${params.toString()}`);
    }
  }, [currentClientUrl]);


  //* Functions
  const generateListVacanciesRequestURL = () => {
    const vacanciesOnPage = localStorage.getItem("AdminListItemsOnPage")
      ? localStorage.getItem("AdminListItemsOnPage")
      : ADMIN_LIST_ITEMS_LIMIT_DEFAULT;
    return (
      LIST_VACANCIES_BASE_URL +
      "?" +
      generateRequestQueryString(searchParams, listItemsOnPage)
    );
  };

  const updateAdminListVacanciesRequestURL = () => {
    const updatedURL = generateListVacanciesRequestURL();
    if (updatedURL !== adminListVacanciesRequestUrl) {
      setAdminListVacanciesRequestUrl(updatedURL);
    }
  };

  const newVacancyButtonHandler = () => {
    setVacancyFormDisplayValue("block");
  };

  //* Main Body
  updateAdminListVacanciesRequestURL();
  return (
    <div className={styles["admin-vacancies-container"]}>
      <section>
        <AdminVacanciesFilterComponent />
        <div className={styles["new-vacancy-button-container"]}>
          <div>Found: {vacanciesResponseData.count} </div>
          <ButtonType1
            value="Add vacancy"
            onClickHandler={newVacancyButtonHandler}
            strength="1"
          />
        </div>
      </section>

      <section className={styles["admin-vacancies-list-section"]}>
        <h2 className="h2-main-header h2-common">Vacancies</h2>
        <AdminVacanciesListComponent
          adminListVacanciesRequestUrl={adminListVacanciesRequestUrl}
          setVacanciesResponseData={setVacanciesResponseData}
          vacancyListChangedState={props.vacancyListChangedState}
        />
        <PaginationComponent
          responseData={vacanciesResponseData}
          listItemsLimit={listItemsOnPage}
          paginationClass={styles["vacancies-pagination-section"]}
          urlState={currentClientUrl}
          setUrlState={setCurrentClientUrl}
        />
      </section>

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
