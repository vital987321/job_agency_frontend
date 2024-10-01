import React, { useEffect, useState } from "react";
import styles from "./Vacancy.module.css";
import { ApplicationFormComponent } from "./substructures/applicationForm/ApplicationForm";
import api from "../../../services/api/api";
import { ButtonType1 } from "../../../commonItems/components/buttons/buttonType1/ButtonType1";
import { VacancyData } from "../../../commonItems/features/vacancyData/VacancyData";

export const Vacancy = (props) => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));
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
      <VacancyData
        vacancyData={vacancyData}
        setVacancyData={setVacancyData}
        userData={userData}
        setUserData={setUserData}
      />
      <div className={styles["vacancy-apply-button-container"]}>
        <ButtonType1
          value="Apply"
          onClickHandler={applyButtonHandler}
          strength="1"
        />
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
