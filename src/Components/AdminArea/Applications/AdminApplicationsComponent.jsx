import { AdminApplicationsListComponent } from "./AdminApplicationsListComponent";
import "../../../css/adminArea/adminApplications.css";
import closeIcon from "../../../svg/X.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdminApplicatiosFilterComponent } from "./AdminApplicationsFilterComponet";
import {
  LIST_APPLICATIONS_BASE_URL,
  ADMIN_APPLICATION_LIST_LIMIT_DEFAULT,
} from "../../../constants.js";
import { useState } from "react";

export const AdminApplicationsComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [adminApplicationListRequestUrl, setAdminApplicationListRequestUrl] =
    useState(LIST_APPLICATIONS_BASE_URL);

  const generateAdminListApplicationsRequestURL = () => {
    return (
      LIST_APPLICATIONS_BASE_URL +
      "?" +
      generateAdminListApplicationsRequestQueryString()
    );
  };
  const [applicationsResponseData, setApplicationsResponseData] = useState({});
  const navigate = useNavigate();

  const generateAdminListApplicationsRequestQueryString = (offset) => {
    let qstr = "";

    const ApplicationsOnPage = localStorage.getItem("ApplicationsOnPage")
      ? localStorage.getItem("ApplicationsOnPage")
      : ADMIN_APPLICATION_LIST_LIMIT_DEFAULT;
    qstr += searchParams.get("limit")
      ? "limit=" + searchParams.get("limit")
      : "limit=" + ApplicationsOnPage;
    if (isNaN(offset)) {
      qstr += searchParams.get("offset")
        ? "&offset=" + searchParams.get("offset")
        : "&offset=0";
    } else {
      qstr += "&offset=" + offset;
    }

    let idParam = searchParams.get("id");
    qstr += idParam ? "&id=" + idParam : "";

    let vacancyIdParam = searchParams.get("vacancy_id");
    qstr += vacancyIdParam ? "&vacancy_id=" + vacancyIdParam : "";

    let emailParam = searchParams.get("email");
    qstr += emailParam ? "&email=" + emailParam : "";

    let statusParam = searchParams.get("status");
    qstr += statusParam ? "&status=" + statusParam : "";

    let vacancyNameParam = searchParams.get("vacancy_name");
    qstr += vacancyNameParam ? "&vacancy_name=" + vacancyNameParam : "";

    let companyParam = searchParams.get("company");
    qstr += companyParam ? "&company=" + companyParam : "";

    let userIdParam = searchParams.get("user_id");
    qstr += userIdParam ? "&user_id=" + userIdParam : "";

    let firstNameParam = searchParams.get("first_name");
    qstr += firstNameParam ? "&first_name=" + firstNameParam : "";

    let lastNameParam = searchParams.get("last_name");
    qstr += lastNameParam ? "&last_name=" + lastNameParam : "";

    let phoneParam = searchParams.get("phone");
    qstr += phoneParam ? "&phone=" + phoneParam : "";

    return qstr;
  };

  const updateAdminListApplicationsRequestURL = () => {
    const updatedURL = generateAdminListApplicationsRequestURL();
    if (updatedURL !== adminApplicationListRequestUrl) {
      setAdminApplicationListRequestUrl(updatedURL);
    }
  };

  updateAdminListApplicationsRequestURL();

  const PaginationNumberedLinks = () => {
    const applivationsTotalNumber = applicationsResponseData.count;
    const applicationsOnPage = localStorage.getItem("ApplicationsOnPage")
      ? localStorage.getItem("ApplicationsOnPage")
      : ADMIN_APPLICATION_LIST_LIMIT_DEFAULT;
    if (applivationsTotalNumber > applicationsOnPage) {
      let paginationArray = new Array();
      const currentOffset = searchParams.get("offset")
        ? searchParams.get("offset")
        : "0";
      const currentPaginationNumber =
        Math.floor(currentOffset / applicationsOnPage) + 1;
      const minPaginationNumber = Math.max(1, currentPaginationNumber - 3);
      const maxPaginationNumber = Math.min(
        currentPaginationNumber + 3,
        Math.ceil(applivationsTotalNumber / applicationsOnPage)
      );
      for (let i = minPaginationNumber; i <= maxPaginationNumber; i++) {
        paginationArray.push(i);
      }
      return (
        <>
          {paginationArray.map((item) => {
            return (
              <a
                key={item}
                className={
                  "applications-pagination-link" +
                  (item == currentPaginationNumber
                    ? " current-aplications-pagination-link"
                    : "")
                }
                href={
                  "?" +
                  generateAdminListApplicationsRequestQueryString(
                    (item - 1) * applicationsOnPage
                  )
                }
              >
                {item}
              </a>
            );
          })}
        </>
      );
    };
    return "";
  };

  const getQueryString = (urlString) => {
    if (urlString) {
      const queryString = urlString.split("?")[1];
      if (queryString) {
        return queryString;
      }
    }
    return "";
  };

  const paginationButtonHandler = (e) => {
    const paginationDirection =
      e.target.id === "previousApplicationsButton" ? "previous" : "next";
    navigate(
      "?" + getQueryString(applicationsResponseData[paginationDirection])
    );
  };

  return (
    <div className="admin-applications-container">
      <AdminApplicatiosFilterComponent />
      <div className="admin-applications-list-container">
        <div>Found: {applicationsResponseData.count} </div>
        <h2 className="h2-common">Applications</h2>
        <AdminApplicationsListComponent
          adminApplicationListRequestUrl={adminApplicationListRequestUrl}
          setApplicationsResponseData={setApplicationsResponseData}
        />
      </div>
      <section className="admin-applications-pagination-section">
        <div className="admin-applications-pagination-previous-container">
          {(() => {
            if (applicationsResponseData.previous !== null) {
              return (
                <button
                  id="previousApplicationsButton"
                  className="applications-pagination-button"
                  onClick={paginationButtonHandler}
                >
                  {"<"} Previous
                </button>
              );
            }
          })()}
        </div>

        <PaginationNumberedLinks />

        <div className="admin-applications-pagination-next-container">
          {(() => {
            if (applicationsResponseData.next !== null) {
              return (
                <button
                  id="nextApplicationsButton"
                  className="applications-pagination-button"
                  onClick={paginationButtonHandler}
                >
                  Next {">"}
                </button>
              );
            }
          })()}
        </div>
      </section>
    </div>
  );
};
