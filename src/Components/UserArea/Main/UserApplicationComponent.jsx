import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import salaryIcon from "../../../svg/salary.svg";
import locationIcon from "../../../svg/location.svg";
import contractTypeIcon from "../../../svg/contract_type.svg";
import callIcon from "../../../svg/call_icon.svg";
import emailIcon from "../../../svg/email_icon.svg";
import genderIcon from "../../../svg/gender.svg";
import editIcon from "../../../svg/edit.svg";
import "../../../css/userApplication.css";
import "../../../css/test.css";

import workingHoursIcon from "../../../svg/working_hours.svg";
import { stringToDateDMY, identifyWorkingHours } from "../../../funcs";

import api from "../../api";

export const UserApplicationComponent = () => {
  const { application_id } = useParams();
  const [application, setApplication] = useState(null);
  const url = "http://127.0.0.1:8000/application/" + application_id + "/";
  const navigate=useNavigate()

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

  const deleteApplicationRequest = () => {
    try {
      api.delete(url)
        .then((response) => { alert("Application was deleted.") })
        .then((res)=>{navigate('/profile/')})
    } catch { console.log('Error while sending delete application request') }
  }

  return (
    <section className="user-application-section">
      <div className="user-application-header-line-container">
        <h2 className="user-application-header">Sent application</h2>
        <button
          className="button-common button-common-color2"
          title="Delete Application"
          onClick={deleteApplicationRequest}
        >
          Delete
        </button>
      </div>
      <div className="application-sent-date-container">
        <p>sent on: {stringToDateDMY(application.created_at)}</p>
      </div>
      <div className="user-application-data-container">
        <div className="user-application-data-item">
          <div>
            <img src={contractTypeIcon} alt="Logo" />
          </div>
          <div className="user-application-data-item-block">
            <p>VACANCY</p>
            <p>
              <b>{application.vacancy_details.name}</b>
            </p>
          </div>
        </div>

        <div className="user-application-data-item">
          <div>
            <img src={workingHoursIcon} alt="Logo" />
          </div>
          <div className="user-application-data-item-block">
            <p>STATUS</p>
            <p>
              <b>{application.status}</b>
            </p>
          </div>
        </div>

        <div className="user-application-data-item">
          <div>
            <img src={salaryIcon} alt="Logo" />
          </div>
          <div className="user-application-data-item-block">
            <p>SALARY</p>
            <p>
              <b>{application.vacancy_details.salary} CZK/month</b>
            </p>
          </div>
        </div>

        <div className="user-application-data-item">
          <div>
            <img src={locationIcon} alt="Logo" />
          </div>
          <div className="user-application-data-item-block">
            <p>LOCATION</p>
            <p>
              <b>{application.vacancy_details.location}</b>
            </p>
          </div>
        </div>

        <div className="user-application-data-item">
          <div>
            <img src={emailIcon} alt="Logo" />
          </div>
          <div className="user-application-data-item-block">
            <p>EMAIL</p>
            <p>
              <b>{application.email}</b>
            </p>
          </div>
        </div>

        <div className="user-application-data-item">
          <div>
            <img src={genderIcon} alt="Logo" />
          </div>
          <div className="user-application-data-item-block">
            <p>NAME</p>
            <p>
              <b>
                {application.first_name || application.last_name
                  ? application.first_name + " " + application.last_name
                  : "-"}
              </b>
            </p>
          </div>
        </div>

        <div className="user-application-data-item">
          <div>
            <img src={callIcon} alt="Logo" />
          </div>
          <div className="user-application-data-item-block">
            <p>PHONE</p>
            <p>
              <b>{application.phone ? application.phone : "-"}</b>
            </p>
          </div>
        </div>

        <div className="user-application-data-item">
          <div>
            <img src={editIcon} alt="Logo" />
          </div>
          <div className="user-application-data-item-block">
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
      </div>

      <div className="user-application-data-container">
        <div>
          <h3>Message</h3>
          <div className="user-application-message-container">
            <p>{application.message ? application.message : "-"}</p>
          </div>
        </div>
        <div>
          <Link
            to={"/vacancies/" + application.vacancy}
            className="navLinks button-common button-common-color1 user-application-vacancy-details-link"
            key="contacts"
          >
            See Vacancy details
          </Link>
        </div>
      </div>
    </section>
  );
};
