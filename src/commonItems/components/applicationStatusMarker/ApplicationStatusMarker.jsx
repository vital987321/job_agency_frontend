import styles from "./applicationStatusMarker.module.css"

export const ApplicationStatusMarker = (props) => {
    if (props.status == "Rejected")
      return <span className={styles.statusRejected}>&#11044;</span>;
    if (props.status == "Approved")
      return <span className={styles.statusApproved}>&#11044;</span>;
    return <span className={styles.statusPending}>&#11044;</span>;
  };
  