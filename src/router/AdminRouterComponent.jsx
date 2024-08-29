import { Route } from "react-router-dom";
import { AdminVacanciesComponent } from "../flowAdmin/pages/vacancies/AdminVacanciesComponent";
import { AdminBodyComponent } from "../flowAdmin/layout/AdminBodyComponent";
import { AdminVacancyComponent } from "../flowAdmin/pages/vacancy/AdminVacancyComponent";
import { AdminApplicationComponent } from "../flowAdmin/pages/application/AdminApplicationComponent";
import { AdminApplicationsComponent } from "../flowAdmin/pages/applications/AdminApplicationsComponent";
import {AdminReviewsComponent} from '../flowAdmin/pages/reviews/reviews'
import { Partner } from "../flowAdmin/pages/partners/partners";

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
    <Route path='partners' element={<Partner/>}/>
  </Route>
);
