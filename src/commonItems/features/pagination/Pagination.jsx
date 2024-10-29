
import { PaginationArrowButton } from "./substructures/paginationArrowButton/PaginationArrowButton";
import { PaginationNumberButtons } from "./substructures/PaginationNumberButton/PaginationNumberButtons";

export const PaginationComponent=(props)=>{
    const responseData=props.responseData
    const listItemsLimit=props.listItemsLimit
    const paginationClass=props.paginationClass
    const setUrlState=props.setUrlState
    const urlState=props.urlState
    return(
        <section className={paginationClass}>
            <PaginationArrowButton direction='previous' responseData={responseData} urlState={urlState} setUrlState={setUrlState}/>
            <PaginationNumberButtons responseData={responseData} listItemsLimit={listItemsLimit} urlState={urlState} setUrlState={setUrlState}/>
            <PaginationArrowButton direction='next' responseData={responseData} urlState={urlState} setUrlState={setUrlState}/>
        </section>
    )
}


