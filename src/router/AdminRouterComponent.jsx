import { Route } from "react-router-dom";
import { AdminVacanciesComponent } from "../environmentAdmin/pages/vacancies/AdminVacanciesComponent";
import { AdminBodyComponent } from "../environmentAdmin/layout/AdminBodyComponent";
import { AdminVacancyComponent } from "../environmentAdmin/pages/vacancy/AdminVacancyComponent";
import { AdminApplicationComponent } from "../environmentAdmin/pages/application/AdminApplicationComponent";
import { AdminApplicationsComponent } from "../environmentAdmin/pages/applications/AdminApplicationsComponent";
import {AdminReviewsComponent} from '../environmentAdmin/pages/reviews/reviews'

export const AdminRouterComponent = (
  <Route path="admin/" element={<AdminBodyComponent />}>
    <Route path="vacancies" element={<AdminVacanciesComponent />} />
    <Route path="vacancies/:vacancy_id" element={<AdminVacancyComponent />} />
    <Route path="applications" element={<AdminApplicationsComponent />} />
    <Route path="reviews" element={<AdminReviewsComponent />} />
    <Route
      path="applications/:application_id"
      element={<AdminApplicationComponent />}
    />
  </Route>
);
