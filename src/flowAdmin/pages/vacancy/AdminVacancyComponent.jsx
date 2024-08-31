import { VacancyDataComponent } from "../../../commonItems/features/vacancyData/VacancyData";
import { AdminVacancyFormComponent } from "../../../commonItems/features/vacancyForm/AdminVacancyFormComponent";
import styles from "./adminVacancy.module.css";
import { useEffect, useState } from "react";
import api from "../../../services/api/api";
import { LIST_VACANCIES_BASE_URL } from "../../../data/constants";
import { useNavigate } from "react-router-dom";
import { ButtonType1 } from "../../../commonItems/components/buttons/buttonType1/ButtonType1";

const user_id = JSON.parse(localStorage.getItem("user_id"));

export const AdminVacancyComponent = () => {
  const [vacancyData, setVacancyData] = useState({});
  const [userData, setUserData] = useState({});
  const [vacancyFormDisplayValue, setVacancyFormDisplayValue] =
    useState("none");
  const navigate = useNavigate();

  const editButtonHandler = () => {
    setVacancyFormDisplayValue("block");
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

  const deleteButtonHandler = () => {
    const deleteVacancy = async () => {
      try {
        const requestUrl = LIST_VACANCIES_BASE_URL + vacancyData.id + "/";
        const response = await api
          .delete(requestUrl)
          .then((response) => {
            console.log(response.statusText);
          })
          .then(navigate("/admin/vacancies/"))
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    deleteVacancy();
  };

  const changeActivationStatus = (e) => {
    let requestData = {};
    if (e.target.textContent == "Deactivate") {
      requestData = { active: false };
    } else {
      requestData = { active: true };
    }

    const changeActivateRequest = async () => {
      const requestUrl = LIST_VACANCIES_BASE_URL + vacancyData.id + "/";
      try {
        const response = await api
          .patch(requestUrl, requestData)
          .then((response) => setVacancyData(response.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    changeActivateRequest();
  };

  return (
    <div className={styles["admin-vacancy-container"]}>
      <div className={styles["admin-vacancy-buttons-container"]}>
        <ButtonType1
          value="Edit"
          onClickHandler={editButtonHandler}
          strength="1"
        />

        <ButtonType1
          value="Delete"
          onClickHandler={deleteButtonHandler}
          strength="1"
        />

        <ButtonType1
          value={vacancyData.active ? "Deactivate" : "Activate"}
          onClickHandler={changeActivationStatus}
          strength="1"
        />
      </div>
      <div className={styles["admin-vacancy-company-container"]}>
        <span>Company: </span>
        <span className={styles["admin-vacancy-company-name"]}>
          {vacancyData.partner_data ? vacancyData.partner_data.company : "-"}
        </span>
      </div>
      <VacancyDataComponent
        vacancyData={vacancyData}
        setVacancyData={setVacancyData}
        userData={userData}
        setUserData={setUserData}
      />
      <AdminVacancyFormComponent
        vacancyData={vacancyData}
        setVacancyData={setVacancyData}
        setVacancyFormDisplayValue={setVacancyFormDisplayValue}
        vacancyFormDisplayValue={vacancyFormDisplayValue}
        newVacancy={false}
      />
    </div>
  );
};
