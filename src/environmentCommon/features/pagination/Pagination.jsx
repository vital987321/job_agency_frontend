import styles from "./pagination.module.css"
import { PaginationArowButton } from "./content/paginationArowButton/PaginationArowButton";
import { PaginationNumberButton } from "./content/PaginationNumberButton/paginationNumberButton";

export const PaginationComponent=(props)=>{
    const responseData=props.responseData
    const listItemsLimit=props.listItemsLimit
    const paginationClass=props.paginationClass
    return(
        <section className={paginationClass}>
            <PaginationArowButton direction='previous' responseData={responseData}/>
            <PaginationNumberButton responseData={responseData} listItemsLimit={listItemsLimit}/>
            <PaginationArowButton direction='next' responseData={responseData}/>
        </section>
    )
}