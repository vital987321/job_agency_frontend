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

export const UserAreaRouter = (
  <Route path="/" element={<BodyComponent />}>
    <Route path="" element={<HomeComponent />} key="home" />
    <Route path="auth" element={<AuthenticationComponent />} key="auth" />
    <Route path="vacancies" element={<VacanciesComponent />} key="vacancies" />
    <Route
      path="vacancies/:vacancy_id"
      element={<VacancyComponent />}
      key="vacancy"
    />
    <Route path="about" element={<AboutUsComponent />} key="about" />
    <Route
      path="certificates"
      element={<CertificatesComponent />}
      key="certificates"
    />
    <Route path="contacts" element={<ContactsComponent />} key="contacts" />
    <Route path="reviews" element={<ReviewsComponent />} key="reviews" />

    <Route
      path="applications"
      element={<ListUserApplicationsComponent />}
      key="listApplication"
    />
    <Route
      path="profile"
      element={<UserProfileComponent />}
      key="userProfile"
    />
    <Route
      path="applications/:application_id"
      element={<UserApplicationComponent />}
      key="Application"
    />
    <Route path="*" element={<p>Path not Found</p>} key="notFound" />
  </Route>
);
