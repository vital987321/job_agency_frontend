import styles from "./ApplicationStatusMarker.module.css";
/**
 * @typedef {object} Props
 * @property {string} status 
 * 
 * @param {Props} props 
 * @returns {JSX.Element}
 */

export const ApplicationStatusMarker = ({status}) => {
  //* Props
  //      status

  //* Main body
  if (status == "Rejected")
    return <span className={styles.statusRejected} data-testid="status-element">&#11044;</span>;
  if (status == "Approved")
    return (
      <span className={styles.statusApproved} data-testid="status-element">
        &#11044;
      </span>
    );
  return (
    <span className={styles.statusPending} data-testid="status-element">
      &#11044;
    </span>
  );
};
