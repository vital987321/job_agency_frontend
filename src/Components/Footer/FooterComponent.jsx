import agencyLogoIcon from '../../svg/agency_logo.svg'
import '../../css/footer.css'

export const FooterComponent = () => {
    return <footer>
        <div className='footer-sections-container'>
            <section className='footer-section'>
                <div>
                    <img src={agencyLogoIcon} alt="Logo" />
                    <p>CONTROL agency</p>
                </div>
                <div className='footer-section1-legal'>
                    <small>Firma je zapsána v obchodním rejtříku vedeném u MS v Praze, vložka 67745, oddíl C.</small>
                </div>
            </section>

            <section className='footer-section'>
                <h4>FOR PARTNERS</h4>
                <ul>
                    <li><a  className="navLinks" href="">New registration</a></li>
                    <li><a className="navLinks" href="">Our conditions</a></li>
                    <li><a className="navLinks" href="">Career</a></li>
                    <li><a className="navLinks" href="">Cooperation agreements</a></li>
                    <li><a className="navLinks" href="">Time sheet</a></li>
                </ul>
            </section>

            <section className='footer-section'>
                <h4>FOR COOPERATION</h4>
                <ul>
                    <li><a className="navLinks" href="">New registration</a></li>
                    <li><a className="navLinks" href="">Our conditions</a></li>
                    <li><a className="navLinks" href="">Career</a></li>
                    <li><a className="navLinks" href="">Cooperation agreements</a></li>
                    <li><a className="navLinks" href="">Time sheet</a></li>
                </ul>
            </section>

            <section className='footer-section'>
                <h4>ABOUT US</h4>
                <ul>
                    <li><a className="navLinks" href="">Who we are</a></li>
                    <li><a className="navLinks" href="">GDPR</a></li>
                    <li><a className="navLinks" href="">General conditions</a></li>
                    <li><a className="navLinks" href="">Links</a></li>
                    <li><a className="navLinks" href="">GDPR</a></li>
                </ul>
            </section>
        </div>
        <p className='footer-year'>2024</p>
    </footer>
};
