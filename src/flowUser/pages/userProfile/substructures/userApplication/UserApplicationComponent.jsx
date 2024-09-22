import React, { useEffect, useState } from "react";
import api from "../../../../../services/api/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import salaryIcon from "../../../../../assets/svg/salary.svg";
import locationIcon from "../../../../../assets/svg/location.svg";
import contractTypeIcon from "../../../../../assets/svg/contract_type.svg";
import callIcon from "../../../../../assets/svg/call_icon.svg";
import emailIcon from "../../../../../assets/svg/email_icon.svg";
import genderIcon from "../../../../../assets/svg/gender.svg";
import editIcon from "../../../../../assets/svg/edit.svg";
import "./userApplication.css";
import workingHoursIcon from "../../../../../assets/svg/working_hours.svg";
import { stringToDateConverter } from "../../../../../services/utils/stringToDateConverter";
import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/ButtonType1";

export const UserApplicationComponent = () => {
  //* States
  const [application, setApplication] = useState(null);

  //* Hooks
  const { application_id } = useParams();
  const navigate = useNavigate();

  //* Variables
  const url = "http://127.0.0.1:8000/application/" + application_id + "/";

  //* useEffects
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

  //* Functions
  const deleteApplicationRequest = () => {
    try {
      api
        .delete(url)
        .then((response) => {
          alert("Application was deleted.");
        })
        .then((res) => {
          navigate("/profile/");
        });
    } catch {
      console.log("Error while sending delete application request");
    }
  };

  //* Main Body
  if (!application) {
    return <div>Loading data</div>;
  }
  return (
    <section className="user-application-section">
      <div className="user-application-header-line-container">
        <h2 className="user-application-header">Sent application</h2>
        <ButtonType1
          value="Delete"
          onClickHandler={deleteApplicationRequest}
          strength="2"
        />
      </div>
      <div className="application-sent-date-container">
        <p>sent on: {stringToDateConverter(application.created_at)}</p>
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
          <Link to={"/vacancies/" + application.vacancy} key="contacts">
            <ButtonType1 value="Vacancy details" strength="3" />
          </Link>
        </div>
      </div>
    </section>
  );
};
