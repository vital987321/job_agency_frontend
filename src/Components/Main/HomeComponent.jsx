import commentsIcon from '../../svg/comments.svg'
import targetIcon from '../../svg/target.svg'
import teamSupportIcon from '../../svg/team_support.svg'
import '../../css/home.css'

export const HomeComponent=()=>{
    return <>
        <section className="introductory-container">
            <h2 className="light-text">
                We will find the best employment for you
            </h2>
            <p className="light-text introduction-text">Employment agency of year 2023</p>
        </section>

        <section className="statistics-container">
            <div className="statistics-subcontainer">
                <div className="impressive-text">124</div>
                <div className="statistics-plain-text">Companies in cooperation</div>
            </div>
            <div className="statistics-subcontainer">
                <div className="impressive-text">3850</div>
                <div className="statistics-plain-text">Successful employments</div>
            </div>
            <div className="statistics-subcontainer">
                <div className="impressive-text">5000</div>
                <div className="statistics-plain-text">Vacancies available for our clients</div>
            </div>
            <div className="statistics-subcontainer">
                <div className="impressive-text">84%</div>
                <div className="statistics-plain-text">Of our clients found a job within one week</div>
            </div>
        </section>
        
        <section className="our-service-section">
            <h2>Our services</h2>
            <ul className="our-service-container">
                <li className="our-service-subcontainer">
                    <div className='our-service-subheader'>
                        <div className="our-service-subheader-icon">
                            <img src={commentsIcon} alt="icon" />
                        </div>
                        <div className="our-service-subheader-text">
                            <h4>Consultations on employment</h4>
                        </div>
                    </div>
                    <div className="our-service-subcontainer-text">
                        Our experts will help you to develop employment search strategy, to prepare CV, to prepare for the interview and to get over language barrier.
                    </div>
                </li>

                <li className="our-service-subcontainer">
                    <div className='our-service-subheader'>
                        <div className="our-service-subheader-icon">
                            <img src={targetIcon} alt="icon" />
                        </div>
                        <div className="our-service-subheader-text">
                            <h4>Matching vacancy to client profile</h4>
                        </div>
                    </div>
                    <div className="our-service-subcontainer-text">
                        We personally match the best vacancy in accordance with your experience, skills and requirements.
                    </div>
                </li>
                
                <li className="our-service-subcontainer">
                    <div className='our-service-subheader'>
                        <div className="our-service-subheader-icon">
                            <img src={teamSupportIcon} alt="icon" />
                        </div>
                        <div className="our-service-subheader-text">
                            <h4>Paperwork assistance</h4>
                        </div>
                    </div>
                    <div className="our-service-subcontainer-text">
                    Our agency will handle all the process of getting working visa, including applying for the visa and all necessary consultations with our legal department.
                    </div>
                </li>
            </ul>

        </section>

        <section className="vacancies-list-container">

        </section>
    </>
}