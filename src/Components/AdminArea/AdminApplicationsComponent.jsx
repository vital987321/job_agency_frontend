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
    // qstr += searchParams.get('id')
    //   ? "id=" + searchParams.get('id')
    //   : "";
    
    let idParam=searchParams.get("id") 
    qstr+= idParam? "id="+ idParam : ""
    
    let vacancyIdParam=searchParams.get('vacancy_id')
    qstr+= vacancyIdParam ? "vacancy_id="+vacancyIdParam : ""
    
    let emailParam=searchParams.get("email")
    qstr+=emailParam ? "email="+ vacancyIdParam : ""

    let statusParam=searchParams.get('status')
    qstr+= statusParam ? "ststus="+ statusParam : ""

    let vacancyNameParam=searchParams.get("vacancy_name")
    qstr+= vacancyNameParam ? "vacancy_name="+vacancyNameParam : ""

    let companyParam=searchParams.get('company')
    qstr+=companyParam? "company="+companyParam :""

    let userIdParam=searchParams.get('user_id')
    qstr+= userIdParam ? "user_id="+ userIdParam : ""
    
    let firstNameParam=searchParams.get('first_name')
    qstr+= firstNameParam ? "first_name=" + firstNameParam : ""

    let lastNameParam=searchParams.get('last_name')
    qstr+= lastNameParam ? "last_name="+lastNameParam : ""

    let phoneParam=searchParams.get('phone')
    qstr+= phoneParam ? "phone="+phoneParam : ""

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
