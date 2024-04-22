import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";
import { VacanciesComponent } from "./VacanciesComponent";
import { VacancyComponent } from "./VacancyComponent";
import { ListUserApplicationsComponent } from "./ListUserApplicationsComponent";
import { HomeComponent } from "./HomeComponent";
import { AuthenticationComponent } from "./AuthenticationComponent";
import { UserProfileComponent } from "./UserProfileComponent";
import { UserApplicationComponent } from "./UserApplicationComponent";
import { AboutUsComponent } from "./InfoComponents/AboutUsComponent";



export const MainComponent = (
  <Route path="/">
    <Route path="" element={<HomeComponent />} key="home" />
    <Route path="auth" element={<AuthenticationComponent />} key="auth" />
    <Route path="vacancies" element={<VacanciesComponent />} key="vacancies" />
    <Route
      path="vacancies/:vacancy_id"
      element={<VacancyComponent />}
      key="vacancy"
    />
    <Route path="about" element={<AboutUsComponent/>} key="about" />
    <Route path="applications" element={<ListUserApplicationsComponent />} key="listApplication" />
    <Route path="profile" element={<UserProfileComponent />} key="userProfile" />
    <Route
      path="applications/:application_id"
      element={<UserApplicationComponent />}
      key="Application"
    />
    <Route path="*" element={<p>Path not Found</p>} key="notFound" />
  </Route>
);