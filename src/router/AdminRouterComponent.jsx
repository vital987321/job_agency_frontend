import { Route } from "react-router-dom";
import { AdminVacanciesComponent } from "../pages/adminEnvironment/vacancies/AdminVacanciesComponent";
import { AdminBodyComponent } from "../layouts/adminEnvironment/AdminBodyComponent";
import { AdminVacancyComponent } from "../pages/adminEnvironment/vacancy/AdminVacancyComponent";
import { AdminApplicationComponent } from "../pages/adminEnvironment/application/AdminApplicationComponent";
import { AdminApplicationsComponent } from "../pages/adminEnvironment/applications/AdminApplicationsComponent";

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
