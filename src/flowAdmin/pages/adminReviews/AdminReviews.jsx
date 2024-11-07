import { ReviewsList } from "../../../commonItems/features/reviewsList/ReviewsList";
import {
  ADMIN_LIST_ITEMS_LIMIT_DEFAULT,
  LIST_REVIEWS_REQUEST_URL,
} from "../../../data/constants";
import styles from "./AdminReviews.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReviewFilter } from "./substructures/reviewFilter/ReviewFilter";
import { generateRequestQueryString } from "../../../services/utils/generateRequestQueryString";
import { PaginationComponent } from "../../../commonItems/features/pagination/Pagination";
import { AverageRating } from "../../../commonItems/features/averageRating/AverageRaring";


export const AdminReviews = () => {

  //* Variables
  const listItemsOnPage = localStorage.getItem("AdminListItemsOnPage")
    ? localStorage.getItem("AdminListItemsOnPage")
    : ADMIN_LIST_ITEMS_LIMIT_DEFAULT;

  //* Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const [listReviewsRequestUrl, setListReviewsRequestUrl] = useState(
    `${LIST_REVIEWS_REQUEST_URL}?limit=${listItemsOnPage}`
  );
  const [currentClientUrl, setCurrentClientUrl] = useState(
    window.location.href
  );
  const [reviewsResponseData, setReviewsResponseData] = useState({});
  

  const navigate = useNavigate();

  //* UseEffects
  useEffect(() => {
    // This hook is nesessary due to filter
    setCurrentClientUrl(window.location.href);
  }, [window.location.href]);

  useEffect(() => {
    if (currentClientUrl !== window.location.href) {
      const params = new URL(currentClientUrl).searchParams;
      navigate(`?${params.toString()}`);
    }
  }, [currentClientUrl]);

  //* Functions
  const generateAdminListReviewsRequestURL = () => {
    return (
      LIST_REVIEWS_REQUEST_URL +
      "?" +
      generateRequestQueryString(searchParams, listItemsOnPage)
    );
  };

  const updateAdminListReviewsRequestURL = () => {
    const updatedURL = generateAdminListReviewsRequestURL();
    if (updatedURL !== listReviewsRequestUrl) {
      setListReviewsRequestUrl(updatedURL);
    }
  };


  //* Main Body
  updateAdminListReviewsRequestURL();

  return (
    <div className={styles.mainBody}>
      <ReviewFilter />
      <div className={styles["list-container"]}>

      <h2 className="h2-common">Reviews</h2>
      <AverageRating
        responseData={reviewsResponseData}
      />
      </div>
        <ReviewsList
          listReviewsRequestUrl={listReviewsRequestUrl}
          setReviewsResponseData={setReviewsResponseData}
          staffUser={true}
        />
      <PaginationComponent
        responseData={reviewsResponseData}
        listItemsLimit={listItemsOnPage}
        paginationClass={styles["pagination-section"]}
        urlState={currentClientUrl}
        setUrlState={setCurrentClientUrl}
      />
    </div>
  );
};
