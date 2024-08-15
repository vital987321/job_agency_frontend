import { useState } from "react"
import { ReviewsTempComponent } from "./context/ReviewsTempComponent"
import { ReviewsListComponent } from "./context/reviewsList/reviewsList"
import { LIST_REVIEWS_REQUEST_URL } from "../../../data/constants"

export const ReviewsComponent=()=>{
    const [listReviewsRequestUrl, setListReviewsRequestUrl]=useState(LIST_REVIEWS_REQUEST_URL)
    const [reviewResponseData, setReviewsResponseData]=useState({})
    return<>
        <ReviewsListComponent listReviewsRequestUrl={listReviewsRequestUrl} setReviewsResponseData={setReviewsResponseData}/>
        <ReviewsTempComponent/>
    </>

}