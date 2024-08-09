import styles from "./paginationNumberButton.module.css"
import { VACANCY_LIST_LIMIT } from "../../../../../data/constants";
import { useSearchParams } from "react-router-dom";



export const PaginationNumberButton=(props)=>{
    const responseData=props.responseData
    const itemsTotalNumber = responseData.count;

    const [searchParams, setSearchParams] = useSearchParams();

    const generateListVacanciesRequestQueryString = (offset) => {
        let qstr = "";
        qstr += searchParams.get("limit")
          ? "limit=" + searchParams.get("limit")
          : "limit=" + VACANCY_LIST_LIMIT;
        if (isNaN(offset)) {
          qstr += searchParams.get("offset")
            ? "&offset=" + searchParams.get("offset")
            : "&offset=0";
        } else {
          qstr += "&offset=" + offset;
        }
        qstr += "&active=active";
        qstr += searchParams.get("key_search")
          ? "&key_search=" + searchParams.get("key_search")
          : "";
        qstr += searchParams.get("salary_gte")
          ? "&salary_gte=" + searchParams.get("salary_gte")
          : "";
        qstr += searchParams.get("salary_lte")
          ? "&salary_lte=" + searchParams.get("salary_lte")
          : "";
        qstr += searchParams.get("location")
          ? "&location=" + searchParams.get("location")
          : "";
        qstr += searchParams.get("residence_type")
          ? "&residence_type=" + searchParams.get("residence_type")
          : "";
        qstr += searchParams.get("active")
          ? "&active=" + searchParams.get("active")
          : "";
        return qstr;
      };

      
    if (itemsTotalNumber > VACANCY_LIST_LIMIT) {
        let paginationArray = new Array();
        const currentOffset = searchParams.get("offset")
          ? searchParams.get("offset")
          : "0";
        const currentPaginationNumber =
          Math.floor(currentOffset / VACANCY_LIST_LIMIT) + 1;
        const minPaginationNumber = Math.max(1, currentPaginationNumber - 3);
        const maxPaginationNumber = Math.min(
          currentPaginationNumber + 3,
          Math.ceil(itemsTotalNumber / VACANCY_LIST_LIMIT)
        );
  
        for (let i = minPaginationNumber; i <= maxPaginationNumber; i++) {
          paginationArray.push(i);
        }
        return (
          <>
            {paginationArray.map((item) => {
              return (
                <a
                  key={item}
                  className={
                    "vacancies-pagination-link" +
                    (item == currentPaginationNumber
                      ? " current-vacancy-pagination-link"
                      : "")
                  }
                  href={
                    "?" +
                    generateListVacanciesRequestQueryString(
                      (item - 1) * VACANCY_LIST_LIMIT
                    )
                  }
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