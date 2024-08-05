import { Route } from "react-router-dom";
import { AdminVacanciesComponent } from "../adminEnvironment/pages/vacancies/AdminVacanciesComponent";
import { AdminBodyComponent } from "../adminEnvironment/layout/AdminBodyComponent";
import { AdminVacancyComponent } from "../adminEnvironment/pages/vacancy/AdminVacancyComponent";
import { AdminApplicationComponent } from "../adminEnvironment/pages/application/AdminApplicationComponent";
import { AdminApplicationsComponent } from "../adminEnvironment/pages/applications/AdminApplicationsComponent";

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
