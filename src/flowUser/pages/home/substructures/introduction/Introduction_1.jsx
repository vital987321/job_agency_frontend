import searchIcon from "../../../../../assets/svg/search.svg";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Introduction.module.css"

export const Introduction = () => {
    const quickSearchRef=React.createRef()

    const navigate=useNavigate()

    const quickSearchHandler = (e) => {
        e.preventDefault();
        if (quickSearchRef.current.value) {
          navigate(
            "/vacancies?key_search=" +
              encodeURIComponent(quickSearchRef.current.value)
          );
        }
      };

  return (
    <section className={styles["introductory-section"]}>
      <div className={styles["introductory-text-container"]}>
        <h2 className={styles["introductory-section-header"]}>
          We will find the best employment for you
        </h2>
        <p className={styles["introductory-section-text"]}>
          Employment agency of the year 2024
        </p>
      </div>
      <div className={styles["introductory-form-container"]}>
        <form className={styles["introductory-form"]} onSubmit={quickSearchHandler}>
          <img className={styles["introductory-search-icon"]} src={searchIcon} alt="" />
          <input
            className={styles["introductory-form-input"]}
            type="text"
            placeholder="Search"
            ref={quickSearchRef}
          />
        </form>
      </div>
    </section>
  );
};
