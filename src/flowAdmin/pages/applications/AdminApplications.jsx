import { AdminApplicationsList } from "./substructures/adminApplicationsList/AdminApplicationsList.jsx";
import styles from "./AdminApplications.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdminApplicatiosFilter } from "./substructures/adminApplicationsFilter/AdminApplicationsFilter.jsx";
import {
  LIST_APPLICATIONS_BASE_URL,
  ADMIN_LIST_ITEMS_LIMIT_DEFAULT,
} from "../../../data/constants.js";
import { useState, useEffect } from "react";
import { PaginationComponent } from "../../../commonItems/features/pagination/Pagination.jsx";
import { generateRequestQueryString } from "../../../services/utils/generateRequestQueryString.js";

export const AdminApplications = () => {

  //* States
  const [currentClientUrl, setCurrentClientUrl] = useState(
    window.location.href
  );
  const [applicationsResponseData, setApplicationsResponseData] = useState({});
  const [adminApplicationListRequestUrl, setAdminApplicationListRequestUrl] =
    useState(LIST_APPLICATIONS_BASE_URL);
  
  //* Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  //* Variables
  const listItemsOnPage = localStorage.getItem("AdminListItemsOnPage")
    ? localStorage.getItem("AdminListItemsOnPage")
    : ADMIN_LIST_ITEMS_LIMIT_DEFAULT;

  //* UseEffects
  useEffect(() => {
    // This hook is nesessary due to filter
    setCurrentClientUrl(window.location.href);
  }, [window.location.href]);

  useEffect(() => {
    if (currentClientUrl !== window.location.href) {
      const params = new URL(currentClientUrl).searchParams;
      navigate(`?${params.toString()}`);
    }
  }, [currentClientUrl]);

  //* Functions
  const generateAdminListApplicationsRequestURL = () => {
    return (
      LIST_APPLICATIONS_BASE_URL +
      "?" +
      generateRequestQueryString(searchParams, listItemsOnPage)
    );
  };

  const updateAdminListApplicationsRequestURL = () => {
    const updatedURL = generateAdminListApplicationsRequestURL();
    if (updatedURL !== adminApplicationListRequestUrl) {
      setAdminApplicationListRequestUrl(updatedURL);
    }
  };

  //* Main Body
  updateAdminListApplicationsRequestURL();

  return (
    <div className={styles["admin-applications-container"]}>
      <AdminApplicatiosFilter />
      <div className={styles["admin-applications-list-container"]}>
        <div>Found: {applicationsResponseData.count} </div>
        <h2 className="h2-common">Applications</h2>
        <AdminApplicationsList
          adminApplicationListRequestUrl={adminApplicationListRequestUrl}
          setApplicationsResponseData={setApplicationsResponseData}
        />
      </div>
      <PaginationComponent
        responseData={applicationsResponseData}
        listItemsLimit={listItemsOnPage}
        paginationClass={styles["admin-applications-pagination-section"]}
        urlState={currentClientUrl}
        setUrlState={setCurrentClientUrl}
      />
    </div>
  );
};
