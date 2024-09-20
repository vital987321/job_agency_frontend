import certificate1 from "../../../assets/img/certificates/certificate1.png";
import certificate1fullsize from "../../../assets/img/certificates/certificate1fullsize.png";
import certificate2fullsize from "../../../assets/img/certificates/certificate2fullsize.png";
import certificate3fullsize from "../../../assets/img/certificates/certificate3fullsize.png";
import certificate2 from "../../../assets/img/certificates/certificate2.png";
import certificate3 from "../../../assets/img/certificates/certificate3.png";
import "./certificates.css";
import { useState } from "react";
import { CertificateFullScreenComponent } from "./substructures/certificateFullScreen/certificateFullScreen";


export const CertificatesComponent = () => {
  const [certificateModalDisplay, setCertificateModalDisplay] =
    useState("none");
  const [currentCertificate, setCurrentCertificate] = useState();

  const certificateClickHandler = (e) => {
    // console.log(e.target.dataset.photo)
    setCurrentCertificate(e.target.dataset.photo);
    setCertificateModalDisplay("flex");
  };

  return (
    <>
      <section className="certificates-section">
        <h1 className="certificate-section-header">Certificates</h1>
        <ul className="certificates-list">
          <li className="certificate-container">
            <img
              className="certificate-img"
              src={certificate1}
              onClick={certificateClickHandler}
              data-photo={certificate1fullsize}
              alt="certificate"
            />
            <p className="certificate-description">Business lisence</p>
          </li>
          <li className="certificate-container">
            <img
              className="certificate-img"
              src={certificate2}
              onClick={certificateClickHandler}
              data-photo={certificate2fullsize}
              alt="certificate"
            />
            <p className="certificate-description">Business registration</p>
          </li>
          <li className="certificate-container">
            <img
              className="certificate-img"
              src={certificate3}
              onClick={certificateClickHandler}
              data-photo={certificate3fullsize}
              alt="certificate"
            />
            <p className="certificate-description">Working contract</p>
          </li>
        </ul>
      </section>
      <CertificateFullScreenComponent
        certificateModalDisplay={certificateModalDisplay}
        setCertificateModalDisplay={setCertificateModalDisplay}
        currentCertificate={currentCertificate}
      />
    </>
  );
};
