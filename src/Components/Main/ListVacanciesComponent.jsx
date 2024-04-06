import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import '../../css/listVacancies.css'
import { stringToDateDMY, identifyWorkingHours } from "../../funcs";

export const ListVacanciesComponent = (props) => {
  const [data, setData]=useState([])
  useEffect(() => {
    axios
      .get(props.listVacanciesRequestUrl)
      .then(res => setData(res.data))
      // .then(()=>console.log(data))
      .catch((err) => console.log(err));
    },[props.listVacanciesRequestUrl]
  )
  return (
    <div className="vacancies-list-container">
      <h2 className="h2-main-header">Vacancies</h2>
      <table className="list-table">
        <tbody>
          {data.map(vacancy => {
          return (
            <tr key={vacancy.id}>
              <td>{vacancy.name}</td>
              <td>{vacancy.location}</td>
              <td>{vacancy.gender}</td>
              <td>{vacancy.salary} CZK</td>
              <td>{vacancy.contract_type}</td>
              <td>
                {identifyWorkingHours(vacancy.hours_from, vacancy.hours_to)}
              </td>
              <td>{stringToDateDMY(vacancy.created_at)}</td>
              <td>
                <Link to={"/vacancies/"+vacancy.id} className="details-link">
                  <button className="details-link-button">Details</button>
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
