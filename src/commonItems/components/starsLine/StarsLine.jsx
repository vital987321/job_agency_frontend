import starWhiteIcon from "../../../assets/svg/rating_star_icon_white.svg";
import starYellowIcon from "../../../assets/svg/rating_star_icon_yellow.svg";
import styles from "./starsLine.module.css";

export const StarsLine = (props) => {
  const rating = props.rating;
  const shiftCriteria = props.shiftCriteria ? props.shiftCriteria : 0;
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
