import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";
import { HeaderComponent } from "./Header/HeaderComponent";
import { MainComponent } from "./Main/MainComponent";
import TestComponent from "./Main/TestComponent";


export const BodyComponent = () => {
  return (
    <div className="bodyComponent">
      <Router>
        <HeaderComponent />
        <Routes>
          {MainComponent}
        </Routes>
      </Router>
    </div>
  );
};