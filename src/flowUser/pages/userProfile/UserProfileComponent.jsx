import React, { useEffect, useState } from "react";
import api from "../../../services/api/api";
import styles from "./userProfile.module.css";
import { ListUserApplicationsComponent } from "./substructures/listUserApplications/ListUserApplicationsComponent";
import { VacanciesFavouritesComponent } from "./substructures/vacanciesFavourites/VacanciesFavouritesComponent";
import { UserPersonalData } from "./substructures/userPersonalData/userPersonalData";

export const UserProfileComponent = () => {
  const [userData, setUserData] = useState(null);
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const request = await api.get("/user/" + user_id).then((response) => {
          setUserData(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h2 className={`h2-common ${styles.headline}`}>User profile</h2>
      <UserPersonalData userData={userData} />
      <VacanciesFavouritesComponent />
      <ListUserApplicationsComponent />
    </>
  );
};
