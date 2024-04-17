import React, { useEffect, useState } from "react";
import closeIcon from "../../svg/X.svg";
import { Form } from "react-router-dom";
import "../../css/ApplicationForm.css";
import axios from "axios";

const firstNameRef = React.createRef();
const lastNameRef = React.createRef();
const phoneRef = React.createRef();
const emailRef = React.createRef();
const messageRef = React.createRef();
const cvFileRef = React.createRef();

export const ApplicationFormComponent = (props) => {
  const [usingProfileCV, setUsingProfileCV] = useState(true);

  const appFormSubmitHandler = (event) => {
    event.preventDefault();
    const applicationPostURL = "http://127.0.0.1:8000/application/";
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const message = messageRef.current.value;
    const cvFile = cvFileRef.current.files[0];

    let formData = new FormData();

    formData.append("vacancy", props.vacancy.id);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    if (cvFile) {
      formData.append("cv", cvFile);
    }

    axios
      .post(applicationPostURL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => console.log("response sratus: " + response.status))
      .then(() => alert("Application sent succesfully"))
      .then(() => props.setAppFormDisplayValue("none"))
      .catch((err) => {
        console.log("Application error:");
        console.log(err);
      });
  };

  const closeButtonHandler = () => {
    props.setAppFormDisplayValue("none");
  };

  const onFormModalSpaceClick = (e) => {
    if (e.target.id == "application-form") closeButtonHandler();
  };

  const AttachCvCheckBoxComponent = () => {
    const checkBoxProfileCvHandler = (e) => {
      setUsingProfileCV(!usingProfileCV);
    };

    if (props.userData.cv) {
      return (
        <>
          <div>
            <input
              type="checkbox"
              id="application-form-cv-cb"
              name="profile_cv"
              checked={usingProfileCV}
              onChange={checkBoxProfileCvHandler}
            />
            <label htmlFor="application-form-cv-cb">
              Attach CV from my profile
            </label>
          </div>
        </>
      );
    }
  };

  const UploadCvButtonComponent = () => {
    if (!usingProfileCV || !props.userData.cv) {
      return (
        <input type="file" className="cv-application-form" ref={cvFileRef} />
      );
    }
  };

  return (
    <>
      <form
        id="application-form"
        onSubmit={appFormSubmitHandler}
        style={{ display: props.AppFormDisplayValue }}
        onClick={onFormModalSpaceClick}
      >
        <div className="application-form-container">
          <div className="vacancy-filter-close-container">
            <img
              className="vacancy-filter-close-button"
              onClick={closeButtonHandler}
              src={closeIcon}
              alt="X"
            />
          </div>
          <div className="application-form-header">
            <h3>{props.vacancy.name}</h3>
            <p>Fill-in this application form and we will contact you ASAP</p>
          </div>

          <div className="application-form-inputs-container">
            <input
              className="application-form-user-input"
              type="text"
              id="first-name-application-form"
              placeholder="First Name"
              defaultValue={props.userData.first_name}
              ref={firstNameRef}
            />
            <input
              className="application-form-user-input"
              type="text"
              id="last-name-application-form"
              placeholder="Last Name"
              defaultValue={props.userData.last_name}
              ref={lastNameRef}
            />
            <input
              className="application-form-user-input"
              type="text"
              id="phone-application-form"
              placeholder="Phone"
              defaultValue={props.userData.phone}
              ref={phoneRef}
            />
            <input
              className="application-form-user-input"
              type="text"
              id="email-application-form"
              placeholder="Email"
              defaultValue={props.userData.email}
              ref={emailRef}
            />
            <AttachCvCheckBoxComponent />
            <UploadCvButtonComponent />
          </div>

          <div className="application-form-message-container">
            <label htmlFor="message-application-form">Your message:</label>
            <textarea
              name=""
              id="message-application-form"
              cols="30"
              rows="10"
              ref={messageRef}
            ></textarea>
          </div>
          <div className="application-form-submit-block">
            <input
              className="application-form-submit-button button-common"
              type="submit"
              value="Apply"
            />
          </div>
        </div>
      </form>
    </>
  );
};
