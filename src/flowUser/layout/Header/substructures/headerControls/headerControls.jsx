import {
  BrowserRouter as Router,
  useNavigate,
  Link,
} from "react-router-dom";
import styles from "./headerControls.module.css"
import { AvatarComponent } from "../../../../../commonItems/components/AvatarComponent";
import { useEffect, useState } from "react";
import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/buttonType1";
import { useLogOut } from "../../../../../hooks/useLogout";
import { useAuth } from "../../../../../hooks/useAuth";


export const HeaderControls = () => {
  //* Hooks
  const {logout}=useLogOut()
  const {auth}=useAuth()
  const navigate = useNavigate();

  //* Functions
  const logInButtonClick = () => {
    navigate("/auth");
  };

  //* Main Body
  return (
    <div className={styles.controls}>
      {(() => {
        if (auth.username) {
          return (
            <>
              <Link to="/profile" className={styles.navLink} title={auth.username}>
                <AvatarComponent
                  userAvatarUrl={auth.userAvatarUrl}
                  title={auth.username}
                  iconSymbol={auth.username[0].toUpperCase()}
                />
              </Link>
              <div className={styles["log-button-container"]}>
                <ButtonType1
                  value="LogOut"
                  onClickHandler={() => logout()}
                  strength="2"
                />
              </div>
            </>
          );
        }
        return (
          <div className={styles["log-button-container"]}>
            <ButtonType1
              value="LogIn"
              onClickHandler={logInButtonClick}
              strength="2"
            />
          </div>
        );
      })()}
    </div>
  );
};