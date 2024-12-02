import React, { useEffect, useState, useRef } from "react";
import { CONTRACT_TYPE,
  GENDER_LIST,
  RESIDENCE_TYPES,
  LIST_VACANCIES_BASE_URL
} from "../../../data/constants";
import closeIcon from "../../../assets/svg/X.svg";
import api from "../../../services/api/api";
import "./AdminVacancyForm.css";
import { ButtonType1 } from "../../components/buttons/buttonType1/ButtonType1";
import toast from "react-hot-toast";
import { fetchSectorsList } from "./assets/fetchSectorsList";
import { fetchPartnersList } from "./assets/fetchPartnersList";
import { validateVacancyForm } from "./assets/formValidators/validateVacancyForm";
import { workingHoursToRequestFormat } from "./assets/workingHoursToRequestFormat";
import { getVacancySectorsList } from "./assets/getVacancySectorsList";

/**
 * @typedef {object} Props
 * @property {boolean} [newVacancy]
 * @property {object} [vacancyData]
 * @property {function} [setVacancyData]
 * @property {string} vacancyFormDisplayValue  "block" or "none"
 * @property {function} setVacancyFormDisplayValue
 * @property {function} setVacancyListChangedState
 * @param {Props} props 
 * @returns {JSX.Element}
 */

export const AdminVacancyForm = ({
  newVacancy,
  vacancyData,
  setVacancyData,
  vacancyFormDisplayValue,
  setVacancyFormDisplayValue,
  setVacancyListChangedState
}) => {

  //* States
  const [sectorFullList, setSectorFullList] = useState([]);
  const [partnersList, setPartnersList] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [vacancyCurrentValues, setVacancyCurrentValues] = useState({
    sectors: [],
    residence_type: "1",
    gender: GENDER_LIST[0],
    contract_type: CONTRACT_TYPE[0],
    visa_assistance: "",
  });

  //* Refs
  const vacancyNameRef = useRef();
  const locationRef = useRef();
  const salaryRef = useRef();
  const hoursFromRef = useRef();
  const minutesFromRef = useRef();
  const hoursToRef = useRef();
  const minutesToRef = useRef();
  const descriptionRef = useRef();
  const requirementsRef = useRef();

  //* useEffects
  useEffect(() => {
    const getSectors=async ()=>{
      await fetchSectorsList()
      .then((res)=>setSectorFullList(res))
    }
    getSectors()

    const getPartners=async ()=>{
      await fetchPartnersList()
      .then((res)=>setPartnersList(res))
    }
    getPartners()
  }, []);

  useEffect(() => {
    if (!newVacancy) {
      // editing existing vacancy
      try {
        setVacancyCurrentValues({
          sectors: getVacancySectorsList(vacancyData, sectorFullList),
          residence_type: vacancyData.residence_type,
          gender: vacancyData.gender,
          contract_type: vacancyData.contract_type,
          visa_assistance: vacancyData.visa_assistance
            ? vacancyData.visa_assistance
            : "",
          partner: vacancyData.partner_data.id,
        });
      } catch {}
    }
  }, [sectorFullList]);

  //* Functions

  const changeSectorsHandler = (e) => {
    const changedSectorList = [];
    for (const item of e.target.selectedOptions) {
      changedSectorList.push(item.value);
    }
    setVacancyCurrentValues({
      ...vacancyCurrentValues,
      sectors: changedSectorList,
    });
  };

  const changeSelectHandler = (e) => {
    setVacancyCurrentValues({
      ...vacancyCurrentValues,
      [e.target.dataset.selectkey]: e.target.value,
    });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const requestData = {
      name: vacancyNameRef.current.value,
      partner: vacancyCurrentValues.partner,
      salary: salaryRef.current.value,
      location: locationRef.current.value,
      contract_type: vacancyCurrentValues.contract_type,
      hours_from: workingHoursToRequestFormat(
        hoursFromRef.current.value,
        minutesFromRef.current.value
      ),
      hours_to: workingHoursToRequestFormat(
        hoursToRef.current.value,
        minutesToRef.current.value
      ),
      gender: vacancyCurrentValues.gender,
      description: descriptionRef.current.value,
      requirements: requirementsRef.current.value,
      residence_type: vacancyCurrentValues.residence_type,
      visa_assistance: vacancyCurrentValues.visa_assistance,
      sector: vacancyCurrentValues.sectors,
    };

    const sendPatchRequest = async () => {
      const requestUrl = LIST_VACANCIES_BASE_URL + vacancyData.id + "/";
      try {
        const response = await api
          .patch(requestUrl, requestData)
          .then((response) => setVacancyData(response.data))
          // .then((res)=>console.log('i am here'))
          .then((result) => setVacancyFormDisplayValue("none"))
          .then((res)=>toast.success('Updated'))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };

    const sendPostRequest = async () => {
      const requestUrl = LIST_VACANCIES_BASE_URL;
      try {
        const response = await api
          .post(requestUrl, requestData)
          .then((result) => setVacancyListChangedState({}))
          .then((result) => setVacancyFormDisplayValue("none"))
          .then((res) => toast.success("Vacancy created"))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };

    const formValidation=validateVacancyForm(requestData)
    setValidationErrors(formValidation.validationErrors)
    if (formValidation.validation){
      if (newVacancy) sendPostRequest();
      else sendPatchRequest();
    }
  };

  const cancelButtonHandler = (e) => {
    e.preventDefault();
    setVacancyFormDisplayValue("none");
  };

  //* Main Body
  return (
    <div
      className="admin-vacancy-form-modal-window-enviroment"
      style={{ display: vacancyFormDisplayValue }}
    >
      <form className="admin-vacancy-form" role='form' onSubmit={submitFormHandler}>
        <div className="admin-vacancy-form-close-button-container">
          <button
            onClick={cancelButtonHandler}
            title='Close'
            className="admin-vacancy-form-close-button"
          >
            <img src={closeIcon} alt="" />
          </button>
        </div>
        <div className="admin-vacancy-form-main-container">
          <div className="admin-vacancy-form-header-container">
            <div className="admin-vacancy-form-name-container">
              <label htmlFor="admin-edit-vacancy-name-input">
                Vacancy name
              </label>
              <input
                className="admin-vacancy-name-input admin-vacancy-form-input"
                type="text"
                aria-label="vacancy name"
                defaultValue={vacancyData.name}
                ref={vacancyNameRef}
              />
            </div>
            <div className="admin-form-validation-message">
              {validationErrors.name}
            </div>

            <div className="admin-vacancy-form-company-container">
              <label htmlFor="form-vacancy-conpany-input">Company</label>
              <select
                className="admin-vacancy-form-input"
                aria-label='company'
                id="form-vacancy-company-select"
                value={vacancyCurrentValues.partner}
                data-selectkey="partner"
                onChange={changeSelectHandler}
              >
                <option value=""></option>
                {partnersList.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.company}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="admin-form-vacancy-items-container">
            <div>
              <div className="admin-form-vacancy-items">
                <label htmlFor="form-vacancy-salary-input">Salary</label>
                <input
                  className="admin-vacancy-form-input"
                  id="form-vacancy-salary-input"
                  type="text"
                  defaultValue={vacancyData.salary}
                  ref={salaryRef}
                />
              </div>
              <div className="admin-form-validation-message">
                {validationErrors.salary}
              </div>
            </div>

            <div>
              <div className="admin-form-vacancy-items">
                <label htmlFor="form-vacancy-location-input">Location</label>
                <input
                  className="admin-vacancy-form-input"
                  id="form-vacancy-location-input"
                  type="text"
                  defaultValue={vacancyData.location}
                  ref={locationRef}
                />
              </div>
              <div className="admin-form-validation-message">
                {validationErrors.location}
              </div>
            </div>

            <div className="admin-form-vacancy-items">
              <label htmlFor="form-vacancy-contract-type-select">
                Contract type
              </label>
              <select
                className="admin-vacancy-form-input"
                id="form-vacancy-contract-type-select"
                data-selectkey="contract_type"
                value={vacancyCurrentValues.contract_type}
                onChange={changeSelectHandler}
              >
                {CONTRACT_TYPE.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="admin-form-vacancy-items">
              <label htmlFor="form-vacancy-gender-select">Gender</label>
              <select
                className="admin-vacancy-form-input"
                id="form-vacancy-gender-select"
                data-selectkey="gender"
                value={vacancyCurrentValues.gender}
                onChange={changeSelectHandler}
              >
                {GENDER_LIST.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <div className="admin-form-vacancy-items">
                <label htmlFor="form-vacancy-hours-from-input">
                  Work hours from
                </label>
                <div className="form-vacancy-hours-from-container">
                  <div className="form-vacancy-hours-input-block">
                    <input
                      className="admin-vacancy-form-input"
                      id="form-vacancy-hours-from-input"
                      type="text"
                      defaultValue={
                        vacancyData.hours_from
                          ? vacancyData.hours_from.split(":")[0]
                          : ""
                      }
                      // defaultValue={vacancyData.hours_from.getHours()}
                      ref={hoursFromRef}
                    />
                    <p className="admin-vacancy-form-hours-minutes-label">h</p>
                  </div>

                  <div className="form-vacancy-minutes-input-block">
                    <input
                      className="admin-vacancy-form-input"
                      id="form-vacancy-minutes-from-input"
                      type="text"
                      aria-label="minutes from"
                      defaultValue={
                        vacancyData.hours_from
                          ? vacancyData.hours_from.split(":")[1]
                          : ""
                      }
                      ref={minutesFromRef}
                    />
                    <p className="admin-vacancy-form-hours-minutes-label">
                      min
                    </p>
                  </div>
                </div>
              </div>
              <div className="admin-form-validation-message">
                {validationErrors.hours_from}
              </div>
            </div>

            <div>
              <div className="admin-form-vacancy-items">
                <label htmlFor="form-vacancy-hours-to-input">
                  Work hours to
                </label>
                <div className="form-vacancy-hours-from-container">
                  <div className="form-vacancy-hours-input-block">
                    <input
                      className="admin-vacancy-form-input"
                      id="form-vacancy-hours-to-input"
                      type="text"
                      defaultValue={
                        vacancyData.hours_to
                          ? vacancyData.hours_to.split(":")[0]
                          : ""
                      }
                      ref={hoursToRef}
                    />
                    <p className="admin-vacancy-form-hours-minutes-label">h</p>
                  </div>

                  <div className="form-vacancy-minutes-input-block">
                    <input
                      className="admin-vacancy-form-input"
                      id="form-vacancy-minutes-to-input"
                      aria-label="minutes to"
                      type="text"
                      defaultValue={
                        vacancyData.hours_to
                          ? vacancyData.hours_to.split(":")[1]
                          : ""
                      }
                      ref={minutesToRef}
                    />
                    <p className="admin-vacancy-form-hours-minutes-label">
                      min
                    </p>
                  </div>
                </div>
              </div>
              <div className="admin-form-validation-message">
                {validationErrors.hours_to}
              </div>
            </div>

            <div className="admin-form-vacancy-items">
              <label htmlFor="form-vacancy-residence-select">Residence</label>
              <select
                className="admin-vacancy-form-input"
                id="form-vacancy-residence-select"
                data-selectkey="residence_type"
                value={vacancyCurrentValues.residence_type}
                onChange={changeSelectHandler}
              >
                {Object.keys(RESIDENCE_TYPES).map((item_key) => {
                  return (
                    <option key={item_key} value={item_key}>
                      {RESIDENCE_TYPES[item_key]}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="admin-form-vacancy-items">
              <label htmlFor="form-vacancy-visa-assistance-select">
                Visa assistance
              </label>
              <select
                className="admin-vacancy-form-input"
                id="form-vacancy-visa-assistance-select"
                data-selectkey="visa_assistance"
                value={vacancyCurrentValues.visa_assistance}
                onChange={changeSelectHandler}
              >
                <option value={""}>Unknown</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            <div className="admin-form-vacancy-items">
              <label htmlFor="form-vacancy-sector-select">Sector</label>
              <select
                id="form-vacancy-sector-select"
                multiple
                value={vacancyCurrentValues.sectors}
                onChange={changeSectorsHandler}
              >
                {sectorFullList.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="admin-vacancy-form-description-requirements-container">
            <div className="admin-vacancy-form-description-block">
              <label htmlFor="form-vacancy-description">Description</label>
              <textarea
                className="admin-vacancy-form-input"
                id="form-vacancy-description"
                cols="30"
                rows="6"
                defaultValue={vacancyData.description}
                ref={descriptionRef}
              ></textarea>
            </div>
            <div className="admin-vacancy-form-requirements-block">
              <label htmlFor="form-vacancy-requirements">Requirements</label>
              <textarea
                className="admin-vacancy-form-input"
                id="form-vacancy-requirements"
                cols="30"
                rows="6"
                defaultValue={vacancyData.requirements}
                ref={requirementsRef}
              ></textarea>
            </div>
          </div>

          <div className="admin-vacancy-form-submit-container">
            <ButtonType1
              value={newVacancy ? "Create vacancy" : "Save changes"}
              onClickHandler={submitFormHandler}
              strength="1"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
