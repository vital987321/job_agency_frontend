import styles from "./PaginationNumberButtons.module.css";
import { useSearchParams } from "react-router-dom";
import { changeUrlParamValue } from "../../../../../services/utils/changeUrlParamValue";

/**
 * returns pagination buttons
 * @typedef {object} Props
 * @property {object} responseData
 * @property {number | string} listItemsLimit
 * @property {string} urlState
 * @property {function} setUrlState
 * @param {Props} props 
 * @returns {JSX.Element}
 */

export const PaginationNumberButtons = ({
  responseData,
  listItemsLimit,
  urlState,
  setUrlState,
}) => {

  //* hooks
  const [searchParams, setSearchParams] = useSearchParams();

  //* variables
  const itemsTotalNumber = responseData.count;

  //* functions
  const paginationButtonHandler = (e) => {
    const paginationNumber = e.target.textContent;
    let newOffsetValue = (paginationNumber - 1) * listItemsLimit;
    newOffsetValue=newOffsetValue!==0? newOffsetValue : null
    const updatedUrl = changeUrlParamValue(urlState, "offset", newOffsetValue);
    setUrlState(updatedUrl);
  };

  //* Main Body
  if (itemsTotalNumber <= listItemsLimit) {
    return "";
  }

  let paginationArray = new Array();
  let currentOffset=new URL(urlState).searchParams.get('offset')
  currentOffset = currentOffset ? currentOffset: "0";
  const currentPaginationNumber =
    Math.floor(currentOffset / listItemsLimit) + 1;
  const minPaginationNumber = Math.max(1, currentPaginationNumber - 3);
  const maxPaginationNumber = Math.min(
    currentPaginationNumber + 3,
    Math.ceil(itemsTotalNumber / listItemsLimit)
  );
  for (let i = minPaginationNumber; i <= maxPaginationNumber; i++) {
    paginationArray.push(i);
  }

  return (
    <>
      {paginationArray.map((item) => {
        const isCurrent=(item==currentPaginationNumber)
        return (
          <button key={item}
          className={`${styles.paginationButton} ${isCurrent? styles.paginationButtonCurrent:""}`}
          onClick={paginationButtonHandler}>
            {item}
          </button>
        );
      })}
    </>
  );
};
