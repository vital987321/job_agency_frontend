export const getVacancySectorsList = (vacancyData, sectorFullList) => {
    return vacancyData.sector.map((sectorID) => {
      for (const item of sectorFullList) {
        if (item.value == sectorID) {
          return item.value;
        }
      }
    });
  };