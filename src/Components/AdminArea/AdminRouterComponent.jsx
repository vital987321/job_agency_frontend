import { Route } from "react-router-dom";
import { AdminSideBarComponent } from "./AdminSideBarComponent";
import { VacanciesComponent } from "../UserArea/Main/VacanciesComponent";
import { AdminBodyComponent } from "./AdminBodyComponent";
import { AdminVacancyComponent } from "./AdminVacancyComponent";
import { UserApplicationComponent } from "../UserArea/Main/UserApplicationComponent";
import { AdminApplicationsComponent } from "./AdminApplicationsComponent";


export const AdminRouterComponent = (
  <Route path="admin/" element={<AdminBodyComponent/>}>
    <Route path="vacancies" element={<VacanciesComponent/>} />
    <Route
      path="vacancies/:vacancy_id"
      element={<AdminVacancyComponent />}
    />
    <Route path="applications" element={<AdminApplicationsComponent/>} />
    <Route
      path="applications/:application_id"
      element={<UserApplicationComponent />}
    />
  </Route>
);