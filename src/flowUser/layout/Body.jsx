import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import styles from "./Body.module.css"

export const Body = () => {
    return (
      <>
        <Header />
        <div className={styles.main}>
          <Outlet /> 
        </div>
        <Footer />

        {/* utilities  */}
        <Toaster/>
      </>
    );
};
