import styles from "./partnersList.module.css";
import api from "../../../../../services/api/api";
import { useState, useEffect } from "react";
import { PARTNERS_REQUEST_URL } from "../../../../../data/constants";
import { Link } from "react-router-dom";
import { ButtonType1 } from "../../../../../environmentCommon/components/buttons/buttonType1/ButtonType1";

export const PartnersList = (props) => {
  // props
  const setListResponseData = props.setListResponseData;
  const updateDataState = props.updateDataState;
  const listReviewsRequestUrl=props.listReviewsRequestUrl

  // States
  const [partnersListData, setPartnersListData] = useState([]);

  // UseEffects
  useEffect(() => {
    const fetchPartnerList = async () => {
      try {
        const request = await api
          .get(listReviewsRequestUrl)
          .then((response) => {
            setPartnersListData(response.data.results);
            return response;
          })
          .then((response) => setListResponseData(response.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPartnerList();
  }, [updateDataState, listReviewsRequestUrl]);

  return (
    <section>
      <table className={styles["list-table"]}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>HR specialist</th>
            <th>Phone</th>
            <th>Details</th>
          </tr>
          {partnersListData.map((partner) => {
            return (
              <tr className={styles.tableRow} key={partner.id} >
                <td>{partner.id}</td>
                <td>{partner.company}</td>
                <td>{partner.hr_name}</td>
                <td>{partner.phone}</td>
                <td>
                  <Link to={"/admin/partners/" + partner.id}>
                    <ButtonType1 value="Details" strength="4" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
