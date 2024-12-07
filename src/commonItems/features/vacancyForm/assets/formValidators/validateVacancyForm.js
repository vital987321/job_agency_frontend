import { validateWorkingHours } from "./validateWorkingHours";

/**
 * @typedef {object} Props
 * @property {boolean} validation
 * @property {Object} validationErrors
 * @param {Props} data 
 * @returns {object}
 */

export const validateVacancyForm = (data) => {
    let validation = true;
    const validationErrors = {};
    if (data.name === "") {
      validationErrors.name = "Vacancy name cannot be empty";
      validation = false;
    }
    if (data.salary && isNaN(data.salary)) {
      validationErrors.salary = "Salary must be a number";
      validation = false;
    }
    if (data.salary && !isNaN(data.salary) && data.salary < 0) {
      validationErrors.salary = "Salary cannot be negative";
      validation = false;
    }

    if (data.location && !data.location.match(/.*[a-zA-Z].*/)) {
      validationErrors.location = "Location not valid";
      validation = false;
    }

    const hoursFromValidation = validateWorkingHours(data.hours_from);

    if (!hoursFromValidation.validation) {
      validationErrors.hours_from = hoursFromValidation.errorMessage;
      validation = false;
    }

    const hoursToValidation = validateWorkingHours(data.hours_to);
    if (!hoursToValidation.validation) {
      validationErrors.hours_to = hoursToValidation.errorMessage;
      validation = false;
    }

    return ({
      validation,
      validationErrors
    })
  };