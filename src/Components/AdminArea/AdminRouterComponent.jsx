import { Route } from "react-router-dom";
import { AdminSideBarComponent } from "./AdminSideBarComponent";

export const AdminRouterComponent = (
  <Route path="admin/">
    <Route path="" element={<AdminSideBarComponent/>} />
  </Route>
);