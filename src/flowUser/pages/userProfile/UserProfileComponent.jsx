import React, { useEffect, useState } from "react";
import api from "../../../services/api/api";
import styles from "./userProfile.module.css";
import { ListUserApplicationsComponent } from "./context/listUserApplications/ListUserApplicationsComponent";
import { VacanciesFavouritesComponent } from "./context/vacanciesFavourites/VacanciesFavouritesComponent";
import { UserPersonalData } from "./context/userPersonalData/userPersonalData";

export const UserProfileComponent = () => {
  const [userData, setUserData] = useState(null);

  const user_id = JSON.parse(localStorage.getItem("user_id"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const request = await api
          .get("/user/" + user_id)
          .then((response)=>{
           setUserData(response.data); 
          })          
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);


  if (!userData) {
    return <div>User not found</div>;
  }
  return (
    <>
      <h2 className="home-h2">User profile</h2>
      <section className={styles["profile-user-data-section"]}>
        <UserPersonalData
          userData={userData}
        />
      </section>
      <VacanciesFavouritesComponent />
      <section className={styles["profile-sent-applications-section"]}>
        <h3 className={styles["profile-sent-applications-header"]}>My Applications</h3>
        <ListUserApplicationsComponent />
        
      </section>
    </>
  );
};
