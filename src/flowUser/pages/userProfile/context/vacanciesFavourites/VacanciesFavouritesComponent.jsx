import { ListVacanciesComponent } from "../../../../../commonItems/features/listVacancies/ListVacanciesComponent";
import { LIST_VACANCIES_BASE_URL, USER_LIST_ITEMS_LIMIT } from "../../../../../data/constants";
import { useState } from "react";
import { PaginationComponent } from "../../../../../commonItems/features/pagination/Pagination";
import styles from "./vacanciesFavourites.module.css";

export const VacanciesFavouritesComponent = (props) => {
  const [listVacanciesRequestUrl, setListVacanciesRequestUrl] = useState(
    LIST_VACANCIES_BASE_URL + "?favourite=true"
  );
  const [vacanciesResponseData, setVacanciesResponseData] = useState([]);

  return (
    <section className={styles["vacancies-favourite-section"]}>
      <h3 className={styles["vacancies-favourite-section-header"]}>
        My Favourite Vacancies
      </h3>
      <ListVacanciesComponent
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
