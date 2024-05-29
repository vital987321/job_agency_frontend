import { VacancyDataComponent } from "../UserArea/Main/VacancyComponent";
import { AdminVacancyFormComponent } from "./AdminVacancyFormComponent";
import "../../css/adminArea/adminVacancy.css";
import { useState } from "react";
export const AdminVacancyComponent = () => {
  const [vacancyData, setVacancyData] = useState({});
  const [vacancyFormDisplayValue, setVacancyFormDisplayValue] =
    useState("none");

  const editButtonHandler = () => {
    setVacancyFormDisplayValue("block");
  };

  return (
    <div className="admin-vacancy-container">
      <div className="admin-vacancy-company-container">
        <span>Company: </span>
        <span className="admin-vacancy-company-name">
          {vacancyData.company}
        </span>
      </div>
      <VacancyDataComponent setVacancyData={setVacancyData} />
      <div className="admin-vacancy-edit-button-container">
        <button
          onClick={editButtonHandler}
          className="admin-vacancy-edit-button button-common button-common-color1"
        >
          Edit
        </button>
      </div>
      <AdminVacancyFormComponent
        vacancyData={vacancyData}
        setVacancyFormDisplayValue={setVacancyFormDisplayValue}
        vacancyFormDisplayValue={vacancyFormDisplayValue}
        newVacancy={false}
      />
    </div>
  );
};
