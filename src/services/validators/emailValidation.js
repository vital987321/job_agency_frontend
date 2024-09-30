/**
 * @typedef {Object} EmailObject
 * @property {boolean} isValid True if provided email address is considered valid. Otherwise False.
 * @property {string} validationErrors Errors description
 */

/**
 * Validates email address
 * @param {string} email 
 * @returns {EmailObject}
 */

export const emailValidation = (email) => {
  let emailObject = {
    isValid: true,
    validationErrors: "",
  };

  if (
    !email
      ?.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    emailObject.isValid = false;
    emailObject.validationErrors = "Enter correct email address";
  }
  return emailObject;
};
