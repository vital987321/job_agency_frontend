import styles from "./partnerForm.module.css";
import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/buttonType1";
import api from "../../../../../services/api/api";
import closeIcon from "../../../../../assets/svg/X.svg";
import React from "react";
import { useState, useEffect } from "react";
import { phoneValidation } from "../../../../../services/validators/phoneValidation";
import { PARTNERS_REQUEST_URL } from "../../../../../data/constants";

export const PartnerForm = (props) => {
  //* Props
  const formDisplayValue = props.formDisplayValue;
  const setFormDisplayValue = props.setFormDisplayValue;
  const setUpdateDataState = props.setUpdateDataState;
  const editPartnerData = props.editPartnerData; //optional

  //* States
  const [validationErrors, setValidationErrors] = useState({});
  const [formValues, setFormValues] = useState({
    company: "",
    hr_name: "",
    phone: "",
  });

  //* UseEffects
  useEffect(() => {
    setFormValues(editPartnerData);
  }, [editPartnerData]);

  //* Functions
  const closeButtonHandler = () => {
    setFormDisplayValue("none");
  };

  const formValidation = () => {
    let isFormValid = true;
    const newValidationErrors = {};

    if (!formValues.company) {
      newValidationErrors.company = "Input company name";
      isFormValid = false;
    }
    if (!formValues.company.length > 100) {
      newValidationErrors.company = "Max 100 symbols";
      isFormValid = false;
    }

    if (!formValues.hr_name) {
      newValidationErrors.hr_name = "Input HR specialist name";
      isFormValid = false;
    }

    if (!formValues.hr_name.length > 100) {
      newValidationErrors.hr_name = "Max 100 symbols";
      isFormValid = false;
    }

    if (!formValues.phone) {
      newValidationErrors.phone = "Input phone";
      isFormValid = false;
    }

    const phoneValidationObject = phoneValidation(formValues.phone);
    if (phoneValidationObject.phoneIsValid) {
      const validatedFormValues = { ...formValues };
      validatedFormValues.phone = phoneValidationObject.validatedPhone;
      setFormValues(validatedFormValues);
    } else {
      isFormValid = false;
      newValidationErrors.phone = phoneValidationObject.phoneValidationErrors;
    }

    setValidationErrors(newValidationErrors);
    return isFormValid;
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const sendPostRequest = async () => {
      try {
        const request = await api
          .post(PARTNERS_REQUEST_URL, formValues)
          .then((res) => closeButtonHandler())
          .then((res) => setUpdateDataState({}))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };

    const sendPatchRequest = async () => {
      const requestData = {
        company: formValues.company,
        hr_name: formValues.hr_name,
        phone: formValues.phone,
      };
      const requestUrl = PARTNERS_REQUEST_URL + formValues.id + "/";
      try {
        const request = await api
          .patch(requestUrl, requestData)
          .then((res) => closeButtonHandler())
          .then((res) => setUpdateDataState({}));
      } catch (error) {
        console.log(error);
      }
    };

    if (formValidation) {
      if (formValues.id) {
        sendPatchRequest();
      } else {
        sendPostRequest();
      }
    } else {
      console.log("form validation errors");
    }
  };

  const changeFormValue = (e) => {
    const inputkey = e.target.dataset.inputkey;
    const updatedValues = { ...formValues };
    updatedValues[inputkey] = e.target.value;
    setFormValues({ ...updatedValues });
  };

  //* Main Body
  return (
    <div
      style={{ display: formDisplayValue }}
      className={styles["form-modal-window-enviroment"]}
    >
      <form onSubmit={submitFormHandler} className={styles["form-container"]}>
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
            <h3>
              {editPartnerData.id
                ? `Partner ${editPartnerData.id}`
                : "New partner"}
            </h3>
          </div>

          <div className={styles["form-inputs-container"]}>
            <label htmlFor="partner-company-input">Company</label>
            <input
              id="partner-company-input"
              type="text"
              className={styles["form-input"]}
              data-inputkey="company"
              value={formValues.company}
              onChange={changeFormValue}
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
              data-inputkey="hr_name"
              value={formValues.hr_name}
              onChange={changeFormValue}
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
              data-inputkey="phone"
              value={formValues.phone}
              onChange={changeFormValue}
            />
            <div className={styles["form-validation-message"]}>
              {validationErrors.phone}
            </div>
          </div>

          <div className={styles["submit-button-container"]}>
            <ButtonType1
              value="Submit"
              strength="1"
              onClickHandler={submitFormHandler}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
