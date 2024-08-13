import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./listUserApplications.module.css";
import { stringToDateConverter } from "../../../../../services/utils/stringToDateConverter.js";
import { LIST_APPLICATIONS_BASE_URL, USER_LIST_ITEMS_LIMIT } from "../../../../../data/constants.js";
import api from "../../../../../services/api/api.jsx";
import { ApplicationStatusMarker } from "../../../../../environmentCommon/components/applicationStatusMarker/ApplicationStatusMarker.jsx";
import { ButtonType1 } from "../../../../../environmentCommon/components/buttons/buttonType1/ButtonType1.jsx";
import { PaginationComponent } from "../../../../../environmentCommon/features/pagination/Pagination.jsx";

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

  return (
    <section className={styles["list-applications-container"]}>
      <table className={styles["list-applications-table"]}>
        <tbody>
          {applicationsListData.map((application) => {
            return (
              <tr className={styles["applications-table-tr"]} key={application.id}>
                <td>
                  {application.vacancy_details.name.length < 30
                    ? application.vacancy_details.name
                    : application.vacancy_details.name.slice(0, 25) + "..."}
                </td>
                <td>{application.vacancy_details.salary} CZK</td>
                <td>{application.vacancy_details.location}</td>
                <td>
                  <span className={styles["application-status"]}>
                    {application.status}
                  </span>
                  <ApplicationStatusMarker status={application.status} />
                </td>

                <td>{stringToDateConverter(application.created_at)}</td>
                <td>
                  <Link
                    to={"/applications/" + application.id}
                  >
                    <ButtonType1
                      value='Details'
                      strength='4'
                    />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <PaginationComponent
          responseData={applicationsResponseData}
          listItemsLimit={USER_LIST_ITEMS_LIMIT}
          urlState={applicationsListRequestUrl}
          setUrlState={setApplicationListRequestUrl}
          paginationClass={styles["applications-list-pagination-container"]}
        />
    </section>
  );
};
