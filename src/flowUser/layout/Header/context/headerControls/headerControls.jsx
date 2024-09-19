import {
  BrowserRouter as Router,
  useNavigate,
  Link,
} from "react-router-dom";
import styles from "./headerControls.module.css"
import { AvatarComponent } from "../../../../../commonItems/components/AvatarComponent";
import { useEffect, useState } from "react";
import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/ButtonType1";
import { useLogOut } from "../../../../../hooks/useLogout";


export const HeaderControls = () => {

    //* States
  const [userAvatarUrl, setUserAvatarUrl] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

    //* useEffects
  useEffect(() => {
    setUserAvatarUrl(localStorage.getItem("userAvatarUrl"));
  }, [localStorage.getItem("userAvatarUrl")]);

  //* Hooks
  const {logout}=useLogOut()

  //* Functions
  const logInButtonClick = () => {
    navigate("/auth");
  };

  //* Main Body
  return (
    <div className={styles.controls}>
      {(() => {
        if (username) {
          return (
            <>
              <Link to="/profile" title={username}>
                <AvatarComponent
                  userAvatarUrl={userAvatarUrl}
                  title={username}
                  iconSymbol={username[0].toUpperCase()}
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