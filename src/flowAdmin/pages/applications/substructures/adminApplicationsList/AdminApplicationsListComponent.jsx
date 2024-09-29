import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./adminApplicationsList.module.css";
import { stringToDateConverter } from "../../../../../services/utils/stringToDateConverter.js";
import api from "../../../../../services/api/api.jsx";
import { ApplicationStatusMarker } from "../../../../../commonItems/components/applicationStatusMarker/ApplicationStatusMarker.jsx";
import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/buttonType1.jsx";

export const AdminApplicationsListComponent = (props) => {

  //* States
  const [applicationsListData, setApplicationsListData] = useState([]);

  //* UseEffects
  useEffect(() => {
    const fetchListApplications = async () => {
      try {
        const response = await api
          .get(props.adminApplicationListRequestUrl)
          .then((response) => {
            setApplicationsListData(response.data.results);
            return response;
          })
          .then((response) => {
            props.setApplicationsResponseData(response.data);
            return response;
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    fetchListApplications();
  }, [props.adminApplicationListRequestUrl]);

  //* Main body
  return (
    <section className={styles["admin-list-applications-container"]}>
      <table className={styles["admin-list-applications-table"]}>
        <tbody>
          <tr>
            <th className={styles["admin-list-applications-first-header"]}>
              ID
            </th>
            <th>Vacancy Name</th>
            <th>Vac. ID</th>
            <th>Company</th>
            <th>User Name</th>
            <th>Created</th>
            <th>Status</th>
            <th>Details</th>
          </tr>

          {applicationsListData.map((application) => {
            return (
              <tr
                key={application.id}
                className={`${styles["admin-applications-table-tr"]} 
                ${application.seen ? "" : styles["newapplication"]}`}
              >
                <td>{application.id} </td>
                <td>
                  {application.vacancy_details.name.length < 30
                    ? application.vacancy_details.name
                    : application.vacancy_details.name.slice(0, 25) + "..."}
                </td>
                <td>{application.vacancy_details.id}</td>
                <td>
                  {application.vacancy_details.partner_data
                    ? application.vacancy_details.partner_data.company
                    : ""}
                </td>
                <td>{application.first_name + " " + application.last_name}</td>
                <td>{stringToDateConverter(application.created_at)}</td>
                <td>
                  <span className={styles["admin-application-status"]}>
                    {application.status}
                  </span>

                  <ApplicationStatusMarker status={application.status} />
                </td>

                <td>
                  <Link to={"/admin/applications/" + application.id}>
                    <ButtonType1 value="Details" strength="4" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
