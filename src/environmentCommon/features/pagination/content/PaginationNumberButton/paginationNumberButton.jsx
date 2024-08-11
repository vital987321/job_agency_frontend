import styles from "./paginationNumberButton.module.css"
import { useSearchParams } from "react-router-dom";
import { changeUrlParam } from "../../../../../services/utils/changeUrlParam";


export const PaginationNumberButton=(props)=>{
    const responseData=props.responseData
    const itemsTotalNumber = responseData.count
    const listItemsLimit=props.listItemsLimit
    const setRequestUrl=props.setRequestUrl 
    const requestUrl=props.requestUrl

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

        const paginationButtonHandler = (e) => {
            console.log(e)
            const paginationNumber = e.target.textContent
            const newOffsetValue=((paginationNumber - 1) * listItemsLimit)
            const updatedUrl=changeUrlParam(requestUrl, 'offset', newOffsetValue)
            setRequestUrl(updatedUrl)


            
            // if (setCustomState){
            //   setCustomState(responseData[paginationDirection])
            // }
            // else {
            //   const requestQueryString=getQueryString(responseData[paginationDirection])
            //   navigate("?" + requestQueryString);
            // }
          };

        return (
          <>
            {paginationArray.map((item) => {
              return (
              <>
              <button
                onClick={paginationButtonHandler}
              >
                {item}
              </button>
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
              </>
                
              );
            })}
          </>
        );
      }
      return "";
}


// Previous version
// import styles from "./paginationNumberButton.module.css"
// import { useSearchParams } from "react-router-dom";


// export const PaginationNumberButton=(props)=>{
//     const responseData=props.responseData
//     const itemsTotalNumber = responseData.count;
//     const listItemsLimit=props.listItemsLimit 

//     const [searchParams, setSearchParams] = useSearchParams();

//     if (itemsTotalNumber > listItemsLimit) {
//         let paginationArray = new Array();
//         const currentOffset = searchParams.get("offset")
//           ? searchParams.get("offset")
//           : "0";
//         const currentPaginationNumber =
//           Math.floor(currentOffset / listItemsLimit) + 1;
//         const minPaginationNumber = Math.max(1, currentPaginationNumber - 3);
//         const maxPaginationNumber = Math.min(
//           currentPaginationNumber + 3,
//           Math.ceil(itemsTotalNumber / listItemsLimit)
//         );
  
//         for (let i = minPaginationNumber; i <= maxPaginationNumber; i++) {
//           paginationArray.push(i);
//         }


//         const paginationQueryString=(offsetValue)=>{
//             const tempSearchParams=new URLSearchParams(searchParams.toString())
//             tempSearchParams.set('offset', offsetValue)
//             return tempSearchParams.toString()
//         }

//         return (
//           <>
//             {paginationArray.map((item) => {
//               return (
//                 <a
//                   key={item}
//                   className={`${styles["vacancies-pagination-link"]} ${
//                     item == currentPaginationNumber
//                     ? styles["current-vacancy-pagination-link"]
//                     :""
//                     }`}
//                     href={"?" + paginationQueryString((item - 1) * listItemsLimit)}
//                 >
//                   {item}
//                 </a>
//               );
//             })}
//           </>
//         );
//       }
//       return "";
// }