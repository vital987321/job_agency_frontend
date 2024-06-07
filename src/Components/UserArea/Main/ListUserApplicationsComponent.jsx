import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../css/listUserApplications.css";
import { stringToDateDMY, identifyWorkingHours } from "../../../funcs.js";
import { LIST_APPLICATIONS_BASE_URL } from "../../../constants.js";
import api from "../../api.jsx";

export const ListUserApplicationsComponent = () => {
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
      return <span className="status-marker-rejected">&#11044;</span>;
    if (props.status == "Approved")
      return <span className="status-marker-approved">&#11044;</span>;
    return <span className="status-marker-pending">&#11044;</span>;
  };

  return (
    <section className="list-applications-container">
      <table className="list-applications-table">
        <tbody>
          {applicationsListData.map((application) => {
            return (
              <tr className="applications-table-tr" key={application.id}>
                <td>
                  {application.vacancy_details.name.length < 30
                    ? application.vacancy_details.name
                    : application.vacancy_details.name.slice(0, 25) + "..."}
                </td>
                <td>{application.vacancy_details.salary} CZK</td>
                <td>{application.vacancy_details.location}</td>
                <td>
                  <span className="application-status">{application.status}</span>
                  <StatusMarker status={application.status} />
                </td>

                <td>{stringToDateDMY(application.created_at)}</td>
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
      <div className="applications-list-pagination-container">
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
