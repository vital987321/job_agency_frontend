import api from "../../../../services/api/api";
import iconHeartFull from "../../../../assets/svg/heart_full.svg";
import iconHeartEmpty from "../../../../assets/svg/heart_empty.svg";
import styles from "./ButtonFavourite.module.css";
import { USER_REQUEST_URL } from "../../../../data/constants";
import { useAuth } from "../../../../hooks/useAuth";
import toast  from "react-hot-toast";
import { useEffect, useState } from "react";

/**
 * @typedef {object} Props
 * @property {object} userData from user endpoind
 * @property {function} setUserData
 * @property {string} vacancyId
 * @param {Props} props 
 * @returns {JSX.Element}
 */

export const ButtonFavourite = ({
  userData,
  setUserData,
  vacancyId,
}) => {

  //* States
  const [isFavouriteVacancy, setIsFavouriteVacancy] = useState(false);
  
  //* Hooks
  const { auth } = useAuth();
  
  //* useEffects
  useEffect(() => {
    if (auth.user_id) {
      if (userData.favourites) {
        if (userData.favourites.includes(vacancyId)) {
          setIsFavouriteVacancy(true);
        }
      }
    }
  }, [userData?.favourites]);
  
  //* Functions
  const favouriteButtonHandler = () => {
    const updateUserFavouritesRequest = async (favouritesArray) => {
      try {
        const requestUrl = USER_REQUEST_URL + auth.user_id + "/";
        const requestData = { favourites: favouritesArray };
        const request = await api
          .patch(requestUrl, requestData)
          .then((response) => {
            setUserData(response.data);
          })
          .then((res) => setIsFavouriteVacancy(!isFavouriteVacancy));
      } catch (error) {
        console.log(error);
      }
    };

    const favouritesArray = userData.favourites;

    if (isFavouriteVacancy) {
      const vacancyIndex = favouritesArray.indexOf(vacancyId);
      favouritesArray.splice(vacancyIndex, 1);
      updateUserFavouritesRequest(favouritesArray);
      toast.error("Removed");
    } else if (isFavouriteVacancy === false) {
      favouritesArray.push(vacancyId);
      updateUserFavouritesRequest(favouritesArray);
      toast.success("Added");
    }
  };

  //* Main Body
  if (auth.user_id) {
    return (
      <>
      <button
        onClick={favouriteButtonHandler}
        className={styles["vacancy-favorite-button"]}
        title={
          isFavouriteVacancy
            ? "Remove from Favourites"
            : "Add to Favourites"
        }
      >
        <img
          src={isFavouriteVacancy ? iconHeartFull : iconHeartEmpty}
          className={styles["heart-filter"]}
          alt="Favourite"
        />
        </button>
      </>
      
    );
  }
  return "";
};
