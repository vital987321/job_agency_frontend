import styles from "./pagination.module.css"
import { PaginationArowButton } from "./content/paginationArowButton/PaginationArowButton";
import { PaginationNumberButton } from "./content/PaginationNumberButton/paginationNumberButton";

export const PaginationComponent=(props)=>{
    const responseData=props.responseData
    const listItemsLimit=props.listItemsLimit
    const paginationClass=props.paginationClass
    const setUrlState=props.setUrlState
    const urlState=props.urlState
    return(
        <section className={paginationClass}>
            <PaginationArowButton direction='previous' responseData={responseData} urlState={urlState} setUrlState={setUrlState}/>
            <PaginationNumberButton responseData={responseData} listItemsLimit={listItemsLimit} urlState={urlState} setUrlState={setUrlState}/>
            <PaginationArowButton direction='next' responseData={responseData} urlState={urlState} setUrlState={setUrlState}/>
        </section>
    )
}


