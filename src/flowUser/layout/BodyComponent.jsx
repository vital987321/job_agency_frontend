import { HeaderComponent } from "./Header/HeaderComponent";
import { FooterComponent } from "./Footer/FooterComponent";
import { Outlet } from "react-router-dom";
import styles from "./body.module.css"

export const BodyComponent = () => {
    return (
      <>
        <HeaderComponent />
        <div className={styles.main}>
          <Outlet /> 
        </div>
        <FooterComponent />
      </>
    );
};
