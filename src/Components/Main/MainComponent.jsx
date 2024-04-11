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
import { ListApplicationsComponent } from "./ListApplicationsComponent";
import { HomeComponent } from "./HomeComponent";
import { AuthenticationComponent } from "./AuthenticationComponent";


const Vacancies = () => {
    return <div>Vacancies Component</div>;
}

const About = () => {
  return <div>About Component</div>;
};


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
    <Route path="about" element={<About />} key="about" />
    <Route path="applications" element={<ListApplicationsComponent />} key="listApplication" />

    <Route path="*" element={<p>Path not Found</p>} key="notFound" />
  </Route>
);