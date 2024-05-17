import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";

import { UserAreaRouter } from "./UserArea/UserAreaRouter";
import { AdminRouterComponent } from "./AdminArea/AdminRouterComponent";

export const BrowserRouterComponent = () => {
  return (
    <div className="application">
      <Router>
        <Routes>
          {UserAreaRouter}
          {AdminRouterComponent}
          <Route path="*" element={<p>Path not Found</p>} key="notFound" />
        </Routes>
      </Router>
    </div>
  );
};
