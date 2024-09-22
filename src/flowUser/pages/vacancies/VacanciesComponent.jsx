import React, { useEffect, useState } from "react";
import styles from "./vacancies.module.css";
import {
  LIST_VACANCIES_BASE_URL,
  USER_LIST_ITEMS_LIMIT,
} from "../../../data/constants.js";
import filterIcon from "../../../assets/svg/settings.svg";
import { ListVacanciesComponent } from "../../../commonItems/features/listVacancies/ListVacanciesComponent.jsx";
import { VacancyFilterComponent } from "./substructures/VacancyFilter/VacancyFilterComponent.jsx";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ButtonType1 } from "../../../commonItems/components/buttons/buttonType1/ButtonType1.jsx";
import { PaginationComponent } from "../../../commonItems/features/pagination/Pagination.jsx";
import { generateRequestQueryString } from "../../../services/utils/generateRequestQueryString.js";
import { ResetFiltersButton } from "./substructures/resetFIlterButton/resetFilterButton.jsx";

export const VacanciesComponent = () => {
  //* States
  const [vacancyFilterDisplayValue, setVacancyFilterDisplayValue] =
    useState("none");
  const [listVacanciesRequestUrl, setListVacanciesRequestUrl] = useState(
    LIST_VACANCIES_BASE_URL
  );
  const [currentClientUrl, setCurrentClientUrl] = useState(
    window.location.href
  );
  const [vacanciesResponseData, setVacanciesResponseData] = useState({});

  //* Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  //* useEffects
  useEffect(() => {
    // This hook is nesessary due to filter
    setCurrentClientUrl(window.location.href);
  }, [window.location.href]);

  useEffect(() => {
    if (currentClientUrl !== window.location.href) {
      const params = new URL(currentClientUrl).searchParams;
      navigate(`/vacancies?${params.toString()}`);
    }
  }, [currentClientUrl]);

  //* Functions
  const filterButtonHandler = () => {
    setVacancyFilterDisplayValue("flex");
  };

  const generateListVacanciesRequestURL = () => {
    return (
      LIST_VACANCIES_BASE_URL +
      "?" +
      generateRequestQueryString(searchParams, USER_LIST_ITEMS_LIMIT)
    );
  };

  const updateListVacanciesRequestURL = () => {
    const updatedURL = generateListVacanciesRequestURL();
    if (updatedURL !== listVacanciesRequestUrl) {
      setListVacanciesRequestUrl(updatedURL);
    }
  };

  //* Main Body
  updateListVacanciesRequestURL();
  return (
    <div className={styles["vacancies-container"]}>
      <ButtonType1
        value={
          <span>
            Filter{" "}
            <img
              className={styles["vacancy-in-button-icon"]}
              src={filterIcon}
              alt=""
              height="14px"
            />{" "}
          </span>
        }
        onClickHandler={filterButtonHandler}
        strength="1"
      />
      <ResetFiltersButton />
      <h2 className="h2-common">Vacancies</h2>
      <ListVacanciesComponent
        listVacanciesRequestUrl={listVacanciesRequestUrl}
        setVacanciesResponseData={setVacanciesResponseData}
      />
      <PaginationComponent
        responseData={vacanciesResponseData}
        listItemsLimit={USER_LIST_ITEMS_LIMIT}
        paginationClass={styles["vacancies-pagination-section"]}
        urlState={currentClientUrl}
        setUrlState={setCurrentClientUrl}
      />
      <VacancyFilterComponent
        vacancyFilterDisplayValue={vacancyFilterDisplayValue}
        setVacancyFilterDisplayValue={setVacancyFilterDisplayValue}
        listVacanciesBaseUrl={LIST_VACANCIES_BASE_URL}
        setListVacanciesRequestUrl={setListVacanciesRequestUrl}
        generateListVacanciesRequestURL={generateListVacanciesRequestURL}
        searchParams={searchParams}
      />
    </div>
  );
};
