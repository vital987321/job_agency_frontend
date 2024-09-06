import closeIcon from "../../../../../assets/svg/X.svg";
import styles from "./vacancyFilter.module.css";
import React from "react";
import { SALARY_CEILING, RESIDENCE_TYPES } from "../../../../../data/constants";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/ButtonType1";
import { SalaryLevel } from "../../../../../commonItems/components/salaryLevel/salaryLevel";

export const VacancyFilterComponent = (props) => {
  //* Refs
  const vacancyKeyWordsRef = React.createRef();
  const salaryMinRef = React.createRef();
  const salaryMaxRef = React.createRef();
  const vacancyResidenceRef = React.createRef();
  const vacancyLocationRef = React.createRef();

  //* Hooks
  const navigate = useNavigate();

  //* Functions
  const closeButtonHandler = () => {
    props.setVacancyFilterDisplayValue("none");
  };

  const buildFilterQueryString = () => {
    const vacancyKeyWords = vacancyKeyWordsRef.current.value;
    const salaryMin = salaryMinRef.current.value;
    const salaryMax = salaryMaxRef.current.value;
    const vacancyLocation = vacancyLocationRef.current.value;
    const vacancyResidence = vacancyResidenceRef.current.value;

    let queryStringArray = [];
    let queryString = "";
    if (vacancyKeyWords)
      queryStringArray.push(
        "key_search=" + encodeURIComponent(vacancyKeyWords)
      );
    if (salaryMin > 0) queryStringArray.push("salary_gte=" + salaryMin);
    if (salaryMax < SALARY_CEILING)
      queryStringArray.push("salary_lte=" + salaryMax);
    if (vacancyLocation)
      queryStringArray.push("location=" + encodeURIComponent(vacancyLocation));
    if (vacancyResidence)
      queryStringArray.push("residence_type=" + vacancyResidence);
    if (queryStringArray.length > 0) {
      queryString = "?" + queryStringArray.join("&");
    }
    return queryString;
  };

  const submitVacancyFilterHandler = (e) => {
    e.preventDefault();
    navigate("" + buildFilterQueryString());
    props.setVacancyFilterDisplayValue("none");
  };

  const onFormModalSpaceClick = (e) => {
    if (e.target.id == "vacancy-filter-container") closeButtonHandler();
  };

  //* Main Body
  return (
    <div
      id="vacancy-filter-container"
      className={styles["vacancy-filter-container"]}
      style={{ display: props.vacancyFilterDisplayValue }}
      onClick={onFormModalSpaceClick}
    >
      <form
        className={styles["vacancy-filter-form"]}
        onSubmit={submitVacancyFilterHandler}
      >
        <div className={styles["vacancy-filter-close-container"]}>
          <img
            className={styles["vacancy-filter-close-button"]}
            onClick={closeButtonHandler}
            src={closeIcon}
            alt="X"
          />
        </div>
        <p className={styles["vacancy-filter-input-title"]}>
          Vacancy key words:
        </p>
        <input
          type="text"
          className={styles["vacancy-filter-key-words-input"]}
          id="vacancy-filter-key-words-input"
          defaultValue={props.searchParams.get("key_search")}
          ref={vacancyKeyWordsRef}
        />

        <p className={styles["vacancy-filter-input-title"]}>Salary level:</p>


          <SalaryLevel
            salaryMinRef={salaryMinRef}
            salaryMaxRef={salaryMaxRef}
            searchParams={props.searchParams}
            vacancyFilterDisplayValue={props.vacancyFilterDisplayValue}
          />  

        

        <p className={styles["vacancy-filter-input-title"]}>Residence type:</p>
        <select
          className={styles["vacancy-filter-residence-input"]}
          id="vacancy-filter-residence-type-input"
          defaultValue={props.searchParams.get("residence_type")}
          ref={vacancyResidenceRef}
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

        <p className={styles["vacancy-filter-input-title"]}>Location:</p>
        <input
          className={styles["vacancy-filter-location-input"]}
          type="text"
          id="vacancy-filter-location-input"
          defaultValue={props.searchParams.get("location")}
          ref={vacancyLocationRef}
        />
        <div className={styles["vacancy-filter-submit-button-container"]}>
          <ButtonType1
            value="Filter"
            onClickHandler={submitVacancyFilterHandler}
            strength="2"
          />
        </div>
      </form>
    </div>
  );
};
