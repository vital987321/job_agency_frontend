import React from "react";
import {
  BrowserRouter as Router,
  Routes,

} from "react-router-dom";
import { AdminSideBarComponent } from "./AdminSideBarComponent";
import { AdmibRouterComponent } from "./AdminRouterComponent";

export const BodyComponent = () => {
  return (
    <div className="admin-body-component">
      <Router>
        <AdminSideBarComponent />
        <Routes>{AdmibRouterComponent}</Routes>
      </Router>
    </div>
  );
};
