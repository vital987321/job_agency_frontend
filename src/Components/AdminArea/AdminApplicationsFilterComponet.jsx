import "../../css/adminArea/adminApplicationsFilter.css";
import filterIcon from "../../svg/settings.svg";

export const AdminApplicatiosFilterComponent = () => {
  return (
    <section className="admin-application-filter-section">
      <div className="admin-application-filter-main-container">
        <form className="admin-application-filter-form">
          <div className="admin-application-filter-form-inputs">
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-application-id-input">
                Application ID
              </label>
              <input id="application-filter-application-id-input" type="text" />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-vacancy-id-input">
                Vacancy ID
              </label>
              <input id="application-filter-vacancy-id-input" type="text" />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-vacancy-name-input">
                Vacancy nane
              </label>
              <input id="application-filter-vacancy-name-input" type="text" />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-company-input">Company</label>
              <input id="application-filter-company-input" type="text" />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-user-id-input">User ID</label>
              <input id="application-filter-user-id-input" type="text" />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-first-name-input">
                First Name
              </label>
              <input id="application-filter-first-name-input" type="text" />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-last-name-input">
                Last Name
              </label>
              <input id="application-filter-last-name-input" type="text" />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-phone-input">Phone</label>
              <input id="application-filter-phone-input" type="text" />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-email-input">Email</label>
              <input id="application-filter-email-input" type="text" />
            </div>
            <div className="application-filter-input-container">
              <label htmlFor="application-filter-email-input">Status</label>
              <input id="application-filter-email-input" type="text" />
            </div>
          </div>

          <div className="admin-applications-form-controls">
            <button
              className="applications-filter-button-general button-common button-common-color1"
              //   onClick={filterButtonHandler}
            >
              Filter <img src={filterIcon} alt="" height="14px" />
            </button>
            <div>
            <p>on Page: 10</p>
          </div>
          </div>
        </form>
      </div>
    </section>
  );
};
