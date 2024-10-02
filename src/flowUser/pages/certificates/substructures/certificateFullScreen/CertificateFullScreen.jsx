import styles from "./CertificateFullScreen.module.css"

export const CertificateFullScreen = (props) => {
    //* Props
    const setCertificateModalDisplay=props.setCertificateModalDisplay
    const currentCertificate=props.currentCertificate
    const certificateModalDisplay=props.certificateModalDisplay

    //* Main Body
    const modelWindowClickHandler = (e) => {
      props.setCertificateModalDisplay("none");
    };
    return (
      <div
        className={styles["certificate-full-size-modal-window"]}
        style={{ display: props.certificateModalDisplay }}
        onClick={modelWindowClickHandler}
      >
        <div>
          <img
            className={styles["certificate-full-size-image"]}
            src={props.currentCertificate}
            alt="certificate"
            
          />
        </div>
      </div>
    );
  };