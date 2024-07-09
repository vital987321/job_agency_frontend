import { VacancyDataComponent } from "../../UserArea/Main/VacancyComponent";
import { AdminVacancyFormComponent } from "./AdminVacancyFormComponent";
import "../../../css/adminArea/adminVacancy.css";
import { useEffect, useState } from "react";
import api from "../../api";
import { LIST_VACANCIES_BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";

export const AdminVacancyComponent = () => {
  const [vacancyData, setVacancyData] = useState({});
  const [vacancyFormDisplayValue, setVacancyFormDisplayValue] =
    useState("none");
  const navigate = useNavigate();

  const editButtonHandler = () => {
    setVacancyFormDisplayValue("block");
  };

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
      requestData = {active: false };
    } else {
      requestData = {active: true };
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
    <div className="admin-vacancy-container">
      <div className="admin-vacancy-buttons-container">
        <button
          onClick={editButtonHandler}
          className="admin-vacancy-edit-button button-common button-common-color1"
        >
          Edit
        </button>
        <button
          onClick={deleteButtonHandler}
          className="admin-vacancy-edit-button button-common button-common-color1"
        >
          Delete
        </button>
        <button
          className="admin-vacancy-edit-button button-common button-common-color1"
          onClick={changeActivationStatus}
        >
          {vacancyData.active ? "Deactivate" : "Activate"}
        </button>
      </div>
      <div className="admin-vacancy-company-container">
        <span>Company: </span>
        <span className="admin-vacancy-company-name">
          {vacancyData.company}
        </span>
      </div>
      <VacancyDataComponent
        vacancyData={vacancyData}
        setVacancyData={setVacancyData}
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
