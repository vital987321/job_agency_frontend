import React, { useState, useEffect, useRef } from "react";
import { ADMIN_LIST_ITEMS_LIMIT_DEFAULT } from "../../../../../data/constants";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import styles from "../../../../../commonItems/css/adminListItemsFilter.module.css";
import { AdminFilterControls } from "../../../../../commonItems/features/adminFilterControls/AdminFilterControls_1";

export const ReviewFilter = () => {
  const userEmailRef = useRef();
  const userFirstNameRef = useRef();
  const userLastNameRef = useRef();
  const rateRef = useRef();
  const commentRef = useRef();

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
              <div
                className={styles["admin-list-items-filter-input-container"]}
              >
                <label htmlFor="review-filter-user-email-input">Email</label>
                <input
                  className={styles["admin-list-items-filter-input"]}
                  id="review-filter-user-email-input"
                  type="text"
                  ref={userEmailRef}
                />
              </div>
              <div
                className={styles["admin-list-items-filter-input-container"]}
              >
                <label htmlFor="review-filter-user-name-input">
                  First Name
                </label>
                <input
                  className={styles["admin-list-items-filter-input"]}
                  id="review-filter-user-name-input"
                  type="text"
                  ref={userFirstNameRef}
                />
              </div>
              <div
                className={styles["admin-list-items-filter-input-container"]}
              >
                <label htmlFor="review-filter-user-name-input">Last Name</label>
                <input
                  className={styles["admin-list-items-filter-input"]}
                  id="review-filter-user-last-name-input"
                  type="text"
                  ref={userLastNameRef}
                />
              </div>

              <div
                className={styles["admin-list-items-filter-input-container"]}
              >
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
              <div
                className={styles["admin-list-items-filter-input-container"]}
              >
                <label htmlFor="review-filter-comment-input">Comment</label>
                <input
                  className={styles["admin-list-items-filter-input"]}
                  id="review-filter-comment-input"
                  type="text"
                  ref={commentRef}
                />
              </div>
            </div>

            <AdminFilterControls
              filterButtonHandler={filterButtonHandler}
              resetFiltersButtonDisplayValue={resetFiltersButtonDisplayValue}
              resetFiltersHandler={resetFiltersHandler}
              onPageListItemsAmount={onPageListItems}
              onChangeListItemsAmount={changeOnPageListItemsLimit}
            />
          </form>
        </div>
      </section>
    </>
  );
};
