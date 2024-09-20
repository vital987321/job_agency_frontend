import React, { useEffect, useState } from "react";
import "./vacancies.css";
import {
  LIST_VACANCIES_BASE_URL,
  USER_LIST_ITEMS_LIMIT,
} from "../../../data/constants.js";
import filterIcon from "../../../assets/svg/settings.svg";
import { ListVacanciesComponent } from "../../../commonItems/features/listVacancies/ListVacanciesComponent.jsx";
import { VacancyFilterComponent } from "./substructures/VacancyFilter/VacancyFilterComponent.jsx";
import { useSearchParams, useNavigate} from "react-router-dom";
import closeIcon from "../../../assets/svg/X.svg";
import { ButtonType1 } from "../../../commonItems/components/buttons/buttonType1/ButtonType1.jsx";
import { PaginationComponent } from "../../../commonItems/features/pagination/Pagination.jsx";
import { generateRequestQueryString } from "../../../services/utils/generateRequestQueryString.js";



export const VacanciesComponent = (props) => {
  const [vacancyFilterDisplayValue, setVacancyFilterDisplayValue] =
    useState("none");
  const [listVacanciesRequestUrl, setListVacanciesRequestUrl] = useState(
    LIST_VACANCIES_BASE_URL
  );
  const [currentClientUrl, setCurrentClientUrl] = useState(window.location.href);
  const [vacanciesResponseData, setVacanciesResponseData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(()=>{
    // This hook is nesessary due to filter
    setCurrentClientUrl(window.location.href)
  },[window.location.href])

  useEffect(() => {
    if (currentClientUrl !== window.location.href) {
      const params=new URL(currentClientUrl).searchParams
      navigate(`/vacancies?${params.toString()}`);
    }
  }, [currentClientUrl]);

  const filterButtonHandler = () => {
    setVacancyFilterDisplayValue("flex");
  };

  const generateListVacanciesRequestURL = () => {
    return (
      // LIST_VACANCIES_BASE_URL + "?" + generateListVacanciesRequestQueryString()
      LIST_VACANCIES_BASE_URL + "?" + generateRequestQueryString(searchParams, USER_LIST_ITEMS_LIMIT)
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
        value={
          <span>
            Filter{" "}
            <img
              className="vacancy-in-button-icon"
              src={filterIcon}
              alt=""
              height="14px"
            />{" "}
          </span>
        }
        onClickHandler={filterButtonHandler}
        strength="1"
      />

      <ResetFiltersComponent />
      <h2 className="h2-main-header h2-common">Vacancies</h2>
      <ListVacanciesComponent
        listVacanciesRequestUrl={listVacanciesRequestUrl}
        setVacanciesResponseData={setVacanciesResponseData}
      />
      <PaginationComponent
        responseData={vacanciesResponseData}
        listItemsLimit={USER_LIST_ITEMS_LIMIT}
        paginationClass="vacancies-pagination-section"
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
