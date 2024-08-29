import styles from "./partners.module.css";
import { PartnersList } from "./context/partnersList/partnersList";
import { useState, useEffect } from "react";
import { ButtonType1 } from "../../../environmentCommon/components/buttons/buttonType1/ButtonType1";
import { PaginationComponent } from "../../../environmentCommon/features/pagination/Pagination";
import {
  ADMIN_LIST_ITEMS_LIMIT_DEFAULT,
  PARTNERS_REQUEST_URL,
} from "../../../data/constants";
import { useNavigate } from "react-router-dom";
import { PartnerForm } from "./context/partnerForm/partnnerForm";
import { PartnerFilter } from "./context/partnerFilter/partnerFIlter";
import { generateRequestQueryString } from "../../../services/utils/generateRequestQueryString";
import { useSearchParams } from "react-router-dom";

export const Partner = () => {
  //* Variables
  const listItemsOnPage = localStorage.getItem("AdminListItemsOnPage")
    ? localStorage.getItem("AdminListItemsOnPage")
    : ADMIN_LIST_ITEMS_LIMIT_DEFAULT;

  //* States
  const [listResponseData, setListResponseData] = useState({});
  const [currentClientUrl, setCurrentClientUrl] = useState(window.location.href);
  const [formDisplayValue, setFormDisplayValue] = useState("none"); // 'block' /'none'
  const [updateDataState, setUpdateDataState] = useState({});
  const [listReviewsRequestUrl, setListReviewsRequestUrl] = useState(
    `${PARTNERS_REQUEST_URL}?limit=${listItemsOnPage}`
  );
  const [editPartnerData, setEditPartnerData] = useState({
    id: "",
    company: "",
    hr_name: "",
    phone: "",
  });

  //* Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (editPartnerData.id) {
      setFormDisplayValue("block");
    }
  }, [editPartnerData]);

  //* UseEffects
  useEffect(() => {
    // This hook is nesessary due to filter
    setCurrentClientUrl(window.location.href);
  }, [window.location.href]);

  useEffect(() => {
    if (currentClientUrl !== window.location.href) {
      const params = new URL(currentClientUrl).searchParams;
      navigate(`/admin/partners?${params.toString()}`);
    }
  }, [currentClientUrl]);

  //* Functions
  const newPartnerButtonHandler = () => {
    setEditPartnerData({ id: "", company: "", hr_name: "", phone: "" });
    setFormDisplayValue("block");
  };

  const generateAdminListRequestURL = () => {
    return (
      PARTNERS_REQUEST_URL +
      "?" +
      generateRequestQueryString(searchParams, listItemsOnPage)
    );
  };

  const updateAdminListRequestURL = () => {
    const updatedURL = generateAdminListRequestURL();
    if (updatedURL !== listReviewsRequestUrl) {
      setListReviewsRequestUrl(updatedURL);
    }
  };

  //* Main Body
  updateAdminListRequestURL();
  return (
    <div className={styles.mainBody}>
      <PartnerFilter />
      <div className={styles["new-partner-button-container"]}>
        <div>Found: {listResponseData.count} </div>
        <ButtonType1
          value="Add partner"
          onClickHandler={newPartnerButtonHandler}
          strength="1"
        />
      </div>
      <h2 className={`h2-common ${styles["main-header"]}`}>Partners</h2>
      <PartnersList
        listReviewsRequestUrl={listReviewsRequestUrl}
        setListResponseData={setListResponseData}
        updateDataState={updateDataState}
        setEditPartnerData={setEditPartnerData}
      />
      <PaginationComponent
        responseData={listResponseData}
        listItemsLimit={listItemsOnPage}
        urlState={currentClientUrl}
        setUrlState={setCurrentClientUrl}
      />
      <PartnerForm
        formDisplayValue={formDisplayValue}
        setFormDisplayValue={setFormDisplayValue}
        setUpdateDataState={setUpdateDataState}
        editPartnerData={editPartnerData}
      />
    </div>
  );
};
