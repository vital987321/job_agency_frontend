import styles from "./paginationNumberButton.module.css";
import { useSearchParams } from "react-router-dom";
import { changeUrlParam } from "../../../../../services/utils/changeUrlParam";

export const PaginationNumberButton = (props) => {
  // props
  const responseData = props.responseData;
  const listItemsLimit = props.listItemsLimit;
  const setUrlState = props.setUrlState;
  const urlState = props.urlState;

  const itemsTotalNumber = responseData.count;
  const [searchParams, setSearchParams] = useSearchParams();

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

  const paginationButtonHandler = (e) => {
    const paginationNumber = e.target.textContent;
    let newOffsetValue = (paginationNumber - 1) * listItemsLimit;
    newOffsetValue=newOffsetValue!==0? newOffsetValue : null
    const updatedUrl = changeUrlParam(urlState, "offset", newOffsetValue);
    setUrlState(updatedUrl);
  };

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
