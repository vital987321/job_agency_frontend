import React, {useState } from "react";
import closeIcon from "../../../../../assets/svg/X.svg";
import "./applicationForm.css";
import axios from "axios";
import { phoneValidation } from "../../../../../commonItems/components/CommonToolsComponents";
import { emailValidation } from "../../../../../commonItems/components/CommonToolsComponents";
import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/ButtonType1";

const firstNameRef = React.createRef();
const lastNameRef = React.createRef();
const phoneRef = React.createRef();
const emailRef = React.createRef();
const messageRef = React.createRef();
const cvFileRef = React.createRef();

export const ApplicationFormComponent = (props) => {
  const [usingProfileCV, setUsingProfileCV] = useState(true);
  const [formValidationErrors, setFormValidationErrors] = useState({});

  const formValidation = (formData) => {
    let isFormValid = true;
    let newValidationErrors = {};

    const first_name = formData.get("first_name");
    if (!first_name) {
      isFormValid = false;
      newValidationErrors.first_name = "Enter first name";
    }
    if (first_name.length > 30) {
      isFormValid = false;
      newValidationErrors.first_name = "Too long name";
    }

    const last_name = formData.get("last_name");
    if (!last_name) {
      isFormValid = false;
      newValidationErrors.last_name = "Enter last name";
    }
    if (last_name.length > 30) {
      isFormValid = false;
      newValidationErrors.last_name = "Too long name";
    }

    const phone = formData.get("phone");
    const phoneValidationObject = phoneValidation(phone);
    if (phoneValidationObject.phoneIsValid) {
      formData.set("phone", phoneValidationObject.validatedPhone);
    } else {
      isFormValid = false;
      newValidationErrors.phone = phoneValidationObject.phoneValidationErrors;
    }

    const email = formData.get("email");
    const emailValidationObject = emailValidation(email);
    if (!emailValidationObject.isValid) {
      isFormValid = false;
      newValidationErrors.email = emailValidationObject.validationErrors;
    }

    return {
      isFormValid: isFormValid,
      formData: formData,
      formValidationErrors: newValidationErrors,
    };
  };

  const appFormSubmitHandler = (event) => {
    event.preventDefault();
    const applicationPostURL = "http://127.0.0.1:8000/application/";
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const message = messageRef.current.value;
    let cvFile = null;
    try {
      cvFile = cvFileRef.current.files[0];
    } catch {}

    const user_id = localStorage.getItem("user_id");

    let formData = new FormData();

    formData.append("vacancy", props.vacancy.id);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    if (usingProfileCV && props.userData.cv) {
      formData.append("use_profile_cv", true);
    }
    if (user_id) formData.append("user", user_id);

    if (cvFile) {
      formData.append("cv", cvFile);
    }

    const sendApplicationRequest = (formData) => {
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

    const validatedForm = formValidation(formData);
    setFormValidationErrors(validatedForm.formValidationErrors);
    if (validatedForm.isFormValid) {
      const validatedFormData = validatedForm.formData;
      sendApplicationRequest(validatedFormData);
    }
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
            <p>Fill-in this application form</p>
          </div>

          <div className="application-form-inputs-container">
            <div>
              <input
                className="application-form-user-input"
                type="text"
                id="first-name-application-form"
                placeholder="First Name"
                defaultValue={props.userData.first_name}
                ref={firstNameRef}
              />
              <div className="application-form-validation-message-container">
                {formValidationErrors.first_name}
              </div>
            </div>

            <div>
              <input
                className="application-form-user-input"
                type="text"
                id="last-name-application-form"
                placeholder="Last Name"
                defaultValue={props.userData.last_name}
                ref={lastNameRef}
              />
              <div className="application-form-validation-message-container">
                {formValidationErrors.last_name}
              </div>
            </div>

            <div>
              <input
                className="application-form-user-input"
                type="text"
                id="phone-application-form"
                placeholder="Phone"
                defaultValue={props.userData.phone}
                ref={phoneRef}
              />
              <div className="application-form-validation-message-container">
                {formValidationErrors.phone}
              </div>
            </div>

            <div>
              <input
                className="application-form-user-input"
                type="text"
                id="email-application-form"
                placeholder="Email"
                defaultValue={props.userData.email}
                ref={emailRef}
              />
              <div className="application-form-validation-message-container">
                {formValidationErrors.email}
              </div>
            </div>

            <AttachCvCheckBoxComponent />
            <UploadCvButtonComponent />
          </div>

          <div className="application-form-message-container">
            <label htmlFor="message-application-form">Your message:</label>
            <textarea
              name=""
              id="message-application-form"
              cols="30"
              rows="6"
              ref={messageRef}
            ></textarea>
          </div>
          <div className="application-form-submit-block">
            <ButtonType1
              value='Apply'
              onClickHandler={appFormSubmitHandler}
            />
          </div>
        </div>
      </form>
    </>
  );
};
