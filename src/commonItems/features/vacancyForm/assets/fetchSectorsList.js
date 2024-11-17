import api from "../../../../services/api/api";
import { SECTOR_REQUEST_URL } from "../../../../data/constants";

export const fetchSectorsList = async () => {
    const sectors=[]
    try {
      const request = await api
        .get(SECTOR_REQUEST_URL)
        .then((response) => {
            response.data.results.map((item) => {
                sectors.push( {
                  value: item.id,
                  label: item.name,
                });
              })
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    return (sectors)
  };