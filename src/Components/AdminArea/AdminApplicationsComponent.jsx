import { ListUserApplicationsComponent } from "../UserArea/Main/ListUserApplicationsComponent";
import "../../css/adminArea/adminApplications.css";
import filterIcon from "../../svg/settings.svg";
import closeIcon from "../../svg/X.svg";
import {useSearchParams} from "react-router-dom"



export const AdminApplicationsComponent = () => {
  
    const [searchParams, setSearchParams] = useSearchParams()
    
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

    const AdminApplicationsToolsComponent = () => {
      return (
        <section className="admin-applications-tools-section">
          <div className="admin-applications-filter-buttons-container">
            <button
              className="applications-filter-button-general button-common button-common-color1"
              //   onClick={filterButtonHandler}
            >
              Filter <img src={filterIcon} alt="" height="14px" />
                  </button>
               <ResetFiltersComponent />   
          </div>
          
          <div>
            <p>on Page: 10</p>
          </div>
          <div className="admin-applications-quick-search-container">
            <input type="text" placeholder="Quick Search" />
          </div>
        </section>
      );
    };

    
  return (
    <div className="admin-applications-container">
      <AdminApplicationsToolsComponent />
      <div className="admin-applications-list-container">
        <h2 className="h2-common">Applications</h2>
        <ListUserApplicationsComponent />
      </div>
    </div>
  );
};
