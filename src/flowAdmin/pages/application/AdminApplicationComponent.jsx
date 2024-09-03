import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import contractTypeIcon from "../../../assets/svg/contract_type.svg";
import callIcon from "../../../assets/svg/call_icon.svg";
import emailIcon from "../../../assets/svg/email_icon.svg";
import editIcon from "../../../assets/svg/edit.svg";
import companyIcon from "../../../assets/svg/company.svg";
import idIcon from "../../../assets/svg/id_item.svg";
import infoIcon from "../../../assets/svg/info_icon.svg";
import userIdIcon from "../../../assets/svg/user_id.svg";
import userIcon from "../../../assets/svg/user_icon.svg";
import workingHoursIcon from "../../../assets/svg/working_hours.svg";
import { stringToDateConverter } from "../../../services/utils/stringToDateConverter";
import "./adminApplication.css";
import api from "../../../services/api/api";
import { ApplicationStatusMarker } from "../../../commonItems/components/applicationStatusMarker/ApplicationStatusMarker";
import { ButtonType1 } from "../../../commonItems/components/buttons/buttonType1/ButtonType1";

export const AdminApplicationComponent = () => {
  const { application_id } = useParams();
  const [application, setApplication] = useState(null);
  const url = "http://127.0.0.1:8000/application/" + application_id+'/';

  
  const setApplicationSeen = async (applicationResponseData)=>{
    if (!applicationResponseData.seen){
      try {
        const request = await api
        .patch(url, {"seen":true})
        .then((response)=>console.log('Application is changed to Seen.'))  
      }catch(error) {console.log(error)}
    }
  }

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const request = await api
          .get(url)
          .then((response) => {
            setApplication(response.data)
            return response.data
          })
          .then((applicationResponseData)=>setApplicationSeen(applicationResponseData))
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplication();
  }, []);

  if (!application) {
    return <div>Loading data</div>;
  }



  const changeApplicationStatusRequest = (e) => {
    const url = "http://127.0.0.1:8000/application/" + application_id + "/";

    try {
      api
        .patch(url, { status: e.target.dataset.buttondataset })
        .then((response) => setApplication(response.data))
        .catch((error) => console.log(error));
    } catch {
      console.log("chengeApplicationStatus");
    }
  };

  return (
    <section className="admin-application-section">
      <h2 className="admin-application-header">Application</h2>
      <div className="admin-application-id-container">
        <p>
          Application ID: <b>{application.id}</b>
        </p>
      </div>
      <div className="admin-application-data-container">
        <div className="admin-application-data-item">
          <div>
            <img src={contractTypeIcon} alt="Logo" />
          </div>
          <div className="admin-application-data-item-block">
            <p>VACANCY</p>
            <p>
              <b>{application.vacancy_details.name}</b>
            </p>
          </div>
        </div>

        <div className="admin-application-data-item">
          <div>
            <img src={idIcon} alt="Logo" />
          </div>
          <div className="admin-application-vacancy-id-container">
            <div className="admin-application-data-item-block">
              <p>VACANCY ID</p>
              <p>
                <b>{application.vacancy}</b>
              </p>
            </div>
            <div>
              <Link
                to={"/admin/vacancies/" + application.vacancy}
                className="navLinks admin-application-vacancy-details-link"
                key="contacts"
              >
                <ButtonType1 value="Details" strength="3" />
              </Link>
            </div>
          </div>
        </div>

        <div className="admin-application-data-item">
          <div>
            <img src={workingHoursIcon} alt="Logo" />
          </div>
          <div className="admin-application-data-item-block">
            <p>CREATED</p>
            <p>
              <b>{stringToDateConverter(application.created_at)}</b>
            </p>
          </div>
        </div>

        <div className="admin-application-data-item">
          <div>
            <img src={companyIcon} alt="Logo" />
          </div>
          <div className="admin-application-data-item-block">
            <p>COMPANY</p>
            <p>
              <b>{application.vacancy_details.partner_data? application.vacancy_details.partner_data.company: '-'}</b>
            </p>
          </div>
        </div>

        <div className="admin-application-data-item">
          <div>
            <img src={userIcon} alt="Logo" />
          </div>
          <div className="admin-application-data-item-block">
            <p>USER NAME</p>
            <p>
              <b>
                {application.first_name || application.last_name
                  ? application.first_name + " " + application.last_name
                  : "-"}
              </b>
            </p>
          </div>
        </div>

        <div className="admin-application-data-item">
          <div>
            <img src={userIdIcon} alt="Logo" />
          </div>
          <div className="admin-application-data-item-block">
            <p>USER ID</p>
            <p>
              <b>{application.user}</b>
            </p>
          </div>
        </div>

        <div className="admin-application-data-item">
          <div>
            <img src={emailIcon} alt="Logo" />
          </div>
          <div className="admin-application-data-item-block">
            <p>EMAIL</p>
            <p>
              <b>{application.email}</b>
            </p>
          </div>
        </div>

        <div className="admin-application-data-item">
          <div>
            <img src={callIcon} alt="Logo" />
          </div>
          <div className="admin-application-data-item-block">
            <p>PHONE</p>
            <p>
              <b>{application.phone ? application.phone : "-"}</b>
            </p>
          </div>
        </div>

        <div className="admin-application-data-item">
          <div>
            <img src={editIcon} alt="Logo" />
          </div>
          <div className="admin-application-data-item-block">
            <p>CV</p>
            {application.cv ? (
              <a className="navLinks" href={application.cv}>
                <b>CV file</b>
              </a>
            ) : (
              "-"
            )}
          </div>
        </div>
        <div className="admin-application-data-item">
          <div>
            <img src={infoIcon} alt="Logo" />
          </div>
          <div className="admin-application-data-item-block">
            <p>STATUS</p>
            <p>
              <b>{application.status}</b>
              <ApplicationStatusMarker status={application.status} />
            </p>
          </div>
        </div>
      </div>

      <div className="admin-application-message-block">
        <h3>Message</h3>
        <div className="adnin-application-message-container">
          <p>{application.message ? application.message : "-"}</p>
        </div>
      </div>
      <div className="admin-application-status-buttons-container">
        <ButtonType1
          value="Approve"
          onClickHandler={changeApplicationStatusRequest}
          strength="1"
          buttonDatasetValue="Approved"
          buttonClass="admin-application-status-button"
        />
        <ButtonType1
          value="Reject"
          onClickHandler={changeApplicationStatusRequest}
          strength="1"
          buttonDatasetValue="Rejected"
          buttonClass="admin-application-status-button"
        />
        <ButtonType1
          value="Pending"
          onClickHandler={changeApplicationStatusRequest}
          strength="1"
          buttonDatasetValue="Pending"
          buttonClass="admin-application-status-button"
        />
      </div>
    </section>
  );
};
