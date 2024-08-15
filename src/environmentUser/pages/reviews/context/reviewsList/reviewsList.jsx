import api from "../../../../../services/api/api";
import styles from "./reviewsList.module.css";
import { useState, useEffect } from "react";
import { AvatarComponent } from "../../../../../environmentCommon/components/AvatarComponent";

export const ReviewsListComponent = (props) => {
  const [reviewsList, setReviewsList] = useState([]);

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
  }, []);

  return (
    <section className={styles["reviews-section"]}>
      <h1 className={styles["review-section-header"]}>Clients Reviews</h1>
      <ul className={styles["reviews-cards-container"]}>
        {reviewsList.map((review) => {
          return (
            <li className={styles["review-card"]}>
              <div className={styles["avatar-container"]}>
                <AvatarComponent
                  userAvatarUrl={review.avatar}
                  iconSymbol={review.first_name.toUpperCase()[0]}
                  size={100}
                />
              </div>
              <p className={styles["review-card-name"]}>
                {review.first_name ? review.first_name : "Noname"}
              </p>

              <div className={styles["review-card-text"]}>{review.comment}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
