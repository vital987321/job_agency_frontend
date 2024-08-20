import {reviewFilter} from "./context/reviewFilter/reviewFilter"
import { ReviewsListComponent } from "../../../environmentUser/pages/reviews/context/reviewsList/reviewsList";
import {
  ADMIN_LIST_ITEMS_LIMIT_DEFAULT,
  LIST_REVIEWS_REQUEST_URL,
} from "../../../data/constants";
import { useState } from "react";
import { ReviewFilter } from "./context/reviewFilter/reviewFilter";

export const AdminReviewsComponent = () => {
  const listItemsOnPage = localStorage.getItem("AdminListItemsOnPage")
    ? localStorage.getItem("AdminListItemsOnPage")
    : ADMIN_LIST_ITEMS_LIMIT_DEFAULT;

  const [listReviewsRequestUrl, setListReviewsRequestUrl] = useState(
    `${LIST_REVIEWS_REQUEST_URL}?limit=${listItemsOnPage}`
  );
  const [reviewsResponseData, setReviewsResponseData] = useState({});

  return (
    <>
        <ReviewFilter/>
      <ReviewsListComponent
        listReviewsRequestUrl={listReviewsRequestUrl}
        setReviewsResponseData={setReviewsResponseData}
      />
    </>
  );
};
