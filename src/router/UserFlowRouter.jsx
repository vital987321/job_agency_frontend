import { Route } from "react-router-dom";
import { VacanciesComponent } from "../flowUser/pages/vacancies/Vacancies";
import { Vacancy } from "../flowUser/pages/vacancy/Vacancy";
import { Home } from "../flowUser/pages/home/Home";
import { Authentication } from "../flowUser/pages/authenntication/Authentication";
import { UserProfile } from "../flowUser/pages/userProfile/UserProfile";
import { UserApplication } from "../flowUser/pages/userProfile/substructures/userApplication/UserApplication";
import { AboutUs } from "../flowUser/pages/aboutUs/AboutUs";
import { CertificatesComponent } from "../flowUser/pages/certificates/Certificates";
import { Contacts } from "../flowUser/pages/contacts/Contacts";
import { ReviewsComponent } from "../flowUser/pages/reviews/Reviews";
import { Body } from "../flowUser/layout/Body";
import { ProtectedRoute } from "./ProtectedRoute";

export const UserFlowRouter = (
  <Route path="/" element={<Body />}>
    //* Public Routes
    <Route path="" element={<Home />} />
    <Route path="auth" element={<Authentication />} />
    <Route path="vacancies" element={<VacanciesComponent />} />
    <Route path="vacancies/:vacancy_id" element={<Vacancy />} />
    <Route path="about" element={<AboutUs />} />
    <Route path="certificates" element={<CertificatesComponent />} />
    <Route path="contacts" element={<Contacts />} />
    <Route path="reviews" element={<ReviewsComponent />} />

    //* Protected Routes
    <Route element={<ProtectedRoute allowedRoles={['1150','2250','1001']} />}>
      <Route path="profile" element={<UserProfile />} />
      <Route path="applications/:application_id" element={<UserApplication />}/>
    </Route>
  </Route>
);
