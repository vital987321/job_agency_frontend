import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/buttonType1";
import { LIST_APPLICATIONS_BASE_URL } from "../../../../../data/constants";
import api from "../../../../../services/api/api";
import { useParams } from "react-router-dom";
import styles from "./applicationControls.module.css"

export const ApplicationControls = (props) => {
    //* Props
    const setApplication = props.setApplication;

  //* Hooks
  const { application_id } = useParams();

  //* Functions
  const changeApplicationStatusRequest = (e) => {
    const url = LIST_APPLICATIONS_BASE_URL + application_id + "/";

    try {
      api
        .patch(url, { status: e.target.dataset.buttondataset })
        .then((response) => setApplication(response.data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  //* Main Body
  return (
      <div className={styles["admin-application-status-buttons-container"]}>
      <ButtonType1
              value="Approve"
              onClickHandler={changeApplicationStatusRequest}
              strength="1"
              buttonDatasetValue="Approved"
              buttonClass={styles["admin-application-status-button"]}
      />
      <ButtonType1
              value="Reject"
              onClickHandler={changeApplicationStatusRequest}
              strength="1"
              buttonDatasetValue="Rejected"
              buttonClass={styles["admin-application-status-button"]}
      />
      <ButtonType1
              value="Pending"
              onClickHandler={changeApplicationStatusRequest}
              strength="1"
              buttonDatasetValue="Pending"
              buttonClass={styles["admin-application-status-button"]}
      />
    </div>
  );
}