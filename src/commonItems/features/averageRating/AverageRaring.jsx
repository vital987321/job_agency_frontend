import styles from "./AverageRating.module.css"
import { StarsLine } from "../../components/starsLine/StarsLine";
import { useEffect, useState } from "react";

/**
 * @typedef {object} Props
 * @property {string} reviewsResponseData // average rating, e.g."4.6666"
 * @param {Props} props 
 * @returns {JSX.Element}
 */

export const AverageRating=({reviewsResponseData})=>{
  console.log(reviewsResponseData)
  // console.log(reviewsResponseData.results[0].avg_rating)
  let rating=''
  try{
      rating= reviewsResponseData.results[0].avg_rating
      rating=Math.round(rating*10)/10
      console.log(rating)
  }catch(error){rating='loading'}
    


    return (
      <section>
        <div className={styles.mainBody}>
          <p>Averege Rating:</p>
          <p className={styles.ratingValue}>{rating}</p>
          <p>
            <StarsLine rating={rating} roundRating={true} />
          </p>
        </div>
      </section>
    );
}