import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api/api";
import idIcon from "../../../assets/svg/id_item.svg";
import salaryIcon from "../../../assets/svg/salary.svg";
import locationIcon from "../../../assets/svg/location.svg";
import contractTypeIcon from "../../../assets/svg/contract_type.svg";
import workingHoursIcon from "../../../assets/svg/working_hours.svg";
import passportIcon from "../../../assets/svg/open-passport-svgrepo-com.svg";
import visaServiceIcon from "../../../assets/svg/visa-service.svg";
import genderIcon from "../../../assets/svg/gender.svg";
import factoryIcon from "../../../assets/svg/factory.svg";
import { stringToDateConverter } from "../../../services/utils/stringToDateConverter";
import { workingHoursRange } from "../../../services/utils/workingHoursRange";
import {
  RESIDENCE_TYPES,
  LIST_VACANCIES_BASE_URL,
} from "../../../data/constants";
import { ButtonFavourite } from "../../components/buttons/buttonFavourite/ButtonFavourite";
import styles from "./VacancyData.module.css";

/**
 * @typedef {object} Props
 * @property {function} setVacancyData
 * @property {object} userData
 * @property {function} setUserData
 * @param {Props} props
 * @returns
 */

export const VacancyData = ({ setVacancyData, userData, setUserData }) => {
  //* Vatiables
  const { vacancy_id } = useParams();

  //* States
  const [currentVacancyData, setCurrentVacancyData] = useState({});

  //* Functions
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
        <div className={styles["vacancy-item"]}>
          <div>
            <img
              className={styles["vacancy-item-icon"]}
              src={passportIcon}
              alt="Logo"
            />
          </div>
          <div className={styles["vacancy-item-text"]}>
            <p>MINIMAL RESIDENCE TYPE</p>
            <p className={styles["vacancy-parameter-value"]}>
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
            <img
              className={styles["vacancy-item-icon"]}
              src={visaServiceIcon}
              alt="Logo"
            />
          </div>
          <div className={styles["vacancy-item-text"]}>
            <p>VISA ASSISTANCE</p>
            <p className="vacancy-parameter-value">{message}</p>
          </div>
        </div>
      );
    }
  }

  //* UseEffects
  useEffect(() => {
    const url = LIST_VACANCIES_BASE_URL + vacancy_id;
    const fetchVacancyData = async () => {
      try {
        const resp = await api
          .get(url)
          .then((response) => {
            setCurrentVacancyData(response.data);
            return response;
          })
          .then((response) => setVacancyData(response.data))
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchVacancyData();
  }, []);

  //* Main Body
  return (
    <>
      <section className={styles["vacancy-section"]}>
        <div className={styles["vacancy-pre-header-container"]}>
          <p>
            Published: {stringToDateConverter(currentVacancyData.created_at)}
          </p>
          <ButtonFavourite
            userData={userData}
            setUserData={setUserData}
            vacancyId={currentVacancyData.id}
          />
        </div>

        {(() => {
          if (currentVacancyData.active == false) {
            return (
              <div>
                Vacancy is <b>Diactivated</b>
              </div>
            );
          }
        })()}

        <h2 className={`${styles["vacancy-header"]} h2-common`}>
          {currentVacancyData.name}
        </h2>

        <div className={styles["vacancy-container"]}>
          <div className={styles["vacancy-item"]}>
            <div>
              <img
                className={styles["vacancy-item-icon"]}
                src={idIcon}
                alt="Logo"
              />
            </div>
            <div className={styles["vacancy-item-text"]}>
              <p>VACANCY ID</p>
              <p
                className={styles["vacancy-parameter-value"]}
                data-testid='vacancyId'
              >
                {currentVacancyData.id}
              </p>
            </div>
          </div>

          <div className={styles["vacancy-item"]}>
            <div>
              <img
                className={styles["vacancy-item-icon"]}
                src={salaryIcon}
                alt="Logo"
              />
            </div>
            <div className={styles["vacancy-item-text"]}>
              <p>SALARY</p>
              <p className={styles["vacancy-parameter-value"]}>
                {currentVacancyData.salary} CZK/month
              </p>
            </div>
          </div>

          <div className={styles["vacancy-item"]}>
            <div>
              <img
                className={styles["vacancy-item-icon"]}
                src={locationIcon}
                alt="Logo"
              />
            </div>
            <div className={styles["vacancy-item-text"]}>
              <p>LOCATION</p>
              <p
                className={styles["vacancy-parameter-value"]}
                data-testid='location'
              >
                {currentVacancyData.location
                  ? currentVacancyData.location
                  : "-"}
              </p>
            </div>
          </div>

          <div className={styles["vacancy-item"]}>
            <div>
              <img
                className={styles["vacancy-item-icon"]}
                src={contractTypeIcon}
                alt="Logo"
              />
            </div>
            <div className={styles["vacancy-item-text"]}>
              <p>CONTRACT TYPE</p>
              <p className={styles["vacancy-parameter-value"]}>
                {currentVacancyData.contract_type}
              </p>
            </div>
          </div>

          <div className={styles["vacancy-item"]}>
            <div>
              <img
                className={styles["vacancy-item-icon"]}
                src={workingHoursIcon}
                alt="Logo"
              />
            </div>
            <div className={styles["vacancy-item-text"]}>
              <p>WORKING HOURHS</p>
              <p className={styles["vacancy-parameter-value"]}>
                {workingHoursRange(
                  currentVacancyData.hours_from,
                  currentVacancyData.hours_to
                )}
              </p>
            </div>
          </div>

          <div className={styles["vacancy-item"]}>
            <div>
              <img
                className={styles["vacancy-item-icon"]}
                src={genderIcon}
                alt="Logo"
              />
            </div>
            <div className={styles["vacancy-item-text"]}>
              <p>GENDER</p>
              <p className={styles["vacancy-parameter-value"]}>
                {currentVacancyData.gender}
              </p>
            </div>
          </div>

          <div className={styles["vacancy-item"]}>
            <div>
              <img
                className={styles["vacancy-item-icon"]}
                src={factoryIcon}
                alt="Logo"
              />
            </div>
            <div className={styles["vacancy-item-text"]}>
              <p>SECTOR</p>
              <p className={styles["vacancy-parameter-value"]}>
                {listSectors(currentVacancyData.sector_name)}
              </p>
            </div>
          </div>

          {checkResidence(currentVacancyData)}
          {checkVisaAssistance(currentVacancyData)}
        </div>

        <div className={styles["vacancy-container"]}>
          <div>
            <h2>Description</h2>
            <div className={styles["discription-text-container"]}>
              <p>{currentVacancyData.description}</p>
            </div>
          </div>

          <div>
            <h2>Requirements</h2>
            <div className={styles["discription-text-container"]}>
              <p>{currentVacancyData.requirements}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
