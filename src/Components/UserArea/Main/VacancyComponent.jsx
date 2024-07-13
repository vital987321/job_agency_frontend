import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import salaryIcon from "../../../svg/salary.svg";
import locationIcon from "../../../svg/location.svg";
import contractTypeIcon from "../../../svg/contract_type.svg";
import workingHoursIcon from "../../../svg/working_hours.svg";
import passportIcon from "../../../svg/open-passport-svgrepo-com.svg";
import visaServiceIcon from "../../../svg/visa-service.svg";
import genderIcon from "../../../svg/gender.svg";
import factoryIcon from "../../../svg/factory.svg";
import idIcon from "../../../svg/id_item.svg";
import iconHeartFull from "../../../svg/heart_full.svg";
import iconHeartEmpty from "../../../svg/heart_empty.svg";

import "../../../css/vacancy.css";
import { RESIDENCE_TYPES } from "../../../constants";
import { stringToDateDMY, identifyWorkingHours } from "../../../funcs";
import { ApplicationFormComponent } from "./ApplicationFormComponent";
import api from "../../api";

const user_id = JSON.parse(localStorage.getItem("user_id"));

function listSectors(sector_name) {
  if (sector_name !== undefined) {
    if (sector_name.length === 0) {
      return "-";
    }
    if (sector_name.length >= 1) {
      const sectorArray = sector_name.map((item) => item.name);
      return sectorArray.join(", ");
    }
  }
}

function checkResidence(vacancyData) {
  if (vacancyData.residence_type) {
    return (
      <div className="vacancy-item">
        <div>
          <img src={passportIcon} alt="Logo" />
        </div>
        <div>
          <p>MINIMAL RESIDENCE TYPE</p>
          <p className="vacancy-parameter-value">
            {RESIDENCE_TYPES[vacancyData.residence_type]}
          </p>
        </div>
      </div>
    );
  }
}

function checkVisaAssistance(vacancyData) {
  if (vacancyData.visa_assistance != null) {
    const message = vacancyData.visa_assistance ? "Yes" : "No";
    return (
      <div className="vacancy-item">
        <div>
          <img src={visaServiceIcon} alt="Logo" />
        </div>
        <div>
          <p>VISA ASSISTANCE</p>
          <p className="vacancy-parameter-value">{message}</p>
        </div>
      </div>
    );
  }
}

export const VacancyDataComponent = (props) => {
  const [favouriteIcon, setFavouriteIcon] = useState(iconHeartEmpty);
  const { vacancy_id } = useParams();

  useEffect(() => {
    if (Object.keys(props.vacancyData).length === 0) {
      const url = "http://127.0.0.1:8000/vacancy/" + vacancy_id;

      const fetchVacancyData = async () => {
        try {
          const resp = await api
            .get(url)
            .then((response) => props.setVacancyData(response.data))
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      };
      fetchVacancyData();
    }
  }, []);

  // useEffect(()=>{
  //   if (user_id) {
  //     if (props.userData.favourites) {
  //       if (props.userData.favourites.includes(props.vacancyData.id)) {
  //         setFavouriteIcon(iconHeartFull);
  //       }
  //     }}
  // },[])

  const FavouriteComponent = (props) => {
    if (user_id) {
      if (props.userData.favourites) {
        if (props.userData.favourites.includes(props.vacancyData.id)) {
          props.setFavouriteIcon(iconHeartFull);
        }
      }
      return (
        <button className="vacancy-favorite-button" title="Add to Favourite">
          <img src={favouriteIcon} className="heart-filter" alt="Favorite" />
        </button>
      );
    }
  };

  return (
    <>
      <section className="vacancy-section">
        <div className="vacancy-pre-header-container">
          <p>Published: {stringToDateDMY(props.vacancyData.created_at)}</p>
          <FavouriteComponent
            userData={props.userData}
            vacancyData={props.vacancyData}
            setFavouriteIcon={setFavouriteIcon}
          />
        </div>

        {(() => {
          if (props.vacancyData.active == false) {
            return (
              <div>
                Vacancy <b>Diactivated</b>
              </div>
            );
          }
        })()}

        <h2 className="vacancy-header h2-common">{props.vacancyData.name}</h2>

        <div className="vacancy-container">
          <div className="vacancy-item">
            <div>
              <img src={idIcon} alt="Logo" />
            </div>
            <div>
              <p>VACANCY ID</p>
              <p className="vacancy-parameter-value">{props.vacancyData.id}</p>
            </div>
          </div>

          <div className="vacancy-item">
            <div>
              <img src={salaryIcon} alt="Logo" />
            </div>
            <div>
              <p>SALARY</p>
              <p className="vacancy-parameter-value">
                {props.vacancyData.salary} CZK/month
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
                {props.vacancyData.location}
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
                {props.vacancyData.contract_type}
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
                {identifyWorkingHours(
                  props.vacancyData.hours_from,
                  props.vacancyData.hours_to
                )}
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
                {props.vacancyData.gender}
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
                {listSectors(props.vacancyData.sector_name)}
              </p>
            </div>
          </div>

          {checkResidence(props.vacancyData)}
          {checkVisaAssistance(props.vacancyData)}
        </div>

        <div className="vacancy-container">
          <div>
            <h2>Description</h2>
            <div className="discription-text-container">
              <p>{props.vacancyData.description}</p>
            </div>
          </div>

          <div>
            <h2>Requirements</h2>
            <div className="discription-text-container">
              <p>{props.vacancyData.requirements}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const VacancyComponent = (props) => {
  const [AppFormDisplayValue, setAppFormDisplayValue] = useState("none");
  const [userData, setUserData] = useState({});
  const [vacancyData, setVacancyData] = useState({});
  const applyButtonHandler = () => {
    setAppFormDisplayValue("flex");
  };

  useEffect(() => {
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

  return (
    <>
      <VacancyDataComponent
        vacancyData={vacancyData}
        setVacancyData={setVacancyData}
        userData={userData}
      />
      <div className="vacancy-apply-button-container">
        <button
          className="vacancy-apply-button button-common button-common-color1"
          onClick={applyButtonHandler}
        >
          Apply
        </button>
      </div>
      <ApplicationFormComponent
        AppFormDisplayValue={AppFormDisplayValue}
        vacancy={vacancyData}
        setAppFormDisplayValue={setAppFormDisplayValue}
        userData={userData}
      />
    </>
  );
};
