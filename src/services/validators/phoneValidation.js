/**
 * @typedef {object} PhoneValidation
 * @property {boolean} phoneIsValid
 * @property {string} validatedPhone
 * @property {string} phoneValidationErrors
 */

/**
 * Validates phone number. Returns an object with validated phone. 
 * @param {string} phone 
 * @returns {PhoneValidation}
 */

export const phoneValidation = (phone) => {

  let phoneObject = {
    phoneIsValid: true,
    validatedPhone: "",
    phoneValidationErrors: "",
  };

  if (!phone){
    phoneObject.phoneIsValid = false;
    phoneObject.phoneValidationErrors = "phone is missing"
    return phoneObject
  }

  for (let symbol of phone) {
    if (symbol.toLowerCase() != symbol.toUpperCase()) {
      phoneObject.phoneIsValid = false;
      phoneObject.phoneValidationErrors = "Letters are not allowed";
      return phoneObject;
    }
  }

  let tempPhone = "";
  for (let symbol of phone) {
    if ("+0123456789".includes(symbol)) tempPhone += symbol;
  }

  phoneObject.validatedPhone = tempPhone.slice(0, 1).toString(); // "+" is allowed at the beginning

  for (let symbol of tempPhone.slice(1)) {
    if ("0123456789".includes(symbol)) {
      phoneObject.validatedPhone += symbol;
    }
  }

  if (phoneObject.validatedPhone.length > 25) {
    phoneObject.phoneValidationErrors = "Too long number";
    phoneObject.phoneIsValid = false;
  }
  return phoneObject;
};
