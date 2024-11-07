import kofolaIcon from "../../../../../assets/svg/1200px-Kofola_logo 1.svg";
import lidlIcon from "../../../../../assets/svg/Lidl_logo 1.svg";
import kauflandIcon from "../../../../../assets/svg/KL_standard_pos_frei_S_sRGB 1.svg";
import ceskaPostaIcon from "../../../../../assets/svg/cp-sponzoring-sirka-rgb 1.svg";
import styles from "./Partners.module.css"

export const Partners=()=>{
    return(
        <section className={styles["our-partners-section"]}>
        <h2 className={`${styles.header} h2-common`}>Our partners</h2>
        <ul className={styles["our-partners-container"]}>
          <li className={styles["our-partners-subcontainer"]}>
            <img src={kofolaIcon} alt="Logo" />
          </li>
          <li className={styles["our-partners-subcontainer"]}>
            <img src={lidlIcon} alt="Logo" />
          </li>
          <li className={styles["our-partners-subcontainer"]}>
            <img src={kauflandIcon} alt="Logo" />
          </li>
          <li className={styles["our-partners-subcontainer"]}>
            <img src={ceskaPostaIcon} alt="Logo" />
          </li>
        </ul>
      </section>
    )
}