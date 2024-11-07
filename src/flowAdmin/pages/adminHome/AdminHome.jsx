import beeCells from "../../../assets/svg/beeCells.svg"
import styles from "./AdminHome.module.css"

export const AdminHome = () => {
    return (
        <section className={styles.homeSection}>
            <div className={styles.slogan}>
                <h1>Bring Talent to You, One Bee at a Time!</h1>
            </div>
            <div className={styles.backgroundContainer}>
                <img className={styles.backgroundPic} src={beeCells} alt="Bee Cells" />
            </div>

        </section>
        
    )
}