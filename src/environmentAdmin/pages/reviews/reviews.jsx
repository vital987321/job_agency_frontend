import { reviewFilter } from "./context/reviewFilter/reviewFilter";
import { ReviewsListComponent } from "../../../environmentUser/pages/reviews/context/reviewsList/reviewsList";
import {
  ADMIN_LIST_ITEMS_LIMIT_DEFAULT,
  LIST_REVIEWS_REQUEST_URL,
} from "../../../data/constants";
import styles from "./reviews.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReviewFilter } from "./context/reviewFilter/reviewFilter";
import { generateRequestQueryString } from "../../../services/utils/generateRequestQueryString";
import { PaginationComponent } from "../../../environmentCommon/features/pagination/Pagination";

export const AdminReviewsComponent = () => {
  // variables
  const listItemsOnPage = localStorage.getItem("AdminListItemsOnPage")
    ? localStorage.getItem("AdminListItemsOnPage")
    : ADMIN_LIST_ITEMS_LIMIT_DEFAULT;

  // Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const [listReviewsRequestUrl, setListReviewsRequestUrl] = useState(
    `${LIST_REVIEWS_REQUEST_URL}?limit=${listItemsOnPage}`
  );
  const [currentClientUrl, setCurrentClientUrl] = useState(
    window.location.href
  );
  const [reviewsResponseData, setReviewsResponseData] = useState({});
  

  const navigate = useNavigate();

  // UseEffects
  useEffect(() => {
    // This hook is nesessary due to filter
    setCurrentClientUrl(window.location.href);
    // alert(window.location.href)
  }, [window.location.href]);

  useEffect(() => {
    // alert(`second useEffect. ${currentClientUrl} ${window.location.href}`)
    if (currentClientUrl !== window.location.href) {
      const params = new URL(currentClientUrl).searchParams;
      // alert(`?${params.toString()}`)
      // alert(`second useEffect Navigate: ? ${params.toString()}`)
      navigate(`?${params.toString()}`);
    }
  }, [currentClientUrl]);

  // functions
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


  // Main Body
  updateAdminListReviewsRequestURL();

  return (
    <div className={styles.mainBody}>
      <ReviewFilter />
      <div className={styles["list-container"]}>

      </div>
        <ReviewsListComponent
          listReviewsRequestUrl={listReviewsRequestUrl}
          setReviewsResponseData={setReviewsResponseData}
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
