import { Route } from "react-router-dom";
import { AdminVacancies } from "../flowAdmin/pages/vacancies/AdminVacancies";
import { AdminBody } from "../flowAdmin/layout/AdminBody";
import { AdminVacancy } from "../flowAdmin/pages/vacancy/AdminVacancy";
import { AdminApplication } from "../flowAdmin/pages/application/AdminApplication";
import { AdminApplications } from "../flowAdmin/pages/applications/AdminApplications";
import { AdminReviews } from "../flowAdmin/pages/adminReviews/AdminReviews";
import { Partners } from "../flowAdmin/pages/partners/Partners";
import { ProtectedRoute } from "./ProtectedRoute_1";
import { AdminHome } from "../flowAdmin/pages/adminHome/AdminHome";

export const AdminFlowRouter = (
  <Route element={<ProtectedRoute allowedRoles={["2250", "1001"]} />}>
    <Route path="admin/" element={<AdminBody />}>
      <Route path="" element={<AdminHome/>} />
      <Route path="vacancies" element={<AdminVacancies />} />
      <Route path="vacancies/:vacancy_id" element={<AdminVacancy />} />
      <Route path="applications" element={<AdminApplications />} />
      <Route path="reviews" element={<AdminReviews />} />
      <Route
        path="applications/:application_id"
        element={<AdminApplication />}
      />
      <Route path="partners" element={<Partners />} />
    </Route>
  </Route>
);
