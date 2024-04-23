import certificate1 from "../../../img/certificate1.png";
import certificate1fullsize from "../../../img/certificate1fullsize.png";
import certificate2fullsize from "../../../img/certificate2fullsize.png";
import certificate3fullsize from "../../../img/certificate3fullsize.png";
import certificate2 from "../../../img/certificate2.png";
import certificate3 from "../../../img/certificate3.png";
import "../../../css/infoComponents/certificates.css";
import { useState } from "react";

const ShowCertificateComponent = (props) => {
  const modelWindowClickHandler = (e) => {
    props.setCertificateModalDisplay("none");
  };
  return (
    <div
      className="certificate-full-size-modal-window"
      style={{ display: props.certificateModalDisplay }}
      onClick={modelWindowClickHandler}
    >
      <div>
        <img
          src={props.currentCertificate}
          alt="certificate"
          
        />
      </div>
    </div>
  );
};

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
            <p>Business lisence</p>
          </li>
          <li className="certificate-container">
            <img
              className="certificate-img"
              src={certificate2}
              onClick={certificateClickHandler}
              data-photo={certificate2fullsize}
              alt="certificate"
            />
            <p>Business registration</p>
          </li>
          <li className="certificate-container">
            <img
              className="certificate-img"
              src={certificate3}
              onClick={certificateClickHandler}
              data-photo={certificate3fullsize}
              alt="certificate"
            />
            <p>Working contract</p>
          </li>
        </ul>
      </section>
      <ShowCertificateComponent
        certificateModalDisplay={certificateModalDisplay}
        setCertificateModalDisplay={setCertificateModalDisplay}
        currentCertificate={currentCertificate}
      />
    </>
  );
};
