import api from "../../../../services/api/api";
import iconHeartFull from "../../../../assets/svg/heart_full.svg";
import iconHeartEmpty from "../../../../assets/svg/heart_empty.svg";
import styles from "./ButtonFavourite.module.css";
import { USER_REQUEST_URL } from "../../../../data/constants";
import { useAuth } from "../../../../hooks/useAuth";

export const ButtonFavourite = (props) => {
  //* Hooks
  const { auth } = useAuth();
  
  //* Functions
  const favouriteButtonHandler = () => {
    const updateUserFavouritesRequest = async (favouritesArray) => {
      try {
        const requestUrl = USER_REQUEST_URL + auth.user_id + "/";
        const requestData = { favourites: favouritesArray };
        const request = await api
          .patch(requestUrl, requestData)
          .then((response) => {
            props.setUserData(response.data);
          })
          .then((res) => {
            props.setIsFavouriteVacancy(!props.isFavouriteVacancy);
          });
      } catch (error) {
        console.log(error);
      }
    };

    const favouritesArray = props.userData.favourites;

    if (props.isFavouriteVacancy) {
      const vacancyIndex = favouritesArray.indexOf(props.vacancyData.id);
      favouritesArray.splice(vacancyIndex, 1);
      updateUserFavouritesRequest(favouritesArray);
    } else if (props.isFavouriteVacancy === false) {
      favouritesArray.push(props.vacancyData.id);
      updateUserFavouritesRequest(favouritesArray);
    }
  };

  if (auth.user_id) {
    return (
      <button
        onClick={favouriteButtonHandler}
        className={styles["vacancy-favorite-button"]}
        title={
          props.isFavouriteVacancy
            ? "Remove from Favourites"
            : "Add to Favourites"
        }
      >
        <img
          src={props.isFavouriteVacancy ? iconHeartFull : iconHeartEmpty}
          className={styles["heart-filter"]}
          alt="Favorite"
        />
      </button>
    );
  }
  return "";
};
