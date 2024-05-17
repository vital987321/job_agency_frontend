import { HeaderComponent } from "./Header/HeaderComponent";
import { FooterComponent } from "./Footer/FooterComponent";
import { Outlet } from "react-router-dom";

export const BodyComponent = () => {
    return (
      <div>
        <HeaderComponent />
        <Outlet />
        <FooterComponent />
      </div>
    );
};
