import React, { useState, useEffect } from "react";
import { ADMIN_LIST_ITEMS_LIMIT_DEFAULT } from "../../../../../data/constants";
import filterIcon from "../../../../../assets/svg/settings.svg";
import closeIcon from "../../../../../assets/svg/X.svg";
import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/ButtonType1";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import styles from "../../../../../commonItems/css/adminListItemsFilter.module.css"

export const ReviewFilter = () => {
  const userEmailRef = React.createRef();
  const userFirstNameRef = React.createRef();
  const userLastNameRef = React.createRef();
  const rateRef = React.createRef();
  const commentRef = React.createRef();

  let listItemsOnPage = localStorage.getItem("AdminListItemsOnPage");
  const [onPageListItems, setOnPageListItems] = useState(
    listItemsOnPage ? listItemsOnPage : ADMIN_LIST_ITEMS_LIMIT_DEFAULT
  );
  const [resetFiltersButtonDisplayValue, setResetFiltersButtonDisplayValue] =
    useState("none");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const changeOnPageListItemsLimit = (e) => {
    localStorage.setItem("AdminListItemsOnPage", e.target.value);
    setOnPageListItems(e.target.value);
  };

  // useEffects
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


  const buildFilterQueryString = () => {
    const userEmail = userEmailRef.current.value;
    const userFirstName = userFirstNameRef.current.value;
    const userLastName = userLastNameRef.current.value;
    const rate = rateRef.current.value;
    const comment = commentRef.current.value;

    let queryStringArray = [];
    let queryString = "";

    if (onPageListItems) queryStringArray.push("limit=" + onPageListItems);
    if (userEmail) queryStringArray.push("email=" + userEmail);
    if (userFirstName) queryStringArray.push("first_name=" + userFirstName);
    if (userLastName) queryStringArray.push("last_name=" + userLastName);
    if (rate) queryStringArray.push("rating=" + rate);
    if (comment) queryStringArray.push("comment=" + comment);
    
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

    userEmailRef.current.value = "";
    userFirstNameRef.current.value = "";
    rateRef.current.value = "";
    commentRef.current.value = "";
    navigate("");
  };

  return (
    <>
      <section className={styles["admin-list-items-filter-section"]}>
        <div className={styles["admin-list-items-filter-main-container"]}>
          <form
          // className=""
          onSubmit={filterFormSubmitHandler}
          >
            <div className={styles["admin-list-items-filter-form-inputs"]}>
              <div className={styles["admin-list-items-filter-input-container"]}>
                <label htmlFor="review-filter-user-email-input">Email</label>
                <input
                  className={styles["admin-list-items-filter-input"]}
                  id="review-filter-user-email-input"
                  type="text"
                  ref={userEmailRef}
                />
              </div>
              <div className={styles["admin-list-items-filter-input-container"]}>
                <label htmlFor="review-filter-user-name-input">First Name</label>
                <input
                  className={styles["admin-list-items-filter-input"]}
                  id="review-filter-user-name-input"
                  type="text"
                  ref={userFirstNameRef}
                />
              </div>
              <div className={styles["admin-list-items-filter-input-container"]}>
                <label htmlFor="review-filter-user-name-input">Last Name</label>
                <input
                  className={styles["admin-list-items-filter-input"]}
                  id="review-filter-user-last-name-input"
                  type="text"
                  ref={userLastNameRef}
                />
              </div>


              <div className={styles["admin-list-items-filter-input-container"]}>
                <label htmlFor="review-filter-rate-select">Rating</label>
                <select
                  className={styles["admin-list-items-filter-input"]}
                  id="review-filter-rate-select"
                  ref={rateRef}
                >
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className={styles["admin-list-items-filter-input-container"]}>
                <label htmlFor="review-filter-comment-input">Comment</label>
                <input
                  className={styles["admin-list-items-filter-input"]}
                  id="review-filter-comment-input"
                  type="text"
                  ref={commentRef}
                />
              </div>
            </div>

            <div className={styles["admin-list-items-form-controls"]}>
              <div className={styles["admin-list-items-form-buttons-container"]}>
                <ButtonType1
                  value={
                    <span>
                      Filter{" "}
                      <img
                        className={styles["admin-filter-button-icon"]}
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
                  className={styles["admin-reset-filters-button-container"]}
                  style={{ display: resetFiltersButtonDisplayValue }}
                >
                  <ButtonType1
                    value={
                      <span>
                        Reset Filters{" "}
                        <img
                          className={styles["admin-filter-button-icon"]}
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
                className={`${styles["admin-list-items-filter-input"]} ${styles["admin-list-items-filter-on-page-input"]}`}
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
    </>
  );
};
