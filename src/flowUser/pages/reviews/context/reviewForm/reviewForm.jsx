import styles from "./reviewForm.module.css";
import closeIcon from "../../../../../assets/svg/X.svg";
import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/ButtonType1";
import { useState } from "react";
import React from "react";
import starWhiteIcon from "../../../../../assets/svg/rating_star_icon_white.svg";
import starYellowIcon from "../../../../../assets/svg/rating_star_icon_yellow.svg";
import api from "../../../../../services/api/api";
import {
  LIST_REVIEWS_REQUEST_URL,
  USER_REQUEST_URL,
} from "../../../../../data/constants";

export const ReviewForm = (props) => {
  // props:
  // formDisplayValue
  // setReviewFormDisplayValue
  // setUpdateDataState

  //variables, consts
  const user_id = localStorage.getItem("user_id");

  // Hooks
  const [userRate, setUserRate] = useState("");
  const [userComment, setUserComment] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // functions

  const userReviewRequest = async () => {
    const url = `${LIST_REVIEWS_REQUEST_URL}?user=${user_id}`;
    try {
      const request = await api
        .get(url)
        .then((response) => {
          if (response.data.count == 1) {
            setUserRate(response.data.results[0].rating);
            setUserComment(response.data.results[0].comment);
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  userReviewRequest();

  const closeButtonHandler = () => {
    props.setFormDisplayValue("none");
  };

  const ratingStarClick = (e) => {
    setUserRate(e.target.dataset.stars);
  };

  const onCommentChange = (e) => {
    setUserComment(e.target.value);
  };

  const isFormValid = (data) => {
    let validation = true;
    const newValidationErrors = {};
    if (!data.rating) {
      newValidationErrors.rating = "Give your rate";
      validation = false;
    }
    if (data.comment.length > 200) {
      newValidationErrors.comment = "Max lelgth is 200 symbols";
      validation = false;
    }
    setValidationErrors(newValidationErrors);
    return validation;
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const comment = userComment;
    const user_id = localStorage.getItem("user_id");

    const requestData = {
      user: user_id,
      comment: comment,
      rating: userRate,
    };

    const sendPostRequest = async () => {
      try {
        const request = await api
          .post(LIST_REVIEWS_REQUEST_URL, requestData)
          // .then((res) => alert("Form sent"))
          .then((res) => closeButtonHandler())
          .then((res)=>props.setUpdateDataState({}))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };

    if (isFormValid(requestData)) {
      sendPostRequest();
    } else {
      console.log("form validation errors");
    }
  };

  // Body
  return (
    <>
      <div
        style={{ display: props.formDisplayValue }}
        className={styles["form-modal-window-enviroment"]}
      >
        <form onSubmit={submitFormHandler} className={styles["form-container"]}>
          <div className={styles["form-close-button-container"]}>
            <img
              className={styles["form-close-button"]}
              onClick={closeButtonHandler}
              src={closeIcon}
              alt="X"
            />
          </div>
          <div className={styles["form-main-container"]}>
            <div className={styles["form-header-container"]}>
              <h3>My Review</h3>
            </div>

            <div className="application-form-inputs-container">
              <div className={styles["rating-container"]}>
                <div>
                  <p>Rate us:</p>
                </div>
                <div>
                  {[1, 2, 3, 4, 5].map((item) => {
                    const starIcon =
                      item <= userRate ? starYellowIcon : starWhiteIcon;
                    return (
                      <img
                        src={starIcon}
                        className={styles["star-icon"]}
                        onClick={ratingStarClick}
                        data-stars={item}
                        alt="*"
                        key={item}
                      />
                    );
                  })}
                </div>
                <div className="application-form-validation-message-container">
                  {validationErrors.rating}
                </div>
              </div>

              <div className={styles["comment-area-container"]}>
                <div className={styles["comment-input-block"]}>
                  <label htmlFor="review-form-comment">Your comment:</label>
                  <textarea
                    className={styles["comment-text-area"]}
                    name=""
                    id="review-form-comment"
                    cols="20"
                    rows="10"
                    value={userComment}
                    onChange={onCommentChange}
                  ></textarea>
                </div>
                <div className="application-form-validation-message-container">
                  {validationErrors.comment}
                </div>
              </div>
            </div>
            <div className={styles["submit-button-container"]}>
              <ButtonType1
                value="Send Review"
                strength="1"
                onClickHandler={submitFormHandler}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
