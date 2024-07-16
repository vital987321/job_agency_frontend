import React, { useEffect, useState } from "react";
import api from "../../api";
import "../../../css/userProfile.css";
import editIcon from "../../../svg/edit.svg";
import closeIcon from "../../../svg/X.svg";
import { ListUserApplicationsComponent } from "./ListUserApplicationsComponent";
import { VacanciesFavouritesComponent } from "./VacanciesFavouritesComponent";
import { phoneValidation } from "../../CommonToolsComponents";

const cvInputRef = React.createRef();

export const UserProfileComponent = () => {
  const [userData, setUserData] = useState(null);
  const [userCurrentData, setUserCurrentData] = useState({});
  const [isUserDataChanged, setIsUserDataChanged] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/user/" + user_id);
        setUserData(response.data);
        setUserCurrentData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

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
    updatedItem["cv"] = null;
    setUserCurrentData({
      ...userCurrentData,
      ...updatedItem,
    });
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
    return validationObject;
  };

  const submitUserProfileHandler = (e) => {
    e.preventDefault();
    if (isUserDataChanged) {
      let formData = new FormData();
      formData.append("first_name", userCurrentData.first_name);
      formData.append("last_name", userCurrentData.last_name);
      formData.append("phone", userCurrentData.phone);
      const cv = document.getElementById("user-profile-cv-input");
      if (cvInputRef.current.files[0]) {
        formData.append("cv", cvInputRef.current.files[0]);
      }

      const updateProfile = async (formData) => {
        try {
          const response = await api
            .patch("/user/" + user_id + "/", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => setUserCurrentData(response.data));

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

  const SubmitUserProfileChangesComponent = () => {
    if (isUserDataChanged) {
      return (
        <>
          <input
            type="submit"
            className="button-common profile-form-submit-button button-common-color1"
            value="Save changes"
          />
        </>
      );
    }
  };

  if (!userData) {
    return <div>User not found</div>;
  }
  return (
    <>
      <h2 className="home-h2">User profile</h2>
      <section className="profile-user-data-section">
        <div>
          <div className="profile-user-avatar-set">
            <p className="profile-avatar-capital-letter">
              {username[0].toUpperCase()}
            </p>
          </div>
        </div>
        <form
          className="profile-user-data-form"
          onSubmit={submitUserProfileHandler}
        >
          <div className="profile-user-data-input-container">
            <input
              className="profile-user-data-form-text-input"
              id="user-profile-email-input"
              data-key="email"
              type="text"
              placeholder="email"
              readOnly
              // onChange={inputChangeHandler}
              value={userCurrentData.email}
            />
          </div>

          <div className="profile-user-data-input-container">
            <img
              className="profile-user-data-edit-icon"
              src={editIcon}
              alt=""
            />
            <input
              className="profile-user-data-form-text-input"
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

          <div className="profile-user-data-input-container">
            <img
              className="profile-user-data-edit-icon"
              src={editIcon}
              alt=""
            />
            <input
              className="profile-user-data-form-text-input"
              id="user-profile-last-name-input"
              data-key="last_name"
              type="text"
              placeholder="Last name"
              onChange={inputChangeHandler}
              value={userCurrentData.last_name ? userCurrentData.last_name : ""}
            />
          </div>

          <div className="profile-user-data-form-item-contaimer">
            <div className="profile-user-data-input-container">
              <img
                className="profile-user-data-edit-icon"
                src={editIcon}
                alt=""
              />
              <input
                className="profile-user-data-form-text-input"
                id="user-profile-phone-input"
                data-key="phone"
                type="text"
                placeholder="Phone number"
                onChange={inputChangeHandler}
                value={userCurrentData.phone ? userCurrentData.phone : ""}
              />
            </div>

            <div className="profile-user-data-form-validation-item">
              {validationErrors.phone}
            </div>
          </div>

          <div className="profile-cv-input-container">
            <div className="profile-my-cv-link-container">
              {(() => {
                if (userCurrentData.cv) {
                  return (
                    <>
                      <a className="navLinks" href={userData.cv}>
                        My CV file
                      </a>
                      <button
                        className="profile-delete-cv-button"
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
              id="user-profile-cv-input"
              className={
                userCurrentData.cv
                  ? "user-profile-cv-input-replace"
                  : "user-profile-cv-input-upload"
              }
              ref={cvInputRef}
              onChange={() => setIsUserDataChanged(true)}
            />
          </div>

          <SubmitUserProfileChangesComponent />
        </form>
      </section>
      <VacanciesFavouritesComponent />
      <section className="profile-sent-applications-section">
        <h3 className="profile-sent-applications-header">Sent Applications</h3>
        <ListUserApplicationsComponent />
      </section>
    </>
  );
};
