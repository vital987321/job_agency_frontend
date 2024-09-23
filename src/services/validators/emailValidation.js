export const emailValidation = (email) => {
  let emailObject = {
    isValid: true,
    validationErrors: "",
  };

  if (
    !email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    emailObject.isValid = false;
    emailObject.validationErrors = "Enter correct email address";
  }
  return emailObject;
};
