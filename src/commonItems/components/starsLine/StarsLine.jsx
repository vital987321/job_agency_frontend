import starWhiteIcon from "../../../assets/svg/rating_star_icon_white.svg";
import starYellowIcon from "../../../assets/svg/rating_star_icon_yellow.svg";
import styles from "./starsLine.module.css";

export const StarsLine = (props) => {
  //* Props
  const rating = props.rating;
  
  //* Variables
  const shiftCriteria = props.shiftCriteria ? props.shiftCriteria : 0;
  
  //* Main Body
  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => {
        const starIcon =
          rating >= item + shiftCriteria ? starYellowIcon : starWhiteIcon;
        return (
          <img src={starIcon} className={styles.star} alt="*" key={item} />
        );
      })}
    </>
  );
};
