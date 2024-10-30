
import { PaginationArrowButton } from "./substructures/paginationArrowButton/PaginationArrowButton";
import { PaginationNumberButtons } from "./substructures/PaginationNumberButton/PaginationNumberButtons";

/**
 * @typedef {object} Props
 * @property {object} responseData
 * @property {number | string} listItemsLimit
 * @property {string} [paginationClass] class name
 * @property {string} urlState
 * @property {function} setUrlState
 * @param {Props} props 
 * @returns {JSX.Element}
 */

export const PaginationComponent=({
    responseData,
    listItemsLimit,
    paginationClass,
    urlState,
    setUrlState
})=>{
    
    return(
        <section className={paginationClass}>
            <PaginationArrowButton direction='previous' responseData={responseData} urlState={urlState} setUrlState={setUrlState}/>
            <PaginationNumberButtons responseData={responseData} listItemsLimit={listItemsLimit} urlState={urlState} setUrlState={setUrlState}/>
            <PaginationArrowButton direction='next' responseData={responseData} urlState={urlState} setUrlState={setUrlState}/>
        </section>
    )
}


