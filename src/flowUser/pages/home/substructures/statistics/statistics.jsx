import styles from "./statistics.module.css"

export const Statistics=()=>{
    return(
        <section className={styles["statistics-container"]}>
        <div className={styles["statistics-subcontainer"]}>
          <div className={styles["statistics-impressive-text"]}>124</div>
          <div className={styles["statistics-plain-text"]}>Companies in cooperation</div>
        </div>
        <div className={styles["statistics-subcontainer"]}>
          <div className={styles["statistics-impressive-text"]}>3850</div>
          <div className={styles["statistics-plain-text"]}>Successful employments</div>
        </div>
        <div className={styles["statistics-subcontainer"]}>
          <div className={styles["statistics-impressive-text"]}>5000</div>
          <div className={styles["statistics-plain-text"]}>
            Vacancies available for our clients
          </div>
        </div>
        <div className={styles["statistics-subcontainer"]}>
          <div className={styles["statistics-impressive-text"]}>84%</div>
          <div className={styles["statistics-plain-text"]}>
            Of our clients found a job within one week
          </div>
        </div>
      </section>
    )
}