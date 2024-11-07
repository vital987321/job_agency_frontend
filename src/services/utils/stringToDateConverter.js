/**
 * Function accepts string_date parameter and converts it to string if format 28-09-2024
 * @param {string} string_date date in string type that may be converted to Date object
 * @returns {string} date in strung format 28-09-2024
 */

export function stringToDateConverter(string_date) {
  if (string_date) {
    const date = new Date(string_date)
    return date.getDate() +"-"+ (date.getMonth()+1) +"-" + date.getFullYear()
  }
  else return ""
  }