import React, { useEffect, useState } from "react";
import axios from 'axios'

function string_to_date_dmy(string_date) {
  const date = new Date(string_date)
  return date.getDate() +"-"+ date.getMonth() +"-" + date.getFullYear()
}

function identify_working_hours(hours_from, hours_to) {
  if (hours_from == null) {
    console.log("hours_from inside condition ")
    hours_from = ''
    console.log("hours_from in if: ", hours_from);
  }
  if (hours_to == null) {
    hours_to = ''
  };
  console.log("hours_from: ", hours_from);
  console.log("hours_to: ", hours_to);
  return hours_from.slice(0,5) + " - " + hours_to.slice(0,5)
}

export const VacanciesComponent = () => {
  const [data, setData]=useState([])
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/vacancy")
      .then(res => setData(res.data))
      .then(()=>console.log(data))
      .catch((err) => console.log(err));
    },[]
  )
  return (
    <div className="vacancies-container">
      <h2 className="h2-main-header">Vacancies</h2>
      <table className="vacancy-table">
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
                {identify_working_hours(vacancy.hours_from, vacancy.hours_to)}
              </td>
              <td>{string_to_date_dmy(vacancy.created_at)}</td>
              <td>
                <button>Details</button>
              </td>
            </tr>
          );
        })}
        </tbody>
        
      </table>
    </div>
  );
};
