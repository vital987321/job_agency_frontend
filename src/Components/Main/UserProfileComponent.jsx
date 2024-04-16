import { useEffect, useState } from "react";
import api from "../api";
import "../../css/userProfile.css";
import editIcon from "../../svg/edit.svg";

export const UserProfileComponent = () => {
  const [userData, setUserData] = useState(null);
  const [userCurrentData, setUserCurrentData] = useState({});
  const [isUserDataChanged, setIsUserDataChanged] = useState(false);

  const user_id = JSON.parse(localStorage.getItem("user_id"));

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

  const SubmitUserProfileChangesComponent = () => {
    if (isUserDataChanged) {
      return (
        <>
          <input type="submit" className="button-common profile-form-submit-button" value="Save changes" />
        </>
      );
    }
  };

  const username = localStorage.getItem("username");

  if (!userData) {
    return <div>User not found</div>;
  }
  return (
    <>
      <h2 className="home-h2">Personal profile</h2>
      <section className="profile-user-data-section">
        <div>
          <div className="profile-user-avatar-set">
            <p className="profile-avatar-capital-letter">
              {username[0].toUpperCase()}
            </p>
          </div>
        </div>
        <form className="profile-user-data-form">
          <div className="profile-user-data-input-container">
            {/* <img
              className="profile-user-data-edit-icon"
              src={editIcon}
              alt=""
            /> */}
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

          <SubmitUserProfileChangesComponent />
        </form>
      </section>
    </>
  );
};
