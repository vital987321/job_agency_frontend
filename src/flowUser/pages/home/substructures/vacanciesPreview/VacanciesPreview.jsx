import { ListVacancies } from "../../../../../commonItems/features/listVacancies/ListVacancies.jsx";
import { LIST_VACANCIES_BASE_URL } from "../../../../../data/constants.js";
import { Link } from "react-router-dom";
import styles from "./VacanciesPreview.module.css"

export const VacanciesPreview=()=>{

    const listVacanciesRequestUrl = LIST_VACANCIES_BASE_URL + "?limit=8";

    return (
        <section className={styles["vacancies-list-section"]}>
        <h2 className={`${styles.header} h2-common`}>Vacancies</h2>
        <ListVacancies
          listVacanciesRequestUrl={listVacanciesRequestUrl}
        />
        <div className={styles["vacancies-link-container"]}>
          <Link to="/vacancies" >
            More vacancies
            <span className={styles["vacancies-link-icon"]}>{">"}</span>
          </Link>
        </div>
      </section>
    )
}