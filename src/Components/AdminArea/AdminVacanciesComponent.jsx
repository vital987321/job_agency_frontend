import { VacanciesComponent } from "../UserArea/Main/VacanciesComponent";
import { AdminVacancyFormComponent } from "./AdminVacancyFormComponent";
import searchIcon from "../../svg/search.svg";
import "../../css/adminArea/adminVacancies.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export const AdminVacanciesComponent = () => {
    const [vacancyFormDisplayValue, setVacancyFormDisplayValue] = useState("none");
    const quickSearchRef = React.createRef();
    const navigate = useNavigate();

    const quickSearchHandler = (e) => {
      e.preventDefault();
        if (quickSearchRef.current.value) {
        navigate(
          "/admin/vacancies?key_search=" +
            encodeURIComponent(quickSearchRef.current.value)
        );
      }
  };
  
  const newVacancyButtonHandler = () => {
    setVacancyFormDisplayValue('block')
  }

  return (
    <div className="admin-vacancies-container">
      <div className="new-vacancy-button-container">
        <form
          className="admin-vacancies-quick-search-form"
          onSubmit={quickSearchHandler}
        >
          <img className="admin-vacancy-search-icon" src={searchIcon} alt="" />
          <input
            className="admin-quick-search-form-input"
            type="text"
            placeholder="Quick Search"
            ref={quickSearchRef}
          />
        </form>
        <button
          className="button-common button-common-color1 add-new-vacancy-button"
          onClick={newVacancyButtonHandler}
        >
          Add new vacancy
        </button>
      </div>
      <VacanciesComponent />
      <AdminVacancyFormComponent
        vacancyData=""
        setVacancyFormDisplayValue={setVacancyFormDisplayValue}
        vacancyFormDisplayValue={vacancyFormDisplayValue}
        newVacancy={true}
      />
    </div>
  );
};
