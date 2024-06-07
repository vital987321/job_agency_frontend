import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/adminArea/adminApplicationsList.css";
import { stringToDateDMY, identifyWorkingHours } from "../../funcs.js";
import { LIST_APPLICATIONS_BASE_URL } from "../../constants.js";
import api from "../api.jsx";

export const AdminApplicationsListComponent = () => {
  const [applicationsListData, setApplicationsListData] = useState([]);
  const [applicationsResponseData, aetApplicationsResponseData] = useState({
    count: "0",
    next: null,
    previous: null,
  });
  const [applicationsListRequestUrl, setApplicationListRequestUrl] = useState(
    LIST_APPLICATIONS_BASE_URL
  );

  useEffect(() => {
    const fetchListApplications = async () => {
      try {
        const response = await api
          .get(applicationsListRequestUrl)
          .then((response) => {
            setApplicationsListData(response.data.results);
            return response;
          })
          .then((response) => {
            aetApplicationsResponseData({
              ...applicationsResponseData,
              ...{
                count: response.data.count,
                next: response.data.next,
                previous: response.data.previous,
              },
            });
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    fetchListApplications();
  }, [applicationsListRequestUrl]);

  const paginationButtonHandler = (e) => {
    const paginationDirection = e.target.dataset.direction;
    setApplicationListRequestUrl(applicationsResponseData[paginationDirection]);
  };

  const StatusMarker = (props) => {
    if (props.status == "Rejected")
      return <span className="admin-status-marker-rejected">&#11044;</span>;
    if (props.status == "Approved")
          return <span className="admin-status-marker-approved">&#11044;</span>;
    return <span className="admin-status-marker-pending">&#11044;</span>;
  };

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
                <td>{stringToDateDMY(application.created_at)}</td>
                <td>
                  <span className="admin-application-status">{application.status}</span>
                  
                  <StatusMarker status={application.status} />
                </td>

                <td>
                  <Link
                    to={"/applications/" + application.id}
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
      <div className="admin-applications-list-pagination-container">
        {applicationsResponseData.previous ? (
          <button
            onClick={paginationButtonHandler}
            data-direction="previous"
            id="previousApplicationsButton"
            className="applications-pagination-button"
          >
            {"<"} Previous
          </button>
        ) : null}
        {applicationsResponseData.next ? (
          <button
            onClick={paginationButtonHandler}
            data-direction="next"
            id="nextApplicationsButton"
            className="applications-pagination-button"
          >
            Next {">"}
          </button>
        ) : null}
      </div>
    </section>
  );
};
