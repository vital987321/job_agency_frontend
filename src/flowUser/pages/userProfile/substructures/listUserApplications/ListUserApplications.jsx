import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ListUserApplications.module.css";
import { stringToDateConverter } from "../../../../../services/utils/stringToDateConverter.js";
import { LIST_APPLICATIONS_BASE_URL, USER_LIST_ITEMS_LIMIT } from "../../../../../data/constants.js";
import api from "../../../../../services/api/api.jsx";
import { ApplicationStatusMarker } from "../../../../../commonItems/components/applicationStatusMarker/ApplicationStatusMarker.jsx";
import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/ButtonType1.jsx";
import { PaginationComponent } from "../../../../../commonItems/features/pagination/Pagination.jsx";

export const ListUserApplications = () => {
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

  if (applicationsListData.length===0){
    return ""
  }

  return (
    <section className={styles["list-applications-container"]}>
      
      <h3 className={styles["profile-sent-applications-header"]}>My Applications</h3>
      <ul className={styles["list-applications-table"]}>
        
          {applicationsListData.map((application) => {
            return (
              <li className={styles["applications-row"]} key={application.id}>
                <div className={styles["vacancy-name"]}>
                  {application.vacancy_details.name.length < 30
                    ? application.vacancy_details.name
                    : application.vacancy_details.name.slice(0, 25) + "..."}
                </div>
                <div>{application.vacancy_details.salary} CZK</div>
                <div>{application.vacancy_details.location}</div>
                <div>
                  <span className={styles["application-status"]}>
                    {application.status}
                  </span>
                  <ApplicationStatusMarker status={application.status} />
                </div>

                <div className={styles["desk-top-only"]}>{stringToDateConverter(application.created_at)}</div>
                <div>
                  <Link
                    to={"/applications/" + application.id}
                  >
                    <ButtonType1
                      value='Details'
                      strength='4'
                    />
                  </Link>
                </div>
              </li>
            );
          })}
        
      </ul>
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
