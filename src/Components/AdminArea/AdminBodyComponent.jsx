import { Outlet } from "react-router-dom";
import { AdminSideBarComponent } from "./AdminSideBarComponent";
import "../../css/adminArea/adminBody.css"

export const AdminBodyComponent = () => {
    return (
      <div className="admin-body">
        <AdminSideBarComponent />
        <Outlet />
      </div>
    );
};
