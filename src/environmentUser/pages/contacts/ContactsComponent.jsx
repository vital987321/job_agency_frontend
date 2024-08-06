import locationIcon from "../../../assets/svg/locationIcon.svg";
import callIcon from "../../../assets/svg/call_icon.svg";
import emailIcon from "../../../assets/svg/email_icon.svg";
import timeIcon from "../../../assets/svg/time_icon.svg";
import '../../../css/infoComponents/contacts.css'

export const ContactsComponent = () => {
  return (
      <section className="contacts-component-body">
        <h1 className="contacts-components-header">Have questions?</h1>
        <p className="contacts-components-subheader">Do not hasitate to contact us</p>
        <div className="contacts-and-map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.16744312276!2d14.429246076111934!3d50.0831518137427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94f37cad653b%3A0x5e154eabf13c2e40!2sStep%20IT%20Academy!5e0!3m2!1scs!2scz!4v1713987102014!5m2!1scs!2scz"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="contacts-container">
            <div className="contacts-single-item-container">
              <img 
                className="contacts-small-icon"
                src={locationIcon} 
                alt="icon" 
                />
              <p className="contacts-single-item-text">Opletalova 23, Prague, Czech Republic</p>
            </div>
            <div className="contacts-single-item-container">
              <img 
              src={callIcon} 
              alt="icon" 
              className="contacts-small-icon"
              />
              <p className="contacts-single-item-text">+420 722-222-333</p>
            </div>
            <div className="contacts-single-item-container">
              <img className="contacts-small-icon"
               src={emailIcon} 
               alt="icon" 
               />
              <p className="contacts-single-item-text">jobagency@hotline.com</p>
            </div>
            <div className="contacts-single-item-container">
              <img className="contacts-small-icon"
               src={timeIcon} 
               alt="icon" />
              <div className="contacts-single-item-text">
                <p >Working ours:</p>
                <p>Mon-Fri: 9:00 - 17:00</p>
              </div>
            </div>
            <p className="contacts-register-text">
            Firma je zapsána v obchodním rejtříku vedeném u MS v Praze, vložka 67745, oddíl C.
            </p>
               
          </div>

         
        </div>
        <p className="contacts-components-subfooter">Our doors are always open for you</p>
      </section>
  );
};
