import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import '../../css/main.css'
import { stringToDateDMY, identifyWorkingHours } from "../../funcs";

export const ListApplicationsComponent = () => {
  const [data, setData]=useState([])
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/application/")
      .then(response => setData(response.data.results))
      // .then(()=>console.log(data))
      .catch((err) => console.log(err));
    },[]
  )
  return (
    <div className="list-applications-container">
      <h2 className="h2-main-header">Applications</h2>
      <table className="list-table">
        <tbody >
          {data.map(application => {
          return (
            <tr key={application.id}>
              <td>{application.vacancy}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.phone}</td>
              <td>{application.email}</td>
              <td>{application.message.slice(0,15)+'...'}</td>
              <td>{stringToDateDMY(application.created_at)}</td>
              <td>
                <Link to={"/applications/"+application.id} className="details-link">
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
