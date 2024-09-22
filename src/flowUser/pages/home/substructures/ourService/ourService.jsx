import commentsIcon from "../../../../../assets/svg/comments.svg";
import targetIcon from "../../../../../assets/svg/target.svg";
import teamSupportIcon from "../../../../../assets/svg/team_support.svg";
import studyIcon from "../../../../../assets/svg/study.svg";
import bagIcon from "../../../../../assets/svg/bag.svg";
import phonemanIcon from "../../../../../assets/svg/phoneman.svg";
import styles from "./ourService.module.css"

export const OurService=()=>{
    return(
        <section className={styles["our-service-section"]}>
        <h2 className={`${styles.header} h2-common`}>Our services</h2>
        <ul className={styles["our-service-container"]}>
          <li className={styles["our-service-subcontainer"]}>
            <div className={styles["our-service-subheader"]}>
              <div className={styles["our-service-subheader-icon"]}>
                <img src={commentsIcon} alt="icon" />
              </div>
              <div className={styles["our-service-subheader-text"]}>
                <h4>Consultations on employment</h4>
              </div>
            </div>
            <div className={styles["our-service-subcontainer-text"]}>
              Our experts will help you to develop employment search strategy,
              to prepare CV, to prepare for the interview and to get over
              language barrier.
            </div>
          </li>

          <li className={styles["our-service-subcontainer"]}>
            <div className={styles["our-service-subheader"]}>
              <div className={styles["our-service-subheader-icon"]}>
                <img src={targetIcon} alt="icon" />
              </div>
              <div className={styles["our-service-subheader-text"]}>
                <h4>Matching vacancy to client profile</h4>
              </div>
            </div>
            <div className={styles["our-service-subcontainer-text"]}>
              We personally match the best vacancy in accordance with your
              experience, skills and requirements.
            </div>
          </li>

          <li className={styles["our-service-subcontainer"]}>
            <div className={styles["our-service-subheader"]}>
              <div className={styles["our-service-subheader-icon"]}>
                <img src={teamSupportIcon} alt="icon" />
              </div>
              <div className={styles["our-service-subheader-text"]}>
                <h4>Paperwork assistance</h4>
              </div>
            </div>
            <div className={styles["our-service-subcontainer-text"]}>
              Our agency will handle all the process of getting working visa,
              including applying for the visa and all necessary consultations
              with our legal department.
            </div>
          </li>

          <li className={styles["our-service-subcontainer"]}>
            <div className={styles["our-service-subheader"]}>
              <div className={styles["our-service-subheader-icon"]}>
                <img src={studyIcon} alt="icon" />
              </div>
              <div className={styles["our-service-subheader-text"]}>
                <h4>Interview Course</h4>
              </div>
            </div>
            <div className={styles["our-service-subcontainer-text"]}>
              We provide intensive training and interview simulations to help
              you perform confidently in front of employers and interview
              successfully.
            </div>
          </li>

          <li className={styles["our-service-subcontainer"]}>
            <div className={styles["our-service-subheader"]}>
              <div className={styles["our-service-subheader-icon"]}>
                <img src={bagIcon} alt="icon" />
              </div>
              <div className={styles["our-service-subheader-text"]}>
                <h4>Employment process</h4>
              </div>
            </div>
            <div className={styles["our-service-subcontainer-text"]}>
              Our agency specializes in overseas employment and offers a wide
              range of vacancies in various countries around the world.
            </div>
          </li>

          <li className={styles["our-service-subcontainer"]}>
            <div className={styles["our-service-subheader"]}>
              <div className={styles["our-service-subheader-icon"]}>
                <img src={phonemanIcon} alt="icon" />
              </div>
              <div className={styles["our-service-subheader-text"]}>
                <h4>SUpport on all employment stages</h4>
              </div>
            </div>
            <div className={styles["our-service-subcontainer-text"]}>
              We provide full support at all stages of employment, from job
              search to successful conclusion of the employment contract and
              adaptation to the new place of work.
            </div>
          </li>
        </ul>
      </section>
    )
}