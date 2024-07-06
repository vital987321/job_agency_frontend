import React, { useEffect, useState } from "react";
import { CONTRACT_TYPE } from "../../../constants";
import { GENDER_LIST } from "../../../constants";
import { SECTOR_REQUEST_URL } from "../../../constants";
import { RESIDENCE_TYPES } from "../../../constants";
import { LIST_VACANCIES_BASE_URL } from "../../../constants";
import { WORKING_HOURS } from "../../../constants";
import closeIcon from "../../../svg/X.svg";
import api from "../../api";
import "../../../css/adminArea/adminVacancyForm.css";

export const AdminVacancyFormComponent = (props) => {
  const [sectorSelectOptions, setSectorSelectOptions] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [vacancyCurrentValues, setVacancyCurrentValues] = useState({
    sectors: [],
    residence_type: "1",
    gender: GENDER_LIST[0],
    contract_type: CONTRACT_TYPE[0],
    visa_assistance: "",
  });

  const vacancyNameRef = React.createRef();
  const companyRef = React.createRef();
  const locationRef = React.createRef();
  const salaryRef = React.createRef();
  const hoursFromRef = React.createRef();
  const minutesFromRef = React.createRef();
  const hoursToRef = React.createRef();
  const minutesToRef = React.createRef();
  const descriptionRef = React.createRef();
  const requirementsRef = React.createRef();

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await api
          .get(SECTOR_REQUEST_URL)
          .then((response) => {
            setSectorSelectOptions(
              response.data.results.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSectors();
  }, []);

  useEffect(() => {
    if (!props.newVacancy) {
      // changing existing vacancy
      try {
        setVacancyCurrentValues({
          sectors: sectorDbItems(),
          residence_type: props.vacancyData.residence_type,
          gender: props.vacancyData.gender,
          contract_type: props.vacancyData.contract_type,
          visa_assistance: props.vacancyData.visa_assistance
            ? props.vacancyData.visa_assistance
            : "",
        });
      } catch {}
    }
  }, [sectorSelectOptions]);

  const sectorDbItems = () => {
    return props.vacancyData.sector.map((sectorID) => {
      for (const item of sectorSelectOptions) {
        if (item.value == sectorID) {
          return item.value;
        }
      }
    });
  };

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

  const changeResidenceTypeHandler = (e) => {
    setVacancyCurrentValues({
      ...vacancyCurrentValues,
      residence_type: e.target.value,
    });
  };

  const changeGenderHandler = (e) => {
    setVacancyCurrentValues({
      ...vacancyCurrentValues,
      gender: e.target.value,
    });
  };

  const changeContractTypeHandler = (e) => {
    setVacancyCurrentValues({
      ...vacancyCurrentValues,
      contract_type: e.target.value,
    });
  };

  const changeVisaAssistanceHandler = (e) => {
    setVacancyCurrentValues({
      ...vacancyCurrentValues,
      visa_assistance: e.target.value,
    });
  };

  const formValidation = (data) => {
    let validation = true;
    const newValidationErrors = {};
    if (data.name === "") {
      newValidationErrors.name = "Vacancy name cannot be empty";
      validation = false;
    }
    if (data.salary && isNaN(data.salary)) {
      newValidationErrors.salary = "Salary must be a number";
      validation = false;
    }
    if (data.salary && !isNaN(data.salary) && data.salary < 0) {
      newValidationErrors.salary = "Sallary cannot be negative";
      validation = false;
    }

    if (data.location && !data.location.match(/.*[a-zA-Z].*/)) {
      newValidationErrors.location = "Not valid location";
      validation = false;
    }

    const hoursFromValidation = validateWorkingHours(data.hours_from);

    if (!hoursFromValidation.validation) {
      newValidationErrors.hours_from = hoursFromValidation.errorMessage;
      validation = false;
    }

    const hoursToValidation = validateWorkingHours(data.hours_to);
    if (!hoursToValidation.validation) {
      newValidationErrors.hours_to = hoursToValidation.errorMessage;
      validation = false;
    }

    setValidationErrors(newValidationErrors);
    return validation;
  };

  const validateWorkingHours = (workingHoursString) => {
    if (!workingHoursString) {
      return {
        validation: true,
        errorMessage: "",
      };
    }
    const hours = workingHoursString.split(":")[0];
    const minutes = workingHoursString.split(":")[1];
 
    if (isNaN(hours) || isNaN(minutes)) {
      return {
        validation: false,
        errorMessage: "Values must be numeric",
      };
    }
    if (hours % 1 > 0 || minutes % 1 > 0) {
      return {
        validation: false,
        errorMessage: "Values must integers",
      };
    }
    if (hours < 0 || hours > 23) {
      return {
        validation: false,
        errorMessage: "Hours range: 0-23",
      };
    }
    if (minutes < 0 || minutes > 59) {
      return {
        validation: false,
        errorMessage: "Minutes range: 0-59",
      };
    }

    return {
      validation: true,
      errorMessage: "",
    };

  };

  const workingHoursToRequestFormst = (hours, minutes) => {
    if (!hours) return null;
    return `${hours}:${minutes ? minutes : "00"}`;
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const requestData = {
      name: vacancyNameRef.current.value,
      company: companyRef.current.value,
      salary: salaryRef.current.value,
      location: locationRef.current.value,
      contract_type: vacancyCurrentValues.contract_type,
      hours_from: workingHoursToRequestFormst(
        hoursFromRef.current.value,
        minutesFromRef.current.value
      ),
      hours_to: workingHoursToRequestFormst(
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

    // const headers = { headers: { "Content-Type": "multipart/form-data" } };

    const sendPatchRequest = async () => {
      const requestUrl = LIST_VACANCIES_BASE_URL + props.vacancyData.id + "/";
      try {
        const response = await api
          .patch(requestUrl, requestData)
          .then((response) => props.setVacancyData(response.data))
          .then((result) => props.setVacancyFormDisplayValue("none"))
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
          .then((result) => props.setVacancyListChangedState({}))
          .then((result) => props.setVacancyFormDisplayValue("none"))
          .then((result) => console.log("Vacancy created"))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };

    if (formValidation(requestData)) {
      if (props.newVacancy) sendPostRequest();
      else sendPatchRequest();
    }

    // props.setVacancyFormDisplayValue("none");
  };

  const cancelButtonHandler = (e) => {
    e.preventDefault(); //form to be submited without e.preventDefault()
    props.setVacancyFormDisplayValue("none");
  };

  return (
    <div
      className="admin-vacancy-form-modal-window-enviroment"
      style={{ display: props.vacancyFormDisplayValue }}
    >
      <form className="admin-vacancy-form" onSubmit={submitFormHandler}>
        <div className="admin-vacancy-form-close-button-container">
          <button
            onClick={cancelButtonHandler}
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
                defaultValue={props.vacancyData.name}
                ref={vacancyNameRef}
              />
            </div>
            <div className="admin-form-validation-message">
              {validationErrors.name}
            </div>

            <div className="admin-vacancy-form-company-container">
              <label htmlFor="form-vacancy-conpany-input">Company</label>
              <input
                className="admin-vacancy-form-input"
                id="form-vacancy-company-input"
                type="text"
                defaultValue={props.vacancyData.company}
                ref={companyRef}
              />
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
                  defaultValue={props.vacancyData.salary}
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
                  defaultValue={props.vacancyData.location}
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
                value={vacancyCurrentValues.contract_type}
                onChange={changeContractTypeHandler}
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
                value={vacancyCurrentValues.gender}
                onChange={changeGenderHandler}
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
                        props.vacancyData.hours_from
                          ? props.vacancyData.hours_from.split(":")[0]
                          : ""
                      }
                      // defaultValue={props.vacancyData.hours_from.getHours()}
                      ref={hoursFromRef}
                    />
                    <p className="admin-vacancy-form-hours-minutes-label">h</p>
                  </div>

                  <div className="form-vacancy-minutes-input-block">
                    <input
                      className="admin-vacancy-form-input"
                      id="form-vacancy-minutes-from-input"
                      type="text"
                      defaultValue={
                        props.vacancyData.hours_from
                          ? props.vacancyData.hours_from.split(":")[1]
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
                        props.vacancyData.hours_to
                          ? props.vacancyData.hours_to.split(":")[0]
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
                      type="text"
                      defaultValue={
                        props.vacancyData.hours_to
                          ? props.vacancyData.hours_to.split(":")[1]
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
                value={vacancyCurrentValues.residence_type}
                onChange={changeResidenceTypeHandler}
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
                value={vacancyCurrentValues.visa_assistance}
                onChange={changeVisaAssistanceHandler}
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
                {sectorSelectOptions.map((item) => {
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
                defaultValue={props.vacancyData.description}
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
                defaultValue={props.vacancyData.requirements}
                ref={requirementsRef}
              ></textarea>
            </div>
          </div>

          <div className="admin-vacancy-form-submit-container">
            <input
              type="submit"
              value={props.newVacancy ? "Create vacancy" : "Save changes"}
              className="button-common button-common-color1"
            />
          </div>
        </div>
      </form>
    </div>
  );
};