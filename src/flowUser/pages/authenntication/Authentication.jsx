import React, { useRef, useEffect, useState } from "react";
import closeIcon from "../../../assets/svg/X.svg";
import styles from "./Authentication.module.css";
import loginImage from "../../../assets/img/login_img.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../services/api/api";
import { ButtonType1 } from "../../../commonItems/components/buttons/buttonType1/ButtonType1";
import { PasswordRepeat } from "./substructures/PassworRepeat/PassworRepeat";
import { useAuth } from "../../../hooks/useAuth";
import { USER_REQUEST_URL, AUTH_REQUEST_URL } from "../../../data/constants";

export const Authentication = () => {
  //* Refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  //* States
  const [authenticationAction, setAuthenticationMethod] = useState("login"); // login signup
  const [validationErrors, setValidationErrors] = useState({});

  //* Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const { setAuth } = useAuth();

  //* variables
  const fromUrl = location.state?.from?.pathname || "/";

  //* Functions
  const closeButtonHandler = () => {
    navigate("/");
  };

  const authenticationActionButtonHandler = (e) => {
    e.preventDefault();
    if (e.target.id == "authentication-action-button-login") {
      setAuthenticationMethod("login");
      e.target.style.backgroundColor = "#F0D976";
      const oppositeButton = document.getElementById(
        "authentication-action-button-signup"
      );
      oppositeButton.style.backgroundColor = "transparent";
    }
    if (e.target.id == "authentication-action-button-signup") {
      setAuthenticationMethod("signup");
      e.target.style.backgroundColor = "#F0D976";
      const oppositeButton = document.getElementById(
        "authentication-action-button-login"
      );
      oppositeButton.style.backgroundColor = "transparent";
    }
  };

  const isValidLoginForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!emailRef.current.value) {
      newErrors.email = "Enter user login";
      isValid = false;
    }
    if (!passwordRef.current.value) {
      newErrors.password = "Enter password";
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const isValidSignUpForm = () => {
    let isValid = true;
    const newErrors = {};

    // validate email
    if (
      !emailRef.current.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      newErrors.email = "Enter correct email address";
      isValid = false;
    }

    // validate password
    if (passwordRef.current.value.length < 3) {
      newErrors.password = "Password is too short";
      isValid = false;
    }

    // validate confirm password
    if (confirmPasswordRef.current.value !== passwordRef.current.value) {
      newErrors.confirmPassword = "Passwords mismatch";
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const authenticationFormSubmitHandler = (e) => {
    e.preventDefault();
    if (authenticationAction === "login") {
      if (isValidLoginForm()) {
        sendLoginRequest();
      }
    }
    if (authenticationAction === "signup") {
      if (isValidSignUpForm()) {
        sendSignUpRequest();
      }
    }
  };

  const sendLoginRequest = () => {
    axios
      .post(AUTH_REQUEST_URL, {
        username: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user_id);
        return response;
      })
      .then((response) => {
        const fetchUserData = (user_id) => {
          try {
            const request = api
              .get("/user/" + user_id)
              .then((response) => {
                setAuth({
                  user_id,
                  role: response.data.role,
                  username: response.data.username,
                  userAvatarUrl: response.data.avatar,
                });
              })
              .catch((error) => console.log(error));
          } catch (error) {
            console.log(error);
          }
        };
        fetchUserData(response.data.user_id);
      })
      .then((res) => navigate(fromUrl, { replace: true }))
      .catch((error) => {
        if (error.request) {
          if (
            error.request.response ==
            '{"non_field_errors":["Unable to log in with provided credentials."]}'
          ) {
            setValidationErrors({ password: "Wrong login or password" });
          } else {
            console.log(error);
          }
        } else {
          console.log(error);
        }
      });
  };

  const sendSignUpRequest = () => {
    const e = emailRef.current.value;
    axios
      .post(USER_REQUEST_URL, {
        email: e,
        password: passwordRef.current.value,
      })
      .then((response) => {
        console.log("response sratus: " + response.status);
      })
      .then((res) => sendLoginRequest())
      .catch((error) => {
        if (error.request) {
          if (
            error.request.response ==
            '{"email":["User with such email already exists."]}'
          )
            setValidationErrors({
              email: "User with such email already exists.",
            });
          else {
            console.log(error);
          }
        } else {
          console.log(error);
        }
        return null;
      });
  };

  //* Main Body

  return (
    <section className={styles["authentication-modal-window"]}>
      <div className={styles["authentication-modal-window-container"]}>
        <img className={styles["login-img"]} src={loginImage} alt="" />

        <div className={styles["authentication-input-main-container"]}>
          <div className={styles["close-button-container"]}>
            <img
              className={styles["close-button"]}
              onClick={closeButtonHandler}
              src={closeIcon}
              alt="X"
            />
          </div>
          <div className={styles["authentication-action-buttons-container"]}>
            <button
              className={`${styles["authentication-action-buttons"]} ${styles["authentication-action-button-login"]}`}
              id="authentication-action-button-login"
              onClick={authenticationActionButtonHandler}
            >
              Log in
            </button>
            <button
              className={styles["authentication-action-buttons"]}
              id="authentication-action-button-signup"
              onClick={authenticationActionButtonHandler}
            >
              Sign up
            </button>
          </div>
          <form
            className={styles["authentication-form"]}
            onSubmit={authenticationFormSubmitHandler}
          >
            <input
              className={styles["authentication-text-input"]}
              type="text"
              placeholder="User e-mail"
              ref={emailRef}
              required
            />
            <div className={styles["authentication-form-error-message"]}>
              {validationErrors.email}
            </div>
            <input
              className={styles["authentication-text-input"]}
              id="authentication-password-input"
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
            <div className={styles["authentication-form-error-message"]}>
              {validationErrors.password}
            </div>
            <PasswordRepeat
              authenticationAction={authenticationAction}
              confirmPasswordRef={confirmPasswordRef}
              validationErrors={validationErrors}
            />
            <div className={styles["authentication-submit-button-container"]}>
              <ButtonType1
                value="Enter"
                onClickHandler={authenticationFormSubmitHandler}
                strength="1"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
