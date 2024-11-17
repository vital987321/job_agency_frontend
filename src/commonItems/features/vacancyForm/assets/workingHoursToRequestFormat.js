export const workingHoursToRequestFormat = (hours, minutes) => {
    if (!hours) return null;
    return `${hours}:${minutes ? minutes : "00"}`;
  };