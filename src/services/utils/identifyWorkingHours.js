/**
 * 
 * @param {string} hours_from Time in string format "08:35" or 08:35:30
 * @param {string} hours_to Time in string format "16:30" or 16:30:00
 * @returns {string} Time range in format "08:35 - 16:30"
 */

export function identifyWorkingHours(hours_from, hours_to) {
  if (hours_from == null) {
    hours_from = ''
  }
  if (hours_to == null) {
    hours_to = ''
  };
  return hours_from.slice(0,5) + " - " + hours_to.slice(0,5)
}