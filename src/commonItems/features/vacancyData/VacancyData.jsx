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
import { RESIDENCE_TYPES } from "../../../data/constants";
import { ButtonFavourite } from "../../components/buttons/buttonFavourite/ButtonFavourite";
import styles from "./vacancyData.module.css";

export const VacancyDataComponent = (props) => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const [isFavouriteVacancy, setIsFavouriteVacancy] = useState(false);
  const { vacancy_id } = useParams();

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

  useEffect(() => {
    if (user_id) {
      if (props.userData.favourites) {
        if (props.userData.favourites.includes(props.vacancyData.id)) {
          setIsFavouriteVacancy(true);
        }
      }
    }
  }, [props.userData.favourites]);

  return (
    <>
      <section className={styles["vacancy-section"]}>
        <div className={styles["vacancy-pre-header-container"]}>
          <p>
            Published: {stringToDateConverter(props.vacancyData.created_at)}
          </p>
          <ButtonFavourite
            userData={props.userData}
            setUserData={props.setUserData}
            vacancyData={props.vacancyData}
            isFavouriteVacancy={isFavouriteVacancy}
            setIsFavouriteVacancy={setIsFavouriteVacancy}
          />
        </div>

        {(() => {
          if (props.vacancyData.active == false) {
            return (
              <div>
                Vacancy is <b>Diactivated</b>
              </div>
            );
          }
        })()}

        <h2 className={`${styles["vacancy-header"]} h2-common`}>
          {props.vacancyData.name}
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
              <p className={styles["vacancy-parameter-value"]}>
                {props.vacancyData.id}
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
                {props.vacancyData.salary} CZK/month
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
              <p className={styles["vacancy-parameter-value"]}>
                {props.vacancyData.location ? props.vacancyData.location : "-"}
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
                {props.vacancyData.contract_type}
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
                  props.vacancyData.hours_from,
                  props.vacancyData.hours_to
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
                {props.vacancyData.gender}
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
                {listSectors(props.vacancyData.sector_name)}
              </p>
            </div>
          </div>

          {checkResidence(props.vacancyData)}
          {checkVisaAssistance(props.vacancyData)}
        </div>

        <div className={styles["vacancy-container"]}>
          <div>
            <h2>Description</h2>
            <div className={styles["discription-text-container"]}>
              <p>{props.vacancyData.description}</p>
            </div>
          </div>

          <div>
            <h2>Requirements</h2>
            <div className={styles["discription-text-container"]}>
              <p>{props.vacancyData.requirements}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
