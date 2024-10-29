import styles from "./PaginationArrowButton.module.css";
import { changeUrlParamValue } from "../../../../../services/utils/changeUrlParamValue";

/**
 * Returns pagination 'Previous' or 'Next' button. 
 * @typedef {object} Props
 * @property {string} direction 'previous' or 'next'
 * @property {object} responseData 
 * @property {string} urlState
 * @property {function} setUrlState
 * @param {Props} props 
 * @returns {JSX.Element}
 */

export const PaginationArrowButton = ({
  direction, 
  responseData,
  urlState, 
  setUrlState
}) => {

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
