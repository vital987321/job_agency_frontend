import { useEffect, useState } from "react";
import api from "../api";

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

  const SubmitUserProfileChangesComponent=()=>{
    if (isUserDataChanged){
        return <>
            <input type="submit" className="button-common" value="Save changes"/>
        </>
    }
  }


  if (userData) {
    return (
      <>
        <form>
          <input
            id="user-profile-email-input"
            data-key="email"
            type="text"
            placeholder="email"
            onChange={inputChangeHandler}
            value={userCurrentData.email}
          />
          <input
            id="user-profile-first-name-input"
            data-key="first_name"
            type="text"
            placeholder="First name"
            onChange={inputChangeHandler}
            value={userCurrentData.first_name ? userCurrentData.first_name : ""}
          />
          <input
            id="user-profile-last-name-input"
            data-key="last_name"
            type="text"
            placeholder="Last name"
            onChange={inputChangeHandler}
            value={userCurrentData.last_name ? userCurrentData.last_name : ""}
          />
          <input
            id="user-profile-phone-input"
            data-key="phone"
            type="text"
            placeholder="Phone number"
            onChange={inputChangeHandler}
            value={userCurrentData.phone ? userCurrentData.phone : ""}
          />
        <SubmitUserProfileChangesComponent/>

        </form>
      </>
    );

  }
  else{
    return <div>User not found</div>
  }
};
