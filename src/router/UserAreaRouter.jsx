import React, { useState } from "react";
import { Route } from "react-router-dom";
import { VacanciesComponent } from "../pages/userEnvironment/vacancies/VacanciesComponent";
import { VacancyComponent } from "../pages/userEnvironment/vacancy/VacancyComponent";
import { ListUserApplicationsComponent } from "../pages/userEnvironment/userProfile/subParts/ListUserApplicationsComponent";
import { HomeComponent } from "../pages/userEnvironment/home/HomeComponent";
import { AuthenticationComponent } from "../pages/authenntication/AuthenticationComponent";
import { UserProfileComponent } from "../pages/userEnvironment/userProfile/UserProfileComponent";
import { UserApplicationComponent } from "../pages/userEnvironment/userProfile/subParts/UserApplicationComponent";
import { AboutUsComponent } from "../pages/userEnvironment/aboutUs/AboutUsComponent";
import { CertificatesComponent } from "../pages/userEnvironment/certificates/CertificatesComponent";
import { ContactsComponent } from "../pages/userEnvironment/contacts/ContactsComponent";
import { ReviewsComponent } from "../pages/userEnvironment/reviews/ReviewsComponent";
import { BodyComponent } from "../layouts/userEnvironment/BodyComponent";

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
