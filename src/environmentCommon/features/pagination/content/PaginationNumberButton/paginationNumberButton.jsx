import styles from "./paginationNumberButton.module.css"
import { useSearchParams } from "react-router-dom";


export const PaginationNumberButton=(props)=>{
    const responseData=props.responseData
    const itemsTotalNumber = responseData.count;
    const listItemsLimit=props.listItemsLimit 

    const [searchParams, setSearchParams] = useSearchParams();

    if (itemsTotalNumber > listItemsLimit) {
        let paginationArray = new Array();
        const currentOffset = searchParams.get("offset")
          ? searchParams.get("offset")
          : "0";
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


        const paginationQueryString=(offsetValue)=>{
            const tempSearchParams=new URLSearchParams(searchParams.toString())
            tempSearchParams.set('offset', offsetValue)
            return tempSearchParams.toString()
        }

        return (
          <>
            {paginationArray.map((item) => {
              return (
                <a
                  key={item}
                  className={`${styles["vacancies-pagination-link"]} ${
                    item == currentPaginationNumber
                    ? styles["current-vacancy-pagination-link"]
                    :""
                    }`}
                    href={"?" + paginationQueryString((item - 1) * listItemsLimit)}
                >
                  {item}
                </a>
              );
            })}
          </>
        );
      }
      return "";
}