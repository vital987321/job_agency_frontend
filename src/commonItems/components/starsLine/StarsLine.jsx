import starWhiteIcon from "../../../assets/svg/rating_star_icon_white.svg";
import starYellowIcon from "../../../assets/svg/rating_star_icon_yellow.svg";
import styles from "./StarsLine.module.css";

/**
 * Returns yellow/white 5 stars according to passed rating
 * 
 * @typedef {object} Props
 * @property {Number} rating 
 * @property {boolean} roundRating 
 *    True:   rating 3.4 --> ***, rating 3.6-->****
 *    False:  rating 3.4 --> ***, rating 3.6-->***
 * 
 * @param {Props} props  
 * @returns {JSX.Element}
 */


export const StarsLine = (props) => {
  //* Props
  const rating = props.rating;
  
  //* Variables
  const shiftValue = props.roundRating ? -0.5 : 0;
  
  //* Main Body
  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => {
        const starIcon =
          rating >= item + shiftValue ? starYellowIcon : starWhiteIcon;
        return (
          <img src={starIcon} className={styles.star} alt="*" key={item} />
        );
      })}
    </>
  );
};
