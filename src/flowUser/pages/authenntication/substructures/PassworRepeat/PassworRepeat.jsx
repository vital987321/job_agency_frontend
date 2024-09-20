import styles from "../../authentication.module.css"

export const PasswordRepeatComponent = (props) => {
    //* Props
    const authenticationAction=props.authenticationAction
    const confirmPasswordRef=props.confirmPasswordRef
    const validationErrors=props.validationErrors

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
        <div className={`${styles["password-repeat-space-holder"]} ${styles["authentication-text-input"]}`}></div>
        <div className={styles["authentication-form-error-message"]}></div>
      </>
    );
  };