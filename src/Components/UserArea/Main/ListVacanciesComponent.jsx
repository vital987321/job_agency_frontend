import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../css/listVacancies.css";
import { stringToDateDMY, identifyWorkingHours } from "../../../funcs";

export const ListVacanciesComponent = (props) => {
  const [vacanciesList, setVacanciesList] = useState([]);
  useEffect(() => {
    axios
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
  }, [props.listVacanciesRequestUrl]);
  return (
    <div className="vacancies-list-container">
      <table className="list-vacancies-table">
        <tbody>
          {vacanciesList.map((vacancy) => {
            return (
              <tr className="vacancy-list-tr" key={vacancy.id}>
                <td>
                  {vacancy.name.length < 30
                    ? vacancy.name
                    : vacancy.name.slice(0, 25) + "..."}
                </td>
                <td>{vacancy.location}</td>
                <td>{vacancy.gender}</td>
                <td>{vacancy.salary} CZK</td>
                <td>{vacancy.contract_type}</td>
                <td>
                  {identifyWorkingHours(vacancy.hours_from, vacancy.hours_to)}
                </td>
                <td>{stringToDateDMY(vacancy.created_at)}</td>
                <td>
                  <Link
                    // to={"/vacancies/" + vacancy.id}
                    to={"" + vacancy.id}
                    className="details-link"
                  >
                    <button className="details-link-button button-common button-common-color4 ">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
