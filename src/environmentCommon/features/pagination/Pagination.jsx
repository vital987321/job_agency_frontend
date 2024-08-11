import styles from "./pagination.module.css"
import { PaginationArowButton } from "./content/paginationArowButton/PaginationArowButton";
import { PaginationNumberButton } from "./content/PaginationNumberButton/paginationNumberButton";

export const PaginationComponent=(props)=>{
    const responseData=props.responseData
    const listItemsLimit=props.listItemsLimit
    const paginationClass=props.paginationClass
    const setRequestUrl=props.setRequestUrl
    const requestUrl=props.requestUrl
    return(
        <section className={paginationClass}>
            <PaginationArowButton direction='previous' responseData={responseData} setRequestUrl={setRequestUrl}/>
            <PaginationNumberButton responseData={responseData} listItemsLimit={listItemsLimit} requestUrl={requestUrl} setRequestUrl={setRequestUrl}/>
            <PaginationArowButton direction='next' responseData={responseData} setRequestUrl={setRequestUrl}/>
        </section>
    )
}




// Previous version
// import styles from "./pagination.module.css"
// import { PaginationArowButton } from "./content/paginationArowButton/PaginationArowButton";
// import { PaginationNumberButton } from "./content/PaginationNumberButton/paginationNumberButton";

// export const PaginationComponent=(props)=>{
//     const responseData=props.responseData
//     const listItemsLimit=props.listItemsLimit
//     const paginationClass=props.paginationClass
//     return(
//         <section className={paginationClass}>
//             <PaginationArowButton direction='previous' responseData={responseData}/>
//             <PaginationNumberButton responseData={responseData} listItemsLimit={listItemsLimit}/>
//             <PaginationArowButton direction='next' responseData={responseData}/>
//         </section>
//     )
// }
