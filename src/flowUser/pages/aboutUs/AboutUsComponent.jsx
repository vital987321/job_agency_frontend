import icon_proff_experiens_52 from '../../../assets/svg/icon-proff-experiens 52.svg'
import icon_star_person_52 from "../../../assets/svg/icon-star-person  52.svg";
import icon_partners_52 from "../../../assets/svg/icon-partners 52.svg";
import icon_safe_52 from "../../../assets/svg/icon-safe 52.svg";
import icon_support_52 from "../../../assets/svg/icon-support 52.svg";
import smile_icon from "../../../assets/svg/Smile_icon.svg";
import man1 from "../../../assets/img/ourTeam/man1.png";
import man2 from "../../../assets/img/ourTeam/man2.png";
import man3 from "../../../assets/img/ourTeam/man3.png";
import man4 from "../../../assets/img/ourTeam/man4.png";
import "./aboutUs.css"

export const AboutUsComponent=()=>{
    return<>
    <div className='about-us-component-main-container'>
        <section className="about-us-section">
            <h1 className='about-us-header'>
                About us
            </h1>
            <div className="about-us-text-container">
                <div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis iste cupiditate, incidunt obcaecati eos praesentium mollitia veritatis amet dolore voluptate. Non exercitationem accusantium commodi animi nulla dolor dolore inventore harum? Ipsum error asperiores sequi eos, id voluptates ea distinctio, exercitationem perferendis dolores, ducimus laudantium deleniti eveniet laboriosam provident! Eaque totam, ut commodi corrupti sit quisquam repellat unde, velit molestiae eligendi, quis repudiandae sequi! Commodi iste, consequatur provident esse magni tempore voluptas distinctio quae deleniti voluptatibus corrupti natus alias eius laboriosam dolor rem inventore! Iure autem debitis nemo aut esse quaerat quae, blanditiis ad sed earum vitae assumenda quo sunt at.
                </div>
                <div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae amet exercitationem ducimus totam nisi unde, hic vitae blanditiis eveniet cupiditate repudiandae impedit dolorum fugit. Eaque rerum iste quaerat est exercitationem rem, mollitia quas sit modi eos minus sequi fugit quasi id dolore nostrum labore accusamus cupiditate at? Debitis excepturi asperiores accusamus similique quisquam eaque nisi eius ducimus impedit, officia magnam facilis esse commodi. Nam vel architecto, consequatur eligendi earum deserunt ratione quasi dolorem, quis, temporibus quos? Ab ipsum doloribus voluptates!
                </div>
            </div>
        </section>
        
        <section className="why-us-section">
            <h2 className='why-us-header'>
                Why to choose us?
            </h2>
            <p className='why-us-subheader'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vel, unde tenetur hic quaerat quidem veritatis repellat ad consequatur libero voluptates deleniti nisi exercitationem?
            </p>
            <ul className="why-us-cards-container">
                <li className="why-us-card">
                    <div className='why-us-card-header-container'>
                        <img className='why-us-card-header-img' src={icon_proff_experiens_52} alt="logo" />
                        <p className='why-us-card-header-text'>
                            Professionalism and experience
                        </p>
                    </div>
                    <div className='why-us-card-main-text'>
                        Our team consists of experienced professionals with in-depth knowledge of employment and international migration.
                    </div>
                </li>

                <li className="why-us-card">
                    <div className='why-us-card-header-container'>
                        <img className='why-us-card-header-img' src={icon_star_person_52} alt="logo" />
                        <p className='why-us-card-header-text'>
                            Individual approach
                        </p>
                    </div>
                    <div className='why-us-card-main-text'>
                        We value each client and offer customized solutions, taking into account their needs and goals.
                    </div>
                </li>

                <li className="why-us-card">
                    <div className='why-us-card-header-container'>
                        <img className='why-us-card-header-img' src={icon_partners_52} alt="logo" />
                        <p className='why-us-card-header-text'>
                            Wide network of partners
                        </p>
                    </div>
                    <div className='why-us-card-main-text'>
                    We have an extensive network of partners and employer contacts, enabling us to offer a wide range of vacancies.
                    </div>
                </li>

                <li className="why-us-card">
                    <div className='why-us-card-header-container'>
                        <img className='why-us-card-header-img' src={icon_safe_52} alt="logo" />
                        <p className='why-us-card-header-text'>
                            Transparency and trust 
                        </p>
                    </div>
                    <div className='why-us-card-main-text'>
                        We value transparency with our clients and strive to build long-term trusting relationships.
                    </div>
                </li>

                <li className="why-us-card">
                    <div className='why-us-card-header-container'>
                        <img className='why-us-card-header-img' src={icon_support_52} alt="logo" />
                        <p className='why-us-card-header-text'>
                            Support at all stages 
                        </p>
                    </div>
                    <div className='why-us-card-main-text'>
                    We provide full support at all stages of employment, from counseling to adaptation at the new place of work.
                    </div>
                </li>

                <li className="why-us-card">
                    <div className='why-us-card-header-container'>
                        <img className='why-us-card-header-img' src={smile_icon} alt="logo" />
                        <p className='why-us-card-header-text'>
                        Successful customer stories
                        </p>
                    </div>
                    <div className='why-us-card-main-text'>
                    Наши успешные кейсы и благодарные отзывы клиентов подтверждают эффективность нашей работы и качество предоставляемых услуг.
                    </div>
                </li>

            </ul>
        </section>

        <section className='our-team-section'>
            <h2 className='our-team-section-header'>
                Our team
            </h2>

            <ul className='our-team-members-container'>
                <li className='our-team-member-card'>
                    <img className='our-team-member-card-photo' src={man1} alt="pfoto" />
                    <p className='our-team-member-card-name'>Martin Ludek</p>
                    <p className='our-yeam-member-card-position'>CEO</p>
                </li>
                <li className='our-team-member-card'>
                    <img className='our-team-member-card-photo' src={man2} alt="pfoto" />
                    <p className='our-team-member-card-name'>Franra Omacka</p>
                    <p className='our-yeam-member-card-position'>Financial director</p>
                </li>
                <li className='our-team-member-card'>
                    <img className='our-team-member-card-photo' src={man3} alt="pfoto" />
                    <p className='our-team-member-card-name'>Olga May</p>
                    <p className='our-yeam-member-card-position'>HR specialist</p>
                </li>
                <li className='our-team-member-card'>
                    <img className='our-team-member-card-photo' src={man4} alt="pfoto" />
                    <p className='our-team-member-card-name'>Vanesa Victoria</p>
                    <p className='our-yeam-member-card-position'>Manager</p>
                </li>
            </ul>
        </section>
    </div>
    </>
}