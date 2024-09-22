import { useState } from "react";
import { ReviewsListComponent } from "../../../commonItems/features/reviewsList/reviewsList";
import { AverageRating } from "../../../commonItems/features/averageRating/averageRaring";
import { ReviewForm } from "./substructures/reviewForm/reviewForm";
import {
  LIST_REVIEWS_REQUEST_URL,
  REVIEWS_LIST_LIMIT,
} from "../../../data/constants";
import { PaginationComponent } from "../../../commonItems/features/pagination/Pagination";
import { ButtonType1 } from "../../../commonItems/components/buttons/buttonType1/ButtonType1";
import styles from "./reviews.module.css";
import {useAuth} from "../../../hooks/useAuth"

export const ReviewsComponent = () => {

  //* States
  const [listReviewsRequestUrl, setListReviewsRequestUrl] = useState(
    `${LIST_REVIEWS_REQUEST_URL}?limit=${REVIEWS_LIST_LIMIT}`
  );
  const [reviewsResponseData, setReviewsResponseData] = useState({});
  const [formDisplayValue, setFormDisplayValue] = useState("none"); // none  block
  const [updateDataState, setUpdateDataState] = useState({});

  //* Hooks
  const {auth}=useAuth()

  //* Functions
  const writeReviewButtonHandler = () => {
    setFormDisplayValue("block");
  };

  //* Main Body
  return (
    <>
      <div className={styles["main-body"]}>
        <h2 className="h2-common">Reviews</h2>
        <AverageRating responseData={reviewsResponseData} />
        <div className={styles["reviews-body"]}>
          <ReviewsListComponent
            listReviewsRequestUrl={listReviewsRequestUrl}
            setReviewsResponseData={setReviewsResponseData}
            updateDataState={updateDataState}
          />
          <PaginationComponent
            responseData={reviewsResponseData}
            listItemsLimit={REVIEWS_LIST_LIMIT}
            paginationClass={styles["pagination-section"]}
            urlState={listReviewsRequestUrl}
            setUrlState={setListReviewsRequestUrl}
          />
          {(() => {
            if (auth.user_id) {
              return (
                <>
                  <div className={styles["new-review-button-container"]}>
                    <ButtonType1
                      value="Write my review"
                      onClickHandler={writeReviewButtonHandler}
                      strength="1"
                    />
                  </div>

                  <ReviewForm
                    formDisplayValue={formDisplayValue}
                    setFormDisplayValue={setFormDisplayValue}
                    setUpdateDataState={setUpdateDataState}
                  />
                </>
              );
            }
          })()}
        </div>
      </div>
    </>
  );
};
