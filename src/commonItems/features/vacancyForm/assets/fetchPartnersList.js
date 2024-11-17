import api from "../../../../services/api/api";
import { PARTNERS_REQUEST_URL } from "../../../../data/constants";

export const fetchPartnersList = async () => {
    let partners
    try {
      const request = await api
        .get(PARTNERS_REQUEST_URL)
        .then((response) => partners=response.data.results)
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    return partners
  };