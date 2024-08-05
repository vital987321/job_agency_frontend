import { Outlet } from "react-router-dom";
import { AdminSideBarComponent } from "./AdminSideBarComponent";
import "../../css/adminArea/adminBody.css"

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
