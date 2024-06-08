import { Route } from "react-router-dom";
import { AdminSideBarComponent } from "./AdminSideBarComponent";
import { AdminVacanciesComponent } from "./AdminVacanciesComponent";
import { AdminBodyComponent } from "./AdminBodyComponent";
import { AdminVacancyComponent } from "./AdminVacancyComponent";
import { AdminApplicationComponent } from "../AdminArea/AdminApplicationComponent";
import { AdminApplicationsComponent } from "./AdminApplicationsComponent";


export const AdminRouterComponent = (
  <Route path="admin/" element={<AdminBodyComponent />}>
    <Route path="vacancies" element={<AdminVacanciesComponent />} />
    <Route path="vacancies/:vacancy_id" element={<AdminVacancyComponent />} />
    <Route path="applications" element={<AdminApplicationsComponent />} />
    <Route
      path="applications/:application_id"
      element={<AdminApplicationComponent />}
    />
  </Route>
);