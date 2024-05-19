import {VacancyComponent} from "../UserArea/Main/VacancyComponent"
import {AdminEditVacancyFormComponent} from "./AdminEditVacancyFormComponent"
import "../../css/adminArea/adminVacancy.css"
import { useState } from "react"
export const AdminVacancyComponent =()=>{
    const [vacancyData, setVacancyData]=useState({})
    return (
        <div className="admin-vacancy-container">
            <VacancyComponent setVacancyData={setVacancyData}/>
            <div className="admin-vacancy-edit-button-container">
                <button
                    className="admin-vacancy-edit-button button-common button-common-color1"
                >
                    Edit
                </button>
            </div>
            <AdminEditVacancyFormComponent vacancyData={vacancyData}/>
        </div>
    )
}