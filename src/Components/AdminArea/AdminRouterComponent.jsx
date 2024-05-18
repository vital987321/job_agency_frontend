import { Route } from "react-router-dom";
import { AdminSideBarComponent } from "./AdminSideBarComponent";
import { VacanciesComponent } from "../UserArea/Main/VacanciesComponent";
import { AdminBodyComponent } from "./AdminBodyComponent";
import { VacancyComponent } from "../UserArea/Main/VacancyComponent";


export const AdminRouterComponent = (
  <Route path="admin/" element={<AdminBodyComponent/>}>
    <Route path="vacancies" element={<VacanciesComponent/>} />
    <Route
      path="vacancies/:vacancy_id"
      element={<VacancyComponent />}
    />
  </Route>
);