import styles from "./paginationArowButton.module.css";
import { changeUrlParamValue } from "../../../../../services/utils/changeUrlParamValue";

export const PaginationArowButton = (props) => {
  const direction = props.direction; /*'previous' or 'next'*/
  const responseData = props.responseData;
  const setUrlState = props.setUrlState;
  const urlState = props.urlState;



  const paginationButtonHandler = (e) => {
    const paginationDirection = e.target.dataset.direction;
    const requestUrl = new URL(responseData[paginationDirection]);
    const newOffsetValue = requestUrl.searchParams.get("offset");
    const updatedUrl = changeUrlParamValue(urlState, "offset", newOffsetValue);
    setUrlState(updatedUrl);
  };


  if (responseData[direction] !== null) {
    return (
      <button
        className={styles["pagination-button"]}
        onClick={paginationButtonHandler}
        data-direction={direction}
      >
        {direction === "previous" ? "< Previous" : "Next >"}
      </button>
    );
  }
};
