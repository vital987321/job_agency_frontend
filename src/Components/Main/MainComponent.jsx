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


const Vacancies = () => {
    return <div>Vacancies Component</div>;
}

const About = () => {
  return <div>About Component</div>;
};


export const MainComponent = (
  <Route path="/">
    <Route path="vacancies" element={<VacanciesComponent />} key="vacancies" />
    <Route
      path="vacancies/:vacancy_id"
      element={<VacancyComponent />}
      key="vacancy"
    />
    <Route path="about" element={<About />} key="about" />
    <Route path="*" element={<p>Path not Found</p>} key="notFound" />
  </Route>
);