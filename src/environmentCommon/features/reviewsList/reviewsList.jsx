import api from "../../../services/api/api";
import styles from "./reviewsList.module.css";
import { useState, useEffect } from "react";
import { AvatarComponent } from "../../components/AvatarComponent";
import {StarsLine} from "../../components/starsLine/StarsLine"


export const ReviewsListComponent = (props) => {
  const [reviewsList, setReviewsList] = useState([]);

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchReviewsList = async () => {
      try {
        const response = await api
          .get(props.listReviewsRequestUrl)
          .then((response) => {
            setReviewsList(response.data.results);
            return response;
          })
          .then((response) => {
            props.setReviewsResponseData(response.data);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviewsList();
  }, [props.listReviewsRequestUrl]);

  return (
    <section className={styles["reviews-section"]}>
      <ul className={styles["reviews-cards-container"]}>
        {reviewsList.map((review) => {
          return (
            <li className={styles["review-card"]} key={review.user}>
              <div className={styles["avatar-container"]}>
                <AvatarComponent
                  userAvatarUrl={review.avatar}
                  iconSymbol={review.first_name.toUpperCase()[0]}
                  size={100}
                />
              </div>
              {(() => {
                if (review.user == user_id) {
                  return (
                    <div className={styles["close-button-container"]}>
                      <button
                        className={styles["close-button"]}
                        title="Delete Review"
                      >
                        &#x2716;
                      </button>
                    </div>
                  );
                }
              })()}

              <p className={styles["review-card-name"]}>
                {review.first_name ? review.first_name : "Noname"}
              </p>
              <div>
                <StarsLine rating={review.rating}/>
              </div>
              <div className={styles["review-card-text"]}>{review.comment}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
