import { VacancyDataComponent } from "../UserArea/Main/VacancyComponent";
import { AdminVacancyFormComponent } from "./AdminVacancyFormComponent";
import "../../css/adminArea/adminVacancy.css";
import { useState } from "react";
import api from "../api";
import { LIST_VACANCIES_BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

export const AdminVacancyComponent = () => {
  const [vacancyData, setVacancyData] = useState({});
  const [vacancyFormDisplayValue, setVacancyFormDisplayValue] =
    useState("none");
  const navigate=useNavigate()

  const editButtonHandler = () => {
    setVacancyFormDisplayValue("block");
  };

  const deleteButtonHandler=()=>{
    const deleteVacancy= async ()=>{
      try{
        const requestUrl=LIST_VACANCIES_BASE_URL + vacancyData.id + "/";
        const response = await api
        .delete(requestUrl)
        .then((response)=>{console.log(response.statusText)})
        .then(navigate('/admin/vacancies/'))
        .catch((error)=>{console.log(error)})
      }catch(error){console.log(error)}
    }
    deleteVacancy()
  }

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
      </div>
      <div className="admin-vacancy-company-container">
        <span>Company: </span>
        <span className="admin-vacancy-company-name">
          {vacancyData.company}
        </span>
      </div>
      <VacancyDataComponent setVacancyData={setVacancyData} />
      <AdminVacancyFormComponent
        vacancyData={vacancyData}
        setVacancyFormDisplayValue={setVacancyFormDisplayValue}
        vacancyFormDisplayValue={vacancyFormDisplayValue}
        newVacancy={false}
      />
    </div>
  );
};
