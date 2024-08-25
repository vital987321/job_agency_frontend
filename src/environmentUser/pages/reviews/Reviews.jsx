import { useState } from "react";
import { ReviewsTempComponent } from "./context/ReviewsTempComponent";
import { ReviewsListComponent } from "../../../environmentCommon/features/reviewsList/reviewsList";
import {AverageRating} from "../../../environmentCommon/features/averageRating/averageRaring"
import { ReviewForm } from "./context/reviewForm/reviewForm";
import {
  LIST_REVIEWS_REQUEST_URL,
  REVIEWS_LIST_LIMIT,
} from "../../../data/constants";
import { PaginationComponent } from "../../../environmentCommon/features/pagination/Pagination";
import { ButtonType1 } from "../../../environmentCommon/components/buttons/buttonType1/ButtonType1";
import styles from "./reviews.module.css";

export const ReviewsComponent = () => {
  const [listReviewsRequestUrl, setListReviewsRequestUrl] = useState(
    `${LIST_REVIEWS_REQUEST_URL}?limit=${REVIEWS_LIST_LIMIT}`
  );
  const [reviewsResponseData, setReviewsResponseData] = useState({});
  const [formDisplayValue, setFormDisplayValue] = useState("none"); // none  block
  const [ updateDataState, setUpdateDataState]=useState({})

  // functions
  const writeReviewButtonHandler = () => {
    setFormDisplayValue("block");
  };

  // Body
  return (
    <>
      <div className={styles["main-body"]}>
        <h2 className="h2-common">Reviews</h2>
        <AverageRating
          responseData={reviewsResponseData}
        />
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
            if (localStorage.getItem("user_id") > 0) {
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

        {/* <ReviewsTempComponent/> */}
      </div>

    </>
  );
};
