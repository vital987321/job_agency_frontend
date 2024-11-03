import api from "../../../services/api/api";
import styles from "./ReviewsList.module.css";
import { useState, useEffect } from "react";
import { AvatarComponent } from "../../components/avatarComponent/AvatarComponent";
import {StarsLine} from "../../components/starsLine/StarsLine"
import { LIST_REVIEWS_REQUEST_URL } from "../../../data/constants";
import toast from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";

/**
 * @typedef {object} Props
 * @property {string} listReviewsRequestUrl
 * @property {function} setReviewsResponseData
 * @property {object} updateDataState new empty object trigers component to rerender
 * @param {Props} props 
 * @returns {JSX.Element}
 */


export const ReviewsList = ({
  listReviewsRequestUrl,
  setReviewsResponseData,
  updateDataState
}) => {

  //* States
  const [reviewsList, setReviewsList] = useState([]);
  const [updateData, setUpdateData]=useState({})

  //* Hooks
  const {auth}=useAuth()

  //* useEffects
  useEffect(() => {
    const fetchReviewsList = async () => {
      try {
        const response = await api
          .get(listReviewsRequestUrl)
          .then((response) => {
            setReviewsList(response.data.results);
            return response;
          })
          .then((response) => {
            setReviewsResponseData(response.data);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviewsList();
  }, [listReviewsRequestUrl, updateDataState, updateData]);

  const deleteButtonHandler = (e) => {
    const reviewId=e.target.dataset.reviewid
    const deleteReview = async () => {
      try {
        const requestUrl = LIST_REVIEWS_REQUEST_URL + reviewId + "/";
        const response = await api
          .delete(requestUrl)
          .then((response)=>{ 
            setUpdateData({}) })
          .then((response)=>toast.error('Removed'))
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    deleteReview();
  };

  //* Main Body
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
                if (review.user == auth.user_id || ["2250", "1001"].includes(auth.role)) {
                  return (
                    <div className={styles["close-button-container"]}>
                      <button
                        className={styles["close-button"]}
                        title="Delete Review"
                        onClick={deleteButtonHandler}
                        data-reviewid={review.id}
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
