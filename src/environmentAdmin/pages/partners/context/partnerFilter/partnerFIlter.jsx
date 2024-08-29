import styles from "./partnerFilter.module.css";
import filterIcon from "../../../../../assets/svg/settings.svg";
import closeIcon from "../../../../../assets/svg/X.svg";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ADMIN_LIST_ITEMS_LIMIT_DEFAULT } from "../../../../../data/constants";
import { ButtonType1 } from "../../../../../environmentCommon/components/buttons/buttonType1/ButtonType1";

export const PartnerFilter = () => {
  //* Variables
  let listItemsOnPage = localStorage.getItem("AdminListItemsOnPage");

  //* Refs
  const companyRef = React.createRef();
  const hrSpecialistRef = React.createRef();
  const phoneRef = React.createRef();

  //* States

  const [onPageListItems, setOnPageListItems] = useState(
    listItemsOnPage ? listItemsOnPage : ADMIN_LIST_ITEMS_LIMIT_DEFAULT
  );
  const [resetFiltersButtonDisplayValue, setResetFiltersButtonDisplayValue] =
    useState("none");

  //* Hooks
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //* useEffects
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

  //* Functions
  const changeOnPageListItemsLimit = (e) => {
    localStorage.setItem("AdminListItemsOnPage", e.target.value);
    setOnPageListItems(e.target.value);
  };

  const buildFilterQueryString = () => {
    const company = companyRef.current.value;
    const hrSpecialist = hrSpecialistRef.current.value;
    const phone = phoneRef.current.value;
    let queryStringArray = [];
    let queryString = "";
    if (onPageListItems) queryStringArray.push("limit=" + onPageListItems);
    if (company) queryStringArray.push("company=" + company);
    if (hrSpecialist) queryStringArray.push("hr_name=" + hrSpecialist);
    if (phone) queryStringArray.push("phone=" + phone);
    if (queryStringArray.length > 0) {
      queryString = "?" + queryStringArray.join("&");
    }
    return queryString;
  };

  const filterButtonHandler = (e) => {
    navigate("" + buildFilterQueryString());
  };

  const filterFormSubmitHandler = (e) => {
    e.preventDefault();
    filterButtonHandler();
  };

  const resetFiltersHandler = (e) => {
    e.preventDefault();
    companyRef.current.value = "";
    hrSpecialistRef.current.value = "";
    phoneRef.current.value = "";
    navigate("");
  };

  //* Main Body
  return (
    <section className="admin-list-items-filter-section">
      <div className="admin-list-items-filter-main-container">
        <form onSubmit={filterFormSubmitHandler}>
          <div className="admin-list-items-filter-form-inputs">
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="partner-filter-company-input">Company</label>
              <input
                className="admin-list-items-filter-input"
                id="partner-filter-company-input"
                type="text"
                ref={companyRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="partner-filter-hr-specialist-input">
                HR Specialist
              </label>
              <input
                className="admin-list-items-filter-input"
                id="partner-filter-hr-specialist-input"
                type="text"
                ref={hrSpecialistRef}
              />
            </div>
            <div className="admin-list-items-filter-input-container">
              <label htmlFor="review-filter-phone-input">Phone</label>
              <input
                className="admin-list-items-filter-input"
                id="partner-filter-phone-input"
                type="text"
                ref={phoneRef}
              />
            </div>
          </div>

          <div className="admin-list-items-form-controls">
            <div className="admin-list-items-form-buttons-container">
              <ButtonType1
                value={
                  <span>
                    Filter{" "}
                    <img
                      className="admin-filter-button-icon"
                      src={filterIcon}
                      alt=""
                      height="14px"
                    />
                  </span>
                }
                onClickHandler={filterButtonHandler}
                strength="1"
              />

              <div
                className="admin-reset-filters-button-container"
                style={{ display: resetFiltersButtonDisplayValue }}
              >
                <ButtonType1
                  value={
                    <span>
                      Reset Filters{" "}
                      <img
                        className="admin-filter-button-icon"
                        src={closeIcon}
                        alt=""
                        height="14px"
                      />
                    </span>
                  }
                  onClickHandler={resetFiltersHandler}
                  strength="2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="applicaption-filter-on-page-input">on Page</label>
              <select
                className="admin-list-items-filter-input admin-list-items-filter-on-page-input"
                id="applicaption-filter-on-page-input"
                value={onPageListItems}
                onChange={changeOnPageListItemsLimit}
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
