import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api/api";
import "./ListVacancies.css";
import { stringToDateConverter } from "../../../services/utils/stringToDateConverter";
import { workingHoursRange } from "../../../services/utils/workingHoursRange";
import { ButtonType1 } from "../../components/buttons/buttonType1/ButtonType1";

export const ListVacancies = (props) => {
  //* Props
  //    listVacanciesRequestUrl
  //    setVacanciesResponseData
  //    vacancyListChangedState
  //    listVacanciesRequestUrl


  const [vacanciesList, setVacanciesList] = useState([]);

  useEffect(() => {
    const fetchVacancyList = async () => {
      try {
        const request = await api
          .get(props.listVacanciesRequestUrl)
          .then((response) => {
            setVacanciesList(response.data.results);
            return response;
          })
          .then((response) => {
            if (props.setVacanciesResponseData)
              props.setVacanciesResponseData(response.data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    fetchVacancyList();
  }, [props.listVacanciesRequestUrl, props.vacancyListChangedState]);
  return (
    <div className="vacancies-list-container">
      <div className="list-vacancies-table">
        <ul>
          {vacanciesList.map((vacancy) => {
            return (
              <li className="vacancy-list-row" key={vacancy.id}>
                <div className="vacancy-name">
                  {vacancy.name.length < 30
                    ? vacancy.name
                    : vacancy.name.slice(0, 25) + "..."}
                </div>
                <div>{vacancy.location}</div>
                <div className="skip-mobile">{vacancy.gender}</div>
                <div>{vacancy.salary} CZK</div>
                <div className="skip-mobile">{vacancy.contract_type}</div>
                <div className="skip-tablet">
                  {workingHoursRange(vacancy.hours_from, vacancy.hours_to)}
                </div>
                <div className="skip-tablet">{stringToDateConverter(vacancy.created_at)}</div>
                <div className="details-button">
                  <Link
                    to={"/vacancies/" + vacancy.id}
                    className="details-link"
                  >
                    <ButtonType1 value='Details' strength='4'/>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
