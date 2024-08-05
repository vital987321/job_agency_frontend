import React, { useState } from "react";
import { Route } from "react-router-dom";
import { VacanciesComponent } from "../userEnvironment/pages/vacancies/VacanciesComponent";
import { VacancyComponent } from "../commonEnvironment/components/VacancyComponent";
import { ListUserApplicationsComponent } from "../userEnvironment/pages/userProfile/context/ListUserApplicationsComponent";
import { HomeComponent } from "../userEnvironment/pages/home/HomeComponent";
import { AuthenticationComponent } from "../userEnvironment/pages/authenntication/AuthenticationComponent";
import { UserProfileComponent } from "../userEnvironment/pages/userProfile/UserProfileComponent";
import { UserApplicationComponent } from "../userEnvironment/pages/userProfile/context/UserApplicationComponent";
import { AboutUsComponent } from "../userEnvironment/pages/aboutUs/AboutUsComponent";
import { CertificatesComponent } from "../userEnvironment/pages/certificates/CertificatesComponent";
import { ContactsComponent } from "../userEnvironment/pages/contacts/ContactsComponent";
import { ReviewsComponent } from "../userEnvironment/pages/reviews/ReviewsComponent";
import { BodyComponent } from "../userEnvironment/layout/BodyComponent";

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
