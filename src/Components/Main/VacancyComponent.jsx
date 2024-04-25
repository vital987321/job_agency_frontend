import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import salaryIcon from "../../svg/salary.svg";
import locationIcon from "../../svg/location.svg";
import contractTypeIcon from "../../svg/contract_type.svg";
import workingHoursIcon from "../../svg/working_hours.svg";
import passportIcon from "../../svg/open-passport-svgrepo-com.svg";
import visaServiceIcon from "../../svg/visa-service.svg";
import genderIcon from "../../svg/gender.svg";
import factoryIcon from "../../svg/factory.svg";

import "../../css/vacancy.css";
import {RESIDENCE_TYPES} from '../../constants'
import { stringToDateDMY, identifyWorkingHours } from "../../funcs";
import { ApplicationFormComponent } from "./ApplicationFormComponent";
import api from "../api";

const user_id = JSON.parse(localStorage.getItem("user_id"));

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
          <img src={passportIcon} alt="Logo" />
        </div>
        <div>
          <p>MINIMAL RESIDENCE TYPE</p>
          <p  className="vacancy-parameter-value">
            {RESIDENCE_TYPES[vacancy.residence_type]}
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
          <img src={visaServiceIcon} alt="Logo" />
        </div>
        <div>
          <p>VISA ASSISTANCE</p>
          <p  className="vacancy-parameter-value">
            {message}
          </p>
        </div>
      </div>
    );
  }
}


export const VacancyComponent = () => {
  const [AppFormDisplayValue, setAppFormDisplayValue]=useState('none')
  const [vacancy, setVacancy] = useState({});
  const [userData, setUserData]=useState({})
  const { vacancy_id } = useParams();


  const url = "http://127.0.0.1:8000/vacancy/" + vacancy_id;
  useEffect(() => {
    axios
      .get(url)
      .then((res) => setVacancy(res.data))
        // .then(() => console.log(vacancy))
      .catch((err) => console.log(err));
    

    if (user_id) {
      const fetchUser = async () => {
        try {
          const response = await api.get("/user/" + user_id);
          setUserData(response.data);
        } catch (error) {
          console.log(error);
        }
        };
      fetchUser();
    }
    

  }, []);

  const applyButtonHandler=()=>{
    setAppFormDisplayValue('flex')
  }

  return (
    <>
    <section className="vacancy-section">

      <div className="published-date-container">
        <p>Published: {stringToDateDMY(vacancy.created_at)}</p>
      </div>


      <h2 className="vacancy-header h2-common">{vacancy.name}</h2>          

      <div className="vacancy-container">
        <div className="vacancy-item">
          <div>
            <img src={salaryIcon} alt="Logo" />
          </div>
          <div>
            <p>SALARY</p>
            <p className="vacancy-parameter-value">
              {vacancy.salary} CZK/month
            </p>
          </div>
        </div>

        <div className="vacancy-item">
          <div>
            <img src={locationIcon} alt="Logo" />
          </div>
          <div>
            <p>LOCATION</p>
            <p className="vacancy-parameter-value">
              {vacancy.location}
            </p>
          </div>
        </div>

        <div className="vacancy-item">
          <div>
            <img src={contractTypeIcon} alt="Logo" />
          </div>
          <div>
            <p>CONTRACT TYPE</p>
            <p className="vacancy-parameter-value">
              {vacancy.contract_type}
            </p>
          </div>
        </div>

        <div className="vacancy-item">
          <div>
            <img src={workingHoursIcon} alt="Logo" />
          </div>
          <div>
            <p>WORKING HOURHS</p>
            <p className="vacancy-parameter-value">
                {identifyWorkingHours(vacancy.hours_from, vacancy.hours_to)}
            </p>
          </div>
        </div>

        <div className="vacancy-item">
          <div>
            <img src={genderIcon} alt="Logo" />
          </div>
          <div>
            <p>GENDER</p>
            <p className="vacancy-parameter-value">
              {vacancy.gender}
            </p>
          </div>
        </div>

        <div className="vacancy-item">
          <div>
            <img src={factoryIcon} alt="Logo" />
          </div>
          <div>
            <p>SECTOR</p>
            <p className="vacancy-parameter-value">
              {listSectors(vacancy.sector_name)}
            </p>
          </div>
        </div>

        {checkResidence(vacancy)}
        {checkVisaAssistance(vacancy)}

      </div>

      <div className="vacancy-container">
        <div>
          <h2>Description</h2>
          <div className="discription-text-container">
            <p>{vacancy.description}</p>
          </div>
        </div>

        <div>
          <h2>Requirements</h2>
          <div className="discription-text-container">
            <p>{vacancy.requirements}</p>
          </div>
        </div>
      </div>
      <div className="vacancy-apply-button-container">
        <button className="vacancy-apply-button button-common button-common-color1" onClick={applyButtonHandler}>Apply</button>
      </div >
      </section>

      <ApplicationFormComponent 
          AppFormDisplayValue={AppFormDisplayValue} 
          vacancy={vacancy} 
          setAppFormDisplayValue={setAppFormDisplayValue}
          userData={userData}/>
      </>
  );
};
