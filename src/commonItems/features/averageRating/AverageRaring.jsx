import styles from "./AverageRating.module.css"
import { StarsLine } from "../../components/starsLine/StarsLine";


export const AverageRating=(props)=>{
    const responseData=props.responseData
    let rating=''
    try{
        rating= responseData.results[0].avg_rating
        rating=Math.round(rating*10)/10
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