import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api/api";
import "./ListVacancies.css";
import { stringToDateConverter } from "../../../services/utils/stringToDateConverter";
import { workingHoursRange } from "../../../services/utils/workingHoursRange";
import { ButtonType1 } from "../../components/buttons/buttonType1/ButtonType1";

/**
 * @typedef {object} Props
 * @property {string} listVacanciesRequestUrl
 * @property {function} [setVacanciesResponseData]
 * @property {boolean} [vacancyListChangedState]
 * @param {Props} props 
 * @returns {JSX.Element}
 */


export const ListVacancies = ({listVacanciesRequestUrl, setVacanciesResponseData, vacancyListChangedState}) => {

  //* useStates
  const [vacanciesList, setVacanciesList] = useState([]);
  const [fetchError, setFetchError]=useState(false)
  const [loading, setLoading]=useState(true)

  //* UseEffects
  useEffect(() => {
    const fetchVacancyList = async () => {
      try {
        const request = await api
          .get(listVacanciesRequestUrl)
          .then((response) => {
            setVacanciesList(response.data.results);
            return response;
          })
          .then((response) => {
            if (setVacanciesResponseData)
              setVacanciesResponseData(response.data);
          })
          .catch((err) => {
            console.log(err)
            setFetchError(true)
          })
          .finally((res)=>setLoading(false))
      } catch (error) {
        console.log(error);
      }
    };

    fetchVacancyList();
  }, [listVacanciesRequestUrl, vacancyListChangedState]);
  
  //* MainBody
  if (loading) return <div role="statusBlock" aria-label="loading">Loading...</div>
  if (fetchError) return <div role="statusBlock" aria-label="error">Error.</div>

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
