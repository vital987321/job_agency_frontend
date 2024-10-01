import { Outlet } from "react-router-dom";
import { AdminSideBar } from "./adminSideBar/AdminSideBar";
import styles from "./AdminBody.module.css"

export const AdminBody = () => {
    return (
      <>
        <aside className={styles.sidebar}>
          <AdminSideBar />
        </aside>  
        <div className={styles.mainContainer}>
          <Outlet />
        </div>
      </>
      
      
    );
};
