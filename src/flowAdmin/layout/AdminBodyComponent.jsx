import { Outlet } from "react-router-dom";
import { AdminSideBarComponent } from "./adminSideBar/AdminSideBarComponent";
import styles from "./adminBody.module.css"

export const AdminBodyComponent = () => {
    return (
      <>
        <aside className={styles.sidebar}>
          <AdminSideBarComponent />
        </aside>  
        <div className={styles.mainContainer}>
          <Outlet />
        </div>
      </>
      
      
    );
};
