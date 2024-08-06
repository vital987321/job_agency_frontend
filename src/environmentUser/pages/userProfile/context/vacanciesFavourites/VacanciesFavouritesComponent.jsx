import { ListVacanciesComponent } from "../../../../components/listVacancies/ListVacanciesComponent";
import { LIST_VACANCIES_BASE_URL } from "../../../../../data/constants";
import { useState } from "react";
import "./vacanciesFavourites.css";

export const VacanciesFavouritesComponent = (props) => {
  const [listVacanciesRequestUrl, setListVacanciesRequestUrl] = useState(
    LIST_VACANCIES_BASE_URL + "?favourite=true"
  );
  const [vacanciesResponseData, setVacanciesResponseData] = useState([]);

  const paginationButtonHandler = (e) => {
    const paginationDirection =
      e.target.id === "previousVacanciesButton" ? "previous" : "next";
    setListVacanciesRequestUrl(vacanciesResponseData[paginationDirection]);
  };

  return (
    <section className="vacancies-favourite-section">
      <h3 className="vacancies-favourite-section-header">
        My Favourite Vacancies
      </h3>
      <ListVacanciesComponent
        listVacanciesRequestUrl={listVacanciesRequestUrl}
        setVacanciesResponseData={setVacanciesResponseData}
      />
      <div className="vacancies-favourite-pagination-container">
        <div className="vacancies-pagination-previous-container">
          {(() => {
            if (vacanciesResponseData.previous !== null)
              return (
                <button
                  id="previousVacanciesButton"
                  className="vacancies-pagination-button"
                  onClick={paginationButtonHandler}
                >
                  {"<"} Previous
                </button>
              );
          })()}
        </div>

        <div className="vacancies-pagination-previous-container">
          {(() => {
            if (vacanciesResponseData.next !== null)
              return (
                <button
                  className="vacancies-pagination-button"
                  id="nextVacanciesButton"
                  onClick={paginationButtonHandler}
                >
                  Next {">"}
                </button>
              );
          })()}
        </div>
      </div>
    </section>
  );
};
