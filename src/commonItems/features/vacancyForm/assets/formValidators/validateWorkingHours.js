/**
 * 
 * @param {string} workingHoursString 
 * @returns {object}
 */

export const validateWorkingHours = (workingHoursString) => {
    if (!workingHoursString) {
      return {
        validation: true,
        errorMessage: "",
      };
    }
    const hours = workingHoursString.split(":")[0];
    const minutes = workingHoursString.split(":")[1];

    if (isNaN(hours) || isNaN(minutes)) {
      return {
        validation: false,
        errorMessage: "Values must be numeric",
      };
    }
    if (hours % 1 > 0 || minutes % 1 > 0) {
      return {
        validation: false,
        errorMessage: "Values must be integers",
      };
    }
    if (hours < 0 || hours > 23) {
      return {
        validation: false,
        errorMessage: "Hours range: 0-23",
      };
    }
    if (minutes < 0 || minutes > 59) {
      return {
        validation: false,
        errorMessage: "Minutes range: 0-59",
      };
    }

    return {
      validation: true,
      errorMessage: "",
    };
  };