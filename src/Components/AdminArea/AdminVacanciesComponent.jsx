import { VacanciesComponent } from "../UserArea/Main/VacanciesComponent";
import searchIcon from "../../svg/search.svg";
import "../../css/adminArea/adminVacancies.css";
import React from "react";
import {useNavigate} from "react-router-dom";

export const AdminVacanciesComponent = () => {

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
        <button className="button-common button-common-color1 add-new-vacancy-button">
          Add new vacancy
        </button>
      </div>
      <VacanciesComponent />
    </div>
  );
};
