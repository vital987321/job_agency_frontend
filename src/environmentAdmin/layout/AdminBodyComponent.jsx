import { Outlet } from "react-router-dom";
import { AdminSideBarComponent } from "./adminSideBar/AdminSideBarComponent";
import "./adminBody.css"

export const AdminBodyComponent = () => {
    return (
      <div className="admin-body">
        <AdminSideBarComponent />
        <div className="admin-body-main-container">
          <Outlet />
        </div>
      </div>
    );
};
