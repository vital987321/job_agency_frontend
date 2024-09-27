import styles from "./paginationNumberButton.module.css";
import { useSearchParams } from "react-router-dom";
import { changeUrlParamValue } from "../../../../../services/utils/changeUrlParamValue";

export const PaginationNumberButton = (props) => {
  // props
  const responseData = props.responseData;
  const listItemsLimit = props.listItemsLimit;
  const setUrlState = props.setUrlState;
  const urlState = props.urlState;

  // hooks
  const [searchParams, setSearchParams] = useSearchParams();

  // variables
  const itemsTotalNumber = responseData.count;

  // functions
  const paginationButtonHandler = (e) => {
    const paginationNumber = e.target.textContent;
    let newOffsetValue = (paginationNumber - 1) * listItemsLimit;
    newOffsetValue=newOffsetValue!==0? newOffsetValue : null
    const updatedUrl = changeUrlParamValue(urlState, "offset", newOffsetValue);
    setUrlState(updatedUrl);
  };

  // Pagination condition
  if (itemsTotalNumber <= listItemsLimit) {
    return "";
  }

  // Main Body (condition met)
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
