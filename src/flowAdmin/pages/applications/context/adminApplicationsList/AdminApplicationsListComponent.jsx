import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./adminApplicationsList.css";
import { stringToDateConverter } from "../../../../../services/utils/stringToDateConverter.js";
import api from "../../../../../services/api/api.jsx";
import { ApplicationStatusMarker } from "../../../../../commonItems/components/applicationStatusMarker/ApplicationStatusMarker.jsx";

export const AdminApplicationsListComponent = (props) => {
  const [applicationsListData, setApplicationsListData] = useState([]);
  // const [applicationsResponseData, setApplicationsResponseData] = useState({
  //   count: "0",
  //   next: null,
  //   previous: null,
  // });

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

  return (
    <section className="admin-list-applications-container">
      <table className="admin-list-applications-table">
        <tbody>
          <tr>
            <th className="admin-list-applications-first-header">ID</th>
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
              <tr className="admin-applications-table-tr" key={application.id}>
                <td>{application.id} </td>
                <td>
                  {application.vacancy_details.name.length < 30
                    ? application.vacancy_details.name
                    : application.vacancy_details.name.slice(0, 25) + "..."}
                </td>
                <td>{application.vacancy_details.id}</td>
                <td>{application.vacancy_details.company}</td>
                <td>{application.first_name + " " + application.last_name}</td>
                <td>{stringToDateConverter(application.created_at)}</td>
                <td>
                  <span className="admin-application-status">
                    {application.status}
                  </span>

                  <ApplicationStatusMarker status={application.status} />
                </td>

                <td>
                  <Link
                    to={"/admin/applications/" + application.id}
                    className="details-link"
                  >
                    <button className="details-link-button button-common button-common-color4">
                      Details
                    </button>
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
