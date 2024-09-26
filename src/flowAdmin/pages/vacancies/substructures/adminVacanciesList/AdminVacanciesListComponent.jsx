import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./adminVacanciesList.css";
import { stringToDateConverter } from "../../../../../services/utils/stringToDateConverter";
import api from "../../../../../services/api/api";
import {ButtonType1} from '../../../../../commonItems/components/buttons/buttonType1/ButtonType1'

export const AdminVacanciesListComponent = (props) => {
  //* Props
  //    adminListVacanciesRequestUrl
  //    setVacanciesResponseData
  //    vacancyListChangedState

  //* States
  const [vacanciesList, setVacanciesList] = useState([]);

  //* UseEffects
  useEffect(() => {
    const fetchVacancyList = async () => {
      try {
        const request = await api
          .get(props.adminListVacanciesRequestUrl)
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
  }, [props.adminListVacanciesRequestUrl, props.vacancyListChangedState]);

  //* Main body
  return (
    <div className="admin-vacancies-list-container">
      <table className="admin-list-vacancies-table">
        <tbody>
          <tr>
            <th className="admin-list-vacancies-first-header">ID</th>
            <th>Vacancy Name</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Created</th>
            <th>Active</th>
            <th>Details</th>
          </tr>
          {vacanciesList.map((vacancy) => {
            return (
              <tr className="admin-vacancies-list-tr" key={vacancy.id}>
                <td>{vacancy.id}</td>
                <td>
                  {vacancy.name.length < 30
                    ? vacancy.name
                    : vacancy.name.slice(0, 25) + "..."}
                </td>
                <td>
                  {vacancy.partner_data ? vacancy.partner_data.company : ""}
                </td>
                <td>{vacancy.location}</td>
                <td>{vacancy.salary} CZK</td>
                <td>{stringToDateConverter(vacancy.created_at)}</td>
                <td>{vacancy.active ? "Active" : "Deactivated"}</td>
                <td>
                  <Link
                    to={"" + vacancy.id}
                    className="details-link"
                  >
                    <ButtonType1 value="Details" strength="4" />
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
