import React, { useEffect, useState } from "react";
import closeIcon from "../../svg/X.svg";
import { Form } from "react-router-dom";
import "../../css/authentication.css";
import loginImage from "../../img/login_img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const emailRef = React.createRef();
const passwordRef = React.createRef();
const confirmPasswordRef = React.createRef();

export const AuthenticationComponent = () => {
  const [authenticationAction, setAuthenticationMethod] = useState("login"); // login signup
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  const isValidForm = () => {
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
    }

    // validate confirm password
    if (confirmPasswordRef.current.value !== passwordRef.current.value) {
      newErrors.confirmPassword = "Passwords mismatch";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const authenticationFormSubmitHandler = (e) => {
    e.preventDefault();
    if (authenticationAction === "signup") {
      if (isValidForm()) {
        const signupRequesrURL = "http://127.0.0.1:8000/user/";
        axios
          .post(signupRequesrURL, {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          })
          .then((response) =>
            console.log("response sratus: " + response.status)
          )
          .catch((err) => {
            console.log("Signup error:");
            console.log(err);
            return null;
          });
      } else {
        console.log("form is not valid");
        return null;
      }
    }

    // login anyway
    const loginRequestURL = "http://127.0.0.1:8000/auth/";
    axios
      .post(loginRequestURL, {
        username: emailRef.current.value,
        password: passwordRef.current.value,
      })
      // .then((response)=> console.log(response))
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("username", response.data.username);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error:");
        console.log(err);
      });
  };

  const PassworRepeatComponent = () => {
    if (authenticationAction == "signup") {
      return (
        <>
          <input
            className="authentication-text-input"
            id="authentication-confirm-password-input"
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />
          <div className="authentication-form-error-message">
            {errors.confirmPassword}
          </div>
        </>
      );
    }
    return (
      <>
        <div className="password-repeat-space-holder authentication-text-input"></div>
        <div className="authentication-form-error-message"></div>
      </>
    );
  };

  return (
    <section className="authentication-modal-window">
      <div className="authentication-modal-window-container">
        
          <img className="login-img" src={loginImage} alt="" />
        
        <div className="authentication-input-main-container">
          <div className="vacancy-filter-close-container">
            <img
              className="vacancy-filter-close-button"
              onClick={closeButtonHandler}
              src={closeIcon}
              alt="X"
            />
          </div>
          <div className="authentication-action-buttons-container">
            <button
              className="authentication-action-buttons"
              id="authentication-action-button-login"
              onClick={authenticationActionButtonHandler}
            >
              Log in
            </button>
            <button
              className=" authentication-action-buttons"
              id="authentication-action-button-signup"
              onClick={authenticationActionButtonHandler}
            >
              Sign up
            </button>
          </div>
          <form
            className="authentication-form"
            onSubmit={authenticationFormSubmitHandler}
          >
            <input
              className="authentication-text-input"
              type="text"
              placeholder="User e-mail"
              ref={emailRef}
              required
            />
            <div className="authentication-form-error-message">
              {errors.email}
            </div>
            <input
              className="authentication-text-input"
              id="authentication-password-input"
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
            <div className="authentication-form-error-message">
              {errors.password}
            </div>
            <PassworRepeatComponent />
            <input
              type="submit"
              className="authentication-submit-button button-common button-common-color1"
              value="Enter"
            />
          </form>
        </div>
      </div>
    </section>
  );
};
