import styles from "../../Authentication.module.css";

export const PasswordRepeat = (props) => {
  //* Props
  const authenticationAction = props.authenticationAction;
  const confirmPasswordRef = props.confirmPasswordRef;
  const validationErrors = props.validationErrors;

  //* Main Body

  if (authenticationAction == "signup") {
    return (
      <>
        <input
          className={styles["authentication-text-input"]}
          id="authentication-confirm-password-input"
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
        />
        <div className={styles["authentication-form-error-message"]}>
          {validationErrors.confirmPassword}
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className={`${styles["password-repeat-space-holder"]} ${styles["authentication-text-input"]}`}
      ></div>
      <div className={styles["authentication-form-error-message"]}></div>
    </>
  );
};
