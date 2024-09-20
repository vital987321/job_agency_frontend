import React, { useState } from "react";
import { Route } from "react-router-dom";
import { VacanciesComponent } from "../flowUser/pages/vacancies/VacanciesComponent";
import { VacancyComponent } from "../flowUser/pages/vacancy/VacancyComponent";
import { ListUserApplicationsComponent } from "../flowUser/pages/userProfile/context/listUserApplications/ListUserApplicationsComponent";
import { HomeComponent } from "../flowUser/pages/home/HomeComponent";
import { AuthenticationComponent } from "../flowUser/pages/authenntication/AuthenticationComponent";
import { UserProfileComponent } from "../flowUser/pages/userProfile/UserProfileComponent";
import { UserApplicationComponent } from "../flowUser/pages/userProfile/context/userApplication/UserApplicationComponent";
import { AboutUsComponent } from "../flowUser/pages/aboutUs/AboutUsComponent";
import { CertificatesComponent } from "../flowUser/pages/certificates/CertificatesComponent";
import { ContactsComponent } from "../flowUser/pages/contacts/ContactsComponent";
import { ReviewsComponent } from "../flowUser/pages/reviews/Reviews";
import { BodyComponent } from "../flowUser/layout/BodyComponent";
import { ProtectedRoute } from "./protectedRote";

export const UserFlowRouter = (
  <Route path="/" element={<BodyComponent />}>
    //* Public Routes
    <Route path="" element={<HomeComponent />} />
    <Route path="auth" element={<AuthenticationComponent />} />
    <Route path="vacancies" element={<VacanciesComponent />} />
    <Route path="vacancies/:vacancy_id" element={<VacancyComponent />} />
    <Route path="about" element={<AboutUsComponent />} />
    <Route path="certificates" element={<CertificatesComponent />} />
    <Route path="contacts" element={<ContactsComponent />} />
    <Route path="reviews" element={<ReviewsComponent />} />

    //* Protected Routes
    <Route element={<ProtectedRoute allowedRoles={['1150','2250','1001']} />}>
      <Route path="profile" element={<UserProfileComponent />} />
      <Route path="applications/:application_id" element={<UserApplicationComponent />}/>
    </Route>
  </Route>
);
