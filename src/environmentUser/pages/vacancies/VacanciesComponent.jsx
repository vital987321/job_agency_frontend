import React, { useEffect, useState } from "react";
import "../../../css/commonElements.css";
import "./vacancies.css";
import {
  LIST_VACANCIES_BASE_URL,
  VACANCY_LIST_LIMIT,
} from "../../../data/constants.js";
import filterIcon from "../../../assets/svg/settings.svg";
import { ListVacanciesComponent } from "../../components/listVacancies/ListVacanciesComponent.jsx";
import { VacancyFilterComponent } from "./context/VacancyFilter/VacancyFilterComponent.jsx";
import { useSearchParams, useNavigate} from "react-router-dom";
import closeIcon from "../../../assets/svg/X.svg";
import { ButtonType1 } from "../../../environmentCommon/components/buttons/buttonType1/ButtonType1.jsx";
import { PaginationComponent } from "../../../environmentCommon/features/pagination/Pagination.jsx";
import { generateRequestQueryString } from "../../../services/utils/generateRequestQueryString.js";

export const VacanciesComponent = (props) => {
  const [vacancyFilterDisplayValue, setVacancyFilterDisplayValue] =
    useState("none");
  const [listVacanciesRequestUrl, setListVacanciesRequestUrl] = useState(
    LIST_VACANCIES_BASE_URL
  );
  const [vacanciesResponseData, setVacanciesResponseData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const filterButtonHandler = () => {
    setVacancyFilterDisplayValue("flex");
  };

  const generateListVacanciesRequestURL = () => {
    return (
      // LIST_VACANCIES_BASE_URL + "?" + generateListVacanciesRequestQueryString()
      LIST_VACANCIES_BASE_URL + "?" + generateRequestQueryString(searchParams, VACANCY_LIST_LIMIT)
    );
  };


  const updateListVacanciesRequestURL = () => {
    const updatedURL = generateListVacanciesRequestURL();
    if (updatedURL !== listVacanciesRequestUrl) {
      setListVacanciesRequestUrl(updatedURL);
    }
  };

  updateListVacanciesRequestURL();

  const resetFiltersHandler = () => {
    navigate("");
  };

  const ResetFiltersComponent = () => {
    if (searchParams.has("key_search") ||
    searchParams.has("salary_gte") ||
    searchParams.has("salary_lte") ||
    searchParams.has("location") ||
    searchParams.has("residence_type") ) {
      return (
        <div className="reset-filter-button-container">
          <ButtonType1
            value={<span>Reset Filters <img className="vacancy-in-button-icon" src={closeIcon} alt="" height="14px" /></span>}
            onClickHandler={resetFiltersHandler}
            strength='3'
          />
        </div>
      );
    }
  };

  return (
    <div className="vacancies-container">
      <ButtonType1
        value={<span>Filter <img className="vacancy-in-button-icon" src={filterIcon} alt="" height="14px" /> </span>}
        onClickHandler={filterButtonHandler}
        strength='1'
      />

      <ResetFiltersComponent />
      <h2 className="h2-main-header h2-common">Vacancies</h2>
      <ListVacanciesComponent
        listVacanciesRequestUrl={listVacanciesRequestUrl}
        setVacanciesResponseData={setVacanciesResponseData}
        vacancyListChangedState={props.vacancyListChangedState}
      />
      <PaginationComponent 
        responseData={vacanciesResponseData}
        listItemsLimit={VACANCY_LIST_LIMIT}
        paginationClass='vacancies-pagination-section'
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
