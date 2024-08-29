import styles from "./partnersList.module.css";
import api from "../../../../../services/api/api";
import { useState, useEffect } from "react";
import { PARTNERS_REQUEST_URL } from "../../../../../data/constants";
import { Link } from "react-router-dom";
import { ButtonType1 } from "../../../../../environmentCommon/components/buttons/buttonType1/ButtonType1";

export const PartnersList = (props) => {
  //* Props
  const setListResponseData = props.setListResponseData;
  const updateDataState = props.updateDataState;
  const listReviewsRequestUrl = props.listReviewsRequestUrl;
  const setEditPartnerData = props.setEditPartnerData;

  //* States
  const [partnersListData, setPartnersListData] = useState([]);
  const [updateData, setupdateData] = useState({});

  //* UseEffects
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
  }, [updateDataState, updateData, listReviewsRequestUrl]);

  //* Functions
  const deleteButtonClick = (e) => {
    const partnerId = e.target.dataset.buttondataset;
    const deleteRequest = async () => {
      try {
        const request = await api
          .delete(PARTNERS_REQUEST_URL + partnerId)
          .then((response) => setupdateData({}));
      } catch (error) {
        console.log(error);
      }
    };
    deleteRequest();
  };
  const editButtonClick = (e) => {
    const partner = JSON.parse(e.target.dataset.buttondataset);
    setEditPartnerData(partner);
  };

  //* Main Body
  return (
    <section>
      <table className={styles["list-table"]}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>HR specialist</th>
            <th>Phone</th>
            <th>Tools</th>
          </tr>
          {partnersListData.map((partner) => {
            return (
              <tr className={styles.tableRow} key={partner.id}>
                <td>{partner.id}</td>
                <td>{partner.company}</td>
                <td>{partner.hr_name}</td>
                <td>{partner.phone}</td>
                <td>
                  <ButtonType1
                    value="Edit"
                    strength="4"
                    buttonDatasetValue={JSON.stringify({
                      id: partner.id,
                      company: partner.company,
                      hr_name: partner.hr_name,
                      phone: partner.phone,
                    })}
                    onClickHandler={editButtonClick}
                  />
                  <ButtonType1
                    value="Delete"
                    strength="4"
                    buttonClass={styles.deletebutton}
                    buttonDatasetValue={partner.id}
                    onClickHandler={deleteButtonClick}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
