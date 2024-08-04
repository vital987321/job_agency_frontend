export function stringToDateConverter(string_date) {
    const date = new Date(string_date)
    return date.getDate() +"-"+ date.getMonth() +"-" + date.getFullYear()
  }