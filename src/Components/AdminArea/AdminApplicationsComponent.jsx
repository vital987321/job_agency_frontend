import { AdminApplicationsListComponent } from "./AdminApplicationsListComponent";
import "../../css/adminArea/adminApplications.css";
import filterIcon from "../../svg/settings.svg";
import closeIcon from "../../svg/X.svg";
import {useSearchParams} from "react-router-dom"
import { AdminApplicatiosFilterComponent } from "./AdminApplicationsFilterComponet";
import { LIST_APPLICATIONS_BASE_URL } from "../../constants.js";
import { useState } from "react";



export const AdminApplicationsComponent = () => {
  
  const [searchParams, setSearchParams] = useSearchParams()
  const [adminApplicationListRequestUrl, setAdminApplicationListRequestUrl] =
    useState(LIST_APPLICATIONS_BASE_URL);
  
  const generateAdminListApplicationsRequestURL = () => {
    return (
      LIST_APPLICATIONS_BASE_URL +
      "?" +
      generateAdminListApplicationsRequestQueryString()
    );
  };

  const generateAdminListApplicationsRequestQueryString = (offset) => {
    let qstr = "";
    qstr += searchParams.get('id')
      ? "id=" + searchParams.get('id')
      : "";
    // qstr += searchParams.get("limit")
    //   ? "limit=" + searchParams.get("limit")
    //   : "limit=" + VACANCY_LIST_LIMIT;
    // if (isNaN(offset)) {
    //   qstr += searchParams.get("offset")
    //     ? "&offset=" + searchParams.get("offset")
    //     : "&offset=0";
    // } else {
    //   qstr += "&offset=" + offset;
    // }
    // qstr += searchParams.get("key_search")
    //   ? "&key_search=" + searchParams.get("key_search")
    //   : "";
    // qstr += searchParams.get("salary_gte")
    //   ? "&salary_gte=" + searchParams.get("salary_gte")
    //   : "";
    // qstr += searchParams.get("salary_lte")
    //   ? "&salary_lte=" + searchParams.get("salary_lte")
    //   : "";
    // qstr += searchParams.get("location")
    //   ? "&location=" + searchParams.get("location")
    //   : "";
    // qstr += searchParams.get("residence_type")
    //   ? "&residence_type=" + searchParams.get("residence_type")
    //   : "";
    return qstr;
  };

  const updateAdminListApplicationsRequestURL = () => {
    const updatedURL = generateAdminListApplicationsRequestURL();
    if (updatedURL !== adminApplicationListRequestUrl) {
      setAdminApplicationListRequestUrl(updatedURL);
    }
  };

  updateAdminListApplicationsRequestURL();


    const ResetFiltersComponent = () => {
      if (searchParams.size > 0) {
        return (
          <button
            className="applications-filter-button-general cancel-application-filters-button button-common button-common-color3"
            // onClick={resetFiltersHandler}
          >
            Reset Filters
            <img src={closeIcon} alt="" height="14px" />
          </button>
        );
      }
    };

    // const AdminApplicationsToolsComponent = () => {
    //   return (
    //     <section className="admin-applications-tools-section">
    //       <div className="admin-applications-filter-buttons-container">
    //         <button
    //           className="applications-filter-button-general button-common button-common-color1"
    //           //   onClick={filterButtonHandler}
    //         >
    //           Filter <img src={filterIcon} alt="" height="14px" />
    //               </button>
    //            <ResetFiltersComponent />   
    //       </div>
          
    //       <div>
    //         <p>on Page: 10</p>
    //       </div>
    //       <div className="admin-applications-quick-search-container">
    //         <input type="text" placeholder="Quick Search" />
    //       </div>
    //     </section>
    //   );
    // };

    
  return (
    <div className="admin-applications-container">
      <AdminApplicatiosFilterComponent
        
      />
      {/* <AdminApplicationsToolsComponent /> */}
      <div className="admin-applications-list-container">
        <h2 className="h2-common">Applications</h2>
        <AdminApplicationsListComponent adminApplicationListRequestUrl={adminApplicationListRequestUrl}/>
      </div>
    </div>
  );
};
