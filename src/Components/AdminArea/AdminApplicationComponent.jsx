import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import salaryIcon from "../../svg/salary.svg";
import locationIcon from "../../svg/location.svg";
import contractTypeIcon from "../../svg/contract_type.svg";
import callIcon from "../../svg/call_icon.svg";
import emailIcon from "../../svg/email_icon.svg";
import genderIcon from "../../svg/gender.svg";
import editIcon from "../../svg/edit.svg";

import workingHoursIcon from "../../svg/working_hours.svg";
import { stringToDateDMY, identifyWorkingHours } from "../../funcs";
import "../../css/adminArea/adminApplication.css";
import api from "../api";

export const AdminApplicationComponent = () => {
  const { application_id } = useParams();
  const [application, setApplication] = useState(null);
  const url = "http://127.0.0.1:8000/application/" + application_id;

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await api
          .get(url)
          .then((response) => setApplication(response.data))
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

  const changeApplicationStatusRequest=()=>{
    const url = "http://127.0.0.1:8000/application/" + application_id +"/";
    try{
        api.patch(url,{status: "Approved"})
        .then((res)=>{console.log(res)})
    }catch{console.log('chengeApplicationStatus')}
    
  }

  const approveButtonHandler=()=>{
    changeApplicationStatusRequest()
  }


  return (
    <section className="admin-application-section">
      <h2 className="admin-application-header">Application</h2>
      <div className="admin-application-id-container">
        <p>Application ID: <b>{application.id}</b></p>
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
            <img src={contractTypeIcon} alt="Logo" />
          </div>
          <div className="admin-application-vacancy-id-container">
            <div className="admin-application-data-item-block">
            <p>VACANCY ID</p>
              <p>
                <b>{application.vacancy}</b>
              </p>
          </div>
            <div p>
                <Link
                  to={"/admin/vacancies/" + application.vacancy}
                  className="navLinks button-common button-common-color3 admin-application-vacancy-details-link"
                  key="contacts"
                >
                  Details
                </Link>
              </div>
              
          </div>
          
        </div>

        <div className="admin-application-data-item">
          <div>
            <img src={workingHoursIcon} alt="Logo" />
          </div>
          <div className="admin-application-data-item-block">
            <p>Created</p>
            <p>
              <b>{stringToDateDMY(application.created_at)}</b>
            </p>
          </div>
        </div>

        <div className="admin-application-data-item">
          <div>
            <img src={contractTypeIcon} alt="Logo" />
          </div>
          <div className="admin-application-data-item-block">
            <p>COMPANY</p>
            <p>
              <b>{application.vacancy_details.company}</b>
            </p>
          </div>
        </div>

        <div className="admin-application-data-item">
          <div>
            <img src={genderIcon} alt="Logo" />
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
            <img src={genderIcon} alt="Logo" />
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
          <img src={workingHoursIcon} alt="Logo" />
        </div>
        <div className="admin-application-data-item-block">
          <p>STATUS</p>
          <p>
            <b>{application.status}</b>
          </p>
        </div>
      </div>
      </div>

      <div className="admin-application-data-container">
        <div>
          <h3>Message</h3>
          <div className="adnin-application-message-container">
            <p>{application.message ? application.message : "-"}</p>
          </div>
        </div>
        <div>
          <button onClick={approveButtonHandler}>Approve</button>
          <button>Reject</button>
          <button>Pending</button>
        </div>
      </div>
    </section>
  );
};
