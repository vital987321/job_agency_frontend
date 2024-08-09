import styles from "./pagination.module.css"
import { PaginationArowButton } from "./content/paginationArowButton/PaginationArowButton";
import { PaginationNumberButton } from "./content/PaginationNumberButton/paginationNumberButton";

export const PaginationComponent=(props)=>{
    const responseData=props.responseData
    return(
        <section>
            <PaginationArowButton direction='previous' responseData={responseData}/>
            <PaginationNumberButton responseData={responseData}/>
            <PaginationArowButton direction='next' responseData={responseData}/>
        </section>
    )
}



// const PaginationNumberedLinks = () => {
//     const vacanciesTotalNumber = vacanciesResponseData.count;
//     if (vacanciesTotalNumber > VACANCY_LIST_LIMIT) {
//       let paginationArray = new Array();
//       const currentOffset = searchParams.get("offset")
//         ? searchParams.get("offset")
//         : "0";
//       const currentPaginationNumber =
//         Math.floor(currentOffset / VACANCY_LIST_LIMIT) + 1;
//       const minPaginationNumber = Math.max(1, currentPaginationNumber - 3);
//       const maxPaginationNumber = Math.min(
//         currentPaginationNumber + 3,
//         Math.ceil(vacanciesTotalNumber / VACANCY_LIST_LIMIT)
//       );

//       for (let i = minPaginationNumber; i <= maxPaginationNumber; i++) {
//         paginationArray.push(i);
//       }
//       return (
//         <>
//           {paginationArray.map((item) => {
//             return (
//               <a
//                 key={item}
//                 className={
//                   "vacancies-pagination-link" +
//                   (item == currentPaginationNumber
//                     ? " current-vacancy-pagination-link"
//                     : "")
//                 }
//                 href={
//                   "?" +
//                   generateListVacanciesRequestQueryString(
//                     (item - 1) * VACANCY_LIST_LIMIT
//                   )
//                 }
//               >
//                 {item}
//               </a>
//             );
//           })}
//         </>
//       );
//     }
//     return "";
//   };


// export const Pagination=(props)=>{
//     return(
//         <>
//         <div className="vacancies-pagination-previous-container">
//           {(() => {
//             if (vacanciesResponseData.previous !== null)
//               return (
//                 <button
//                   id="previousVacanciesButton"
//                   className="vacancies-pagination-button"
//                   onClick={paginationButtonHandler}
//                 >
//                   {"<"} Previous
//                 </button>
//               );
//           })()}
//         </div>

//         <PaginationNumberedLinks />

//         <div className="vacancies-pagination-previous-container">
//           {(() => {
//             if (vacanciesResponseData.next !== null)
//               return (
//                 <button
//                   className="vacancies-pagination-button"
//                   id="nextVacanciesButton"
//                   onClick={paginationButtonHandler}
//                 >
//                   Next {">"}
//                 </button>
//               );
//           })()}
//         </div>
//         </>
//     )
// }