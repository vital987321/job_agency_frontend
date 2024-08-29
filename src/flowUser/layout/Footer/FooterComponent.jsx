import agencyLogoIcon from '../../../assets/svg/agency_logo_yellow.svg'
import './footer.css'

export const FooterComponent = () => {
    return <footer>
        <div className='footer-sections-container'>
            <section className='footer-section'>
                <div className='footer-comany-container'>
                    <img className='footer-logo-img' src={agencyLogoIcon} alt="Logo" />
                    <p className='footer-company-name'>BEE Rercuitment</p>
                </div>
                <div className='footer-devise-text'>
                    <small >
                        Bringing Talent to You, One Bee at a Time
                    </small>
                </div>
            </section>

            <section className='footer-section'>
                <h4 className='footer-header'>FOR PARTNERS</h4>
                <ul>
                    <li><a className="navLinks footer-link" href="">New registration</a></li>
                    <li><a className="navLinks footer-link" href="">Our conditions</a></li>
                    <li><a className="navLinks footer-link" href="">Career</a></li>
                    <li><a className="navLinks footer-link" href="">Cooperation agreements</a></li>
                    <li><a className="navLinks footer-link" href="">Time sheet</a></li>
                </ul>
            </section>

            <section className='footer-section'>
                <h4 className='footer-header'>FOR COOPERATION</h4>
                <ul>
                    <li><a className="navLinks footer-link" href="">New registration</a></li>
                    <li><a className="navLinks footer-link" href="">Our conditions</a></li>
                    <li><a className="navLinks footer-link" href="">Career</a></li>
                    <li><a className="navLinks footer-link" href="">Cooperation agreements</a></li>
                    <li><a className="navLinks footer-link" href="">Time sheet</a></li>
                </ul>
            </section>

            <section className='footer-section'>
                <h4 className='footer-header'>ABOUT US</h4>
                <ul>
                    <li><a className="navLinks footer-link" href="">Who we are</a></li>
                    <li><a className="navLinks footer-link" href="">GDPR</a></li>
                    <li><a className="navLinks footer-link" href="">General conditions</a></li>
                    <li><a className="navLinks footer-link" href="">Links</a></li>
                    <li><a className="navLinks footer-link" href="">GDPR</a></li>
                </ul>
            </section>
        </div>
        <p className='footer-year'>2024</p>
    </footer>
};
