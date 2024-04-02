import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import salaryIcon from "../../svg/salary.svg";
import locationIcon from "../../svg/location.svg";
import contractTypeIcon from "../../svg/contract_type.svg";
import workingHoursIcon from "../../svg/working_hours.svg";
import "./Vacancy.css";
import { stringToDateDMY, identifyWorkingHours } from "../../funcs";
import { ApplicationFormComponent } from "./ApplicationFormComponent";

function listSectors(sector_name) {
    if (sector_name !== undefined) {
        if (sector_name.length === 0) {
            return "-";
        }
    if (sector_name.length >= 1) {
        const sectorArray = sector_name.map((item) => item.name)
        return sectorArray.join(', ')
        }
    }
}

function checkResidence(vacancy) {
  if (vacancy.residence_type) {
    return (
      <div className="vacancy-item">
        <div>
          <img src={workingHoursIcon} alt="Logo" />
        </div>
        <div>
          <p>MINIMAL RESIDENCE TYPE</p>
          <p>
            <b>{vacancy.residence_type}</b>
          </p>
        </div>
      </div>
    );
  }
}

function checkVisaAssistance(vacancy) {
  if (vacancy.visa_assistance != null) {
    const message = vacancy.visa_assistance ? 'Yes' : 'No'
    return (
      <div className="vacancy-item">
        <div>
          <img src={workingHoursIcon} alt="Logo" />
        </div>
        <div>
          <p>VISA ASSISTANCE</p>
          <p>
            <b>{message}</b>
          </p>
        </div>
      </div>
    );
  }
}


export const ApplicationComponent = () => {
//   const [AppFormDisplayValue, setAppFormDisplayValue]=useState('none')
  const { application_id } = useParams();
  const [application, setApplication] = useState({});
  const url = "http://127.0.0.1:8000/application/" + application_id;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setVacancy(response.data))
        // .then(() => console.log(vacancy))
      .catch((err) => console.log(err));
  }, []);

//   const applyButtonHandler=()=>{
//     setAppFormDisplayValue('flex')
//   }

  return (
    <>
      <h2 className="h2-main">{vacancy.name}</h2>
      <div className="vacancy-container">
        <div className="vacancy-item">
          <div>
            <img src={salaryIcon} alt="Logo" />
          </div>
          <div>
            <p>SALARY</p>
            <p>
              <b>{vacancy.salary} CZK/month</b>
            </p>
          </div>
        </div>

        <div className="vacancy-item">
          <div>
            <img src={locationIcon} alt="Logo" />
          </div>
          <div>
            <p>LOCATION</p>
            <p>
              <b>{vacancy.location}</b>
            </p>
          </div>
        </div>

        <div className="vacancy-item">
          <div>
            <img src={contractTypeIcon} alt="Logo" />
          </div>
          <div>
            <p>CONTRACT TYPE</p>
            <p>
              <b>{vacancy.contract_type}</b>
            </p>
          </div>
        </div>

        <div className="vacancy-item">
          <div>
            <img src={workingHoursIcon} alt="Logo" />
          </div>
          <div>
            <p>WORKING HOURHS</p>
            <p>
              <b>
                {identifyWorkingHours(vacancy.hours_from, vacancy.hours_to)}
              </b>
            </p>
          </div>
        </div>

        <div className="vacancy-item">
          <div>
            <img src={workingHoursIcon} alt="Logo" />
          </div>
          <div>
            <p>GENDER</p>
            <p>
              <b>{vacancy.gender}</b>
            </p>
          </div>
        </div>

        <div className="vacancy-item">
          <div>
            <img src={workingHoursIcon} alt="Logo" />
          </div>
          <div>
            <p>ACTUALIZATION</p>
            <p>
              <b>{stringToDateDMY(vacancy.created_at)}</b>
            </p>
          </div>
        </div>

        <div className="vacancy-item">
          <div>
            <img src={workingHoursIcon} alt="Logo" />
          </div>
          <div>
            <p>SECTOR</p>
            <p>
              <b>{listSectors(vacancy.sector_name)}</b>
            </p>
          </div>
        </div>
        {checkResidence(vacancy)}
        {checkVisaAssistance(vacancy)}
      </div>

      <div className="vacancy-container">
        <div>
          <h3>Description</h3>
          <div>
            <p>{vacancy.description}</p>
          </div>
        </div>

        <div>
          <h3>Requirements</h3>
          <div>
            <p>{vacancy.requirements}</p>
          </div>
        </div>
      </div>
      <button onClick={applyButtonHandler}>Apply</button>
      <ApplicationFormComponent AppFormDisplayValue={AppFormDisplayValue} vacancy={vacancy} setAppFormDisplayValue={setAppFormDisplayValue}/>
    </>
  );
};
