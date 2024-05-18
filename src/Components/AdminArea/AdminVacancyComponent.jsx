import {VacancyComponent} from "../UserArea/Main/VacancyComponent"
import {AdminEditVacancyFormComponent} from "./AdminEditVacancyFormComponent"
import "../../css/adminArea/adminVacancy.css"
export const AdminVacancyComponent =()=>{
    return (
        <div className="admin-vacancy-container">
            <VacancyComponent/>
            <div className="admin-vacancy-edit-button-container">
                <button
                    className="admin-vacancy-edit-button button-common button-common-color1"
                >
                    Edit
                </button>
            </div>
            <AdminEditVacancyFormComponent/>
        </div>
    )
}