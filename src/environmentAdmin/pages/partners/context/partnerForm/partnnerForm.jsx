import styles from "./partnerForm.module.css";
import { ButtonType1 } from "../../../../../environmentCommon/components/buttons/buttonType1/ButtonType1";
import api from "../../../../../services/api/api";
import closeIcon from "../../../../../assets/svg/X.svg";
import React from "react";
import { useState } from "react";
import { phoneValidation } from "../../../../../environmentCommon/components/CommonToolsComponents";
import { PARTNERS_REQUEST_URL } from "../../../../../data/constants";

export const PartnerForm = (props) => {
    // props
  const formDisplayValue = props.formDisplayValue;
  const setFormDisplayValue = props.setFormDisplayValue;
  const setUpdateDataState=props.setUpdateDataState;

  // Refs
    const companyRef=React.createRef()
    const hrSpecialistRef=React.createRef()
    const phoneRef=React.createRef()


// States
const [validationErrors, setValidationErrors] = useState({});


  // functions
  const closeButtonHandler = () => {
    setFormDisplayValue("none");
  };

  const formValidation = (data) => {
    const validatedData={}
    let isFormValid = true;

    const newValidationErrors = {};
    if (!data.company) {
      newValidationErrors.company = "Input company name";
      isFormValid = false;
    }
    validatedData.company=data.company.slice(0,100)

    if (!data.hr_name) {
        newValidationErrors.hr_name = "Input HR specialist name";
        isFormValid = false;
      }
    validatedData.hr_name=data.hr_name.slice(0,100)

    if (!data.phone) {
      newValidationErrors.phone = "Input phone";
      isFormValid = false;
    }

    const phoneValidationObject=phoneValidation(data.phone)
    if (phoneValidationObject.phoneIsValid) {
        validatedData.phone=phoneValidationObject.validatedPhone
    }
    else{
        isFormValid = false;
        newValidationErrors.phone=phoneValidationObject.phoneValidationErrors
    }

    setValidationErrors(newValidationErrors);
    const validationObject={
        'isFormValid': isFormValid,
        'validatedData': validatedData
  }
    return validationObject
  }

  const submitFormHandler = (e) => {
    e.preventDefault();


    const formRefData = {
      company: companyRef.current.value,
      hr_name: hrSpecialistRef.current.value,
      phone: phoneRef.current.value
    };

    const sendPostRequest = async (requestData) => {
      try {
        const request = await api
          .post(PARTNERS_REQUEST_URL, requestData)
          .then((res) => closeButtonHandler())
          .then((res)=>setUpdateDataState({}))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };

    const validation=formValidation(formRefData)
    if (validation.isFormValid){
        sendPostRequest(validation.validatedData);
    }
    else {
      console.log("form validation errors");
    }
  };



  return (
    <div
      style={{ display: formDisplayValue }}
      className={styles["form-modal-window-enviroment"]}
    >
      <form
        onSubmit={submitFormHandler}
        className={styles["form-container"]}
      >
        <div className={styles["form-close-button-container"]}>
          <img
            className={styles["form-close-button"]}
              onClick={closeButtonHandler}
            src={closeIcon}
            alt="X"
          />
        </div>

        <div className={styles["form-main-container"]}>
          <div className={styles["form-header-container"]}>
            <h3>New partner</h3>
          </div>

          <div className={styles["form-inputs-container"]}>
            <label htmlFor="partner-company-input">Company</label>
            <input
              id="partner-company-input"
              type="text"
              className={styles["form-input"]}
              ref={companyRef}
            />
            <div className={styles["form-validation-message"]}>
              {validationErrors.company}
            </div>
          </div>

          <div className={styles["form-inputs-container"]}>
            <label htmlFor="partner-company-input">HR Specialist</label>
            <input
              id="partner-hr-specialist-input"
              type="text"
              className={styles["form-input"]}
              ref={hrSpecialistRef}
            />
            <div className={styles["form-validation-message"]}>
                {validationErrors.hr_name}
            </div>
          </div>
          

          <div className={styles["form-inputs-container"]}>
            <label htmlFor="partner-company-input">Phone</label>
            <input
              id="partner-phone-input"
              type="text"
              className={styles["form-input"]}
              ref={phoneRef}
            />
            <div className={styles["form-validation-message"]}>
                {validationErrors.phone}
            </div>
          </div>
          

          <div className={styles["submit-button-container"]}>
            <ButtonType1
              value="Send Review"
              strength="1"
              onClickHandler={submitFormHandler}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
