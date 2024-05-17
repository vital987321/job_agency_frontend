import React, { useState } from "react";
import {  Route} from "react-router-dom";
import { VacanciesComponent } from "./Main/VacanciesComponent";
import { VacancyComponent } from "./Main/VacancyComponent";
import { ListUserApplicationsComponent } from "./Main/ListUserApplicationsComponent";
import { HomeComponent } from "./Main/HomeComponent";
import { AuthenticationComponent } from "./Main/AuthenticationComponent";
import { UserProfileComponent } from "./Main/UserProfileComponent";
import { UserApplicationComponent } from "./Main/UserApplicationComponent";
import { AboutUsComponent } from "./Main/InfoComponents/AboutUsComponent";
import { CertificatesComponent } from "./Main/InfoComponents/CertificatesComponent";
import { ContactsComponent } from "./Main/InfoComponents/ContactsComponent";
import { ReviewsComponent } from "./Main/InfoComponents/ReviewsComponent";
import { BodyComponent } from "./BodyComponent";

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
