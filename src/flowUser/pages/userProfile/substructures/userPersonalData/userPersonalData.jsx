// import styles from "./userPersonalData.module.css";
import styles from "./userPersonalData.module.css";
import { AvatarComponent } from "../../../../../commonItems/components/AvatarComponent";
import React, { useState, useRef } from "react";
import api from "../../../../../services/api/api";
import { phoneValidation } from "../../../../../commonItems/components/CommonToolsComponents";
import {
  AVATAR_FILE_SIZE_LIMIT,
  CV_FILE_SIZE_LIMIT,
} from "../../../../../data/constants";
import editIcon from "../../../../../assets/svg/edit.svg";
import { SubmitButton } from "./submitButton/submitButton";
import { useAuth } from "../../../../../hooks/useAuth";

export const UserPersonalData = (props) => {
  //* Props
  const userData = props.userData;

  //* Refs
  const cvInputRef = useRef();
  const avatarInputRef = useRef();
  
  //* hooks
  const {auth}=useAuth()
  const {setAuth}=useAuth()

  //* States
  const [userCurrentData, setUserCurrentData] = useState({ ...userData });
  const [isUserDataChanged, setIsUserDataChanged] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [userAvatarUrl, setUserAvatarUrl] = useState(
    auth.userAvatarUrl)
  

  

  //* Variables
  const user_id = auth.user_id;
  const username = auth.username;
  
  //* Functions
  const inputChangeHandler = (e) => {
    let updatedItem = {};
    const itemKey = e.target.dataset.key;
    const intemValue = e.target.value;
    updatedItem[itemKey] = intemValue;
    setUserCurrentData({
      ...userCurrentData,
      ...updatedItem,
    });

    setIsUserDataChanged(true);
  };

  const deleteCvButtonHandler = (e) => {
    e.preventDefault();
    let updatedItem = {};
    updatedItem["cv"] = "";
    setUserCurrentData({
      ...userCurrentData,
      ...updatedItem,
    });
    setIsUserDataChanged(true);
  };

  const deletePhotoButtonHandler = (e) => {
    e.preventDefault();
    let updatedItem = {};
    updatedItem["avatar"] = "";
    setUserCurrentData({
      ...userCurrentData,
      ...updatedItem,
    });
    setUserAvatarUrl("");
    setIsUserDataChanged(true);
  };

  const formValidation = (formData) => {
    let validationObject = {
      isValid: true,
      formData: formData,
      validationErrors: {},
    };

    const phone = formData.get("phone");
    const phoneValidationObject = phoneValidation(phone);
    if (phoneValidationObject.phoneIsValid) {
      validationObject.formData.set(
        "phone",
        phoneValidationObject.validatedPhone
      );
    } else {
      validationObject.isValid = false;
      validationObject.validationErrors.phone =
        phoneValidationObject.phoneValidationErrors;
    }

    const first_name = formData.get("first_name");
    if (first_name.length > 30) {
      validationObject.isValid = false;
      validationObject.validationErrors.first_name = "Too long name";
    }

    const last_name = formData.get("last_name");
    if (last_name.length > 30) {
      validationObject.isValid = false;
      validationObject.validationErrors.last_name = "Too long name";
    }

    const avatar = formData.get("avatar");
    if (avatar) {
      if (avatar.size > AVATAR_FILE_SIZE_LIMIT) {
        validationObject.isValid = false;
        validationObject.validationErrors.avatar =
          "Max file size is " +
          (AVATAR_FILE_SIZE_LIMIT / 1024).toString() +
          " KB";
      }
    }

    const cv = formData.get("cv");
    if (cv) {
      if (cv.size > CV_FILE_SIZE_LIMIT) {
        validationObject.isValid = false;
        validationObject.validationErrors.cv =
          "Max file size is " + (CV_FILE_SIZE_LIMIT / 1024).toString() + " KB";
      }
    }
    return validationObject;
  };

  const submitUserProfileFormHandler = (e) => {
    e.preventDefault();
    if (isUserDataChanged) {
      let formData = new FormData();
      formData.append("first_name", userCurrentData.first_name);
      formData.append("last_name", userCurrentData.last_name);
      formData.append("phone", userCurrentData.phone);
      // const cv = document.getElementById("user-profile-cv-input");
      if (cvInputRef.current.files[0]) {
        formData.append("cv", cvInputRef.current.files[0]);
      } else if (userCurrentData.cv == "") {
        formData.append("cv", userCurrentData.cv);
      }
      if (avatarInputRef.current.files[0]) {
        formData.append("avatar", avatarInputRef.current.files[0]);
      } else if (userCurrentData.avatar == "") {
        formData.append("avatar", userCurrentData.avatar);
      }

      const updateProfile = async (formData) => {
        try {
          const response = await api
            .patch("/user/" + user_id + "/", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              setUserCurrentData(response.data);
              setAuth({
                user_id:response.data.user_id,
                role: response.data.role,
                username: response.data.username,
                userAvatarUrl: response.data.avatar,
              })
            });

          setIsUserDataChanged(false);
        } catch (error) {
          console.log(error);
        }
      };

      const formValidationObject = formValidation(formData);
      setValidationErrors(formValidationObject.validationErrors);
      if (formValidationObject.isValid) {
        updateProfile(formValidationObject.formData);
      }
    }
  };

  //* Main Body
  return (
    <form
      className={styles["profile-user-data-form"]}
      onSubmit={submitUserProfileFormHandler}
    >
      <div className={styles["profile-user-data-form-cotnainer1"]}>
        <AvatarComponent
          userAvatarUrl={userAvatarUrl}
          iconSymbol={username[0].toUpperCase()}
          size={250}
        />
        <div className={styles["profile-user-data-input-validation-container"]}>
          <div className={styles["profile-user-avatar-controls-container"]}>
            <input
              type="file"
              accept=".jpg, .jgeg, .png"
              id="user-profile-avatar-input"
              className={
                userCurrentData.avatar
                  ? styles["user-profile-avatar-input-replace"]
                  : styles["user-profile-avatar-input-upload"]
              }
              ref={avatarInputRef}
              onChange={() => setIsUserDataChanged(true)}
            />
            {(() => {
              if (userCurrentData.avatar) {
                return (
                  <>
                    <button
                      className={styles["profile-delete-avatar-button"]}
                      title="Delete Photo"
                      onClick={deletePhotoButtonHandler}
                    >
                      &#x2716;
                    </button>
                  </>
                );
              }
            })()}
          </div>
          <div className={styles["profile-user-data-form-validation-item"]}>
            {validationErrors.avatar}
          </div>
        </div>
      </div>

      <div className={styles["profile-user-data-form-cotnainer2"]}>
        <div className={styles["profile-user-data-input-validation-container"]}>
          <div className={styles["profile-user-data-input-container"]}>
            <input
              className={styles["profile-user-data-form-text-input"]}
              id="user-profile-email-input"
              data-key="email"
              type="text"
              placeholder="email"
              readOnly
              // onChange={inputChangeHandler}
              value={userCurrentData.email}
            />
          </div>
          <div className={styles["profile-user-data-form-validation-item"]}>
            {validationErrors.email}
          </div>
        </div>

        <div className={styles["profile-user-data-input-validation-container"]}>
          <div className={styles["profile-user-data-input-container"]}>
            <img
              className={styles["profile-user-data-edit-icon"]}
              src={editIcon}
              alt=""
            />
            <input
              className={styles["profile-user-data-form-text-input"]}
              id="user-profile-first-name-input"
              data-key="first_name"
              type="text"
              placeholder="First name"
              onChange={inputChangeHandler}
              value={
                userCurrentData.first_name ? userCurrentData.first_name : ""
              }
            />
          </div>
          <div className={styles["profile-user-data-form-validation-item"]}>
            {validationErrors.first_name}
          </div>
        </div>

        <div className={styles["profile-user-data-input-validation-container"]}>
          <div className={styles["profile-user-data-input-container"]}>
            <img
              className={styles["profile-user-data-edit-icon"]}
              src={editIcon}
              alt=""
            />
            <input
              className={styles["profile-user-data-form-text-input"]}
              id="user-profile-last-name-input"
              data-key="last_name"
              type="text"
              placeholder="Last name"
              onChange={inputChangeHandler}
              value={userCurrentData.last_name ? userCurrentData.last_name : ""}
            />
          </div>
          <div className={styles["profile-user-data-form-validation-item"]}>
            {validationErrors.last_name}
          </div>
        </div>

        <div className={styles["profile-user-data-input-validation-container"]}>
          <div className={styles["profile-user-data-input-container"]}>
            <img
              className={styles["profile-user-data-edit-icon"]}
              src={editIcon}
              alt=""
            />
            <input
              className={styles["profile-user-data-form-text-input"]}
              id="user-profile-phone-input"
              data-key="phone"
              type="text"
              placeholder="Phone number"
              onChange={inputChangeHandler}
              value={userCurrentData.phone ? userCurrentData.phone : ""}
            />
          </div>

          <div className={styles["profile-user-data-form-validation-item"]}>
            {validationErrors.phone}
          </div>
        </div>

        <div className={styles["profile-user-data-input-validation-container"]}>
          <div className={styles["profile-cv-input-container"]}>
            <div className={styles["profile-my-cv-link-container"]}>
              {(() => {
                if (userCurrentData.cv) {
                  return (
                    <>
                      <a className="navLinks" href={userData.cv}>
                        My CV file
                      </a>
                      <button
                        className={styles["profile-delete-cv-button"]}
                        title="Delete CV"
                        onClick={deleteCvButtonHandler}
                      >
                        &#x2716;
                      </button>
                    </>
                  );
                }
                return <p>No user CV file</p>;
              })()}
            </div>

            <input
              type="file"
              accept=".pdf, .doc, .docx"
              id="user-profile-cv-input"
              className={
                userCurrentData.cv
                  ? styles["user-profile-cv-input-replace"]
                  : styles["user-profile-cv-input-upload"]
              }
              ref={cvInputRef}
              onChange={() => setIsUserDataChanged(true)}
            />
          </div>
          <div className={styles["profile-user-data-form-validation-item"]}>
            {validationErrors.cv}
          </div>
        </div>
        <SubmitButton
          isUserDataChanged={isUserDataChanged}
          onSubmit={submitUserProfileFormHandler}
        />
      </div>
    </form>
  );
};
