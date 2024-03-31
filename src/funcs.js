export function stringToDateDMY(string_date) {
  const date = new Date(string_date)
  return date.getDate() +"-"+ date.getMonth() +"-" + date.getFullYear()
}

export function identifyWorkingHours(hours_from, hours_to) {
  if (hours_from == null) {
    hours_from = ''
  }
  if (hours_to == null) {
    hours_to = ''
  };
  return hours_from.slice(0,5) + " - " + hours_to.slice(0,5)
}