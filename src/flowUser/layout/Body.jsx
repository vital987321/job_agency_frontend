import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "./Body.module.css"

export const Body = () => {
    return (
      <>
        <Header />
        <div className={styles.main}>
          <Outlet /> 
        </div>
        <Footer />
      </>
    );
};
