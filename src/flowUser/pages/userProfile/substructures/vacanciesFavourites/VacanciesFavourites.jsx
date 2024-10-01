import { ListVacancies } from "../../../../../commonItems/features/listVacancies/ListVacancies";
import {
  LIST_VACANCIES_BASE_URL,
  USER_LIST_ITEMS_LIMIT,
} from "../../../../../data/constants";
import { useState } from "react";
import { PaginationComponent } from "../../../../../commonItems/features/pagination/Pagination";
import styles from "./VacanciesFavourites.module.css";

export const VacanciesFavourites = () => {
  //* States
  const [listVacanciesRequestUrl, setListVacanciesRequestUrl] = useState(
    LIST_VACANCIES_BASE_URL + "?favourite=true"
  );
  const [vacanciesResponseData, setVacanciesResponseData] = useState([]);

  //* Main Body
  if (vacanciesResponseData.count === 0) {
    return "";
  }
  return (
    <section className={styles["vacancies-favourite-section"]}>
      <h3 className={styles["vacancies-favourite-section-header"]}>
        My Favourite Vacancies
      </h3>
      <ListVacancies
        listVacanciesRequestUrl={listVacanciesRequestUrl}
        setVacanciesResponseData={setVacanciesResponseData}
      />
      <PaginationComponent
        responseData={vacanciesResponseData}
        listItemsLimit={USER_LIST_ITEMS_LIMIT}
        urlState={listVacanciesRequestUrl}
        setUrlState={setListVacanciesRequestUrl}
        paginationClass={styles["vacancies-favourite-pagination-container"]}
      />
    </section>
  );
};
