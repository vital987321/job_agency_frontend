import React, { useEffect, useState } from "react";
import { CONTRACT_TYPE } from "../../constants";
import { GENDER_LIST } from "../../constants";
import { SECTOR_REQUEST_URL } from "../../constants";
import { RESIDENCE_TYPES } from "../../constants";
import { LIST_VACANCIES_BASE_URL } from "../../constants";
import closeIcon from "../../svg/X.svg";
import api from "../api";
import "../../css/adminArea/adminVacancyForm.css";

export const AdminVacancyFormComponent = (props) => {
  const [sectorSelectOptions, setSectorSelectOptions] = useState([]);
  const [vacancyCurrentValues, setVacancyCurrentValues] = useState({
    sectors: [],
    residence_type: "",
    gender: "",
    contract_type: "",
    visa_assistance: "",
  });
  const vacancyNameRef = React.createRef();
  const companyRef = React.createRef();
  const locationRef = React.createRef();
  const salaryRef = React.createRef();
  const hoursFromRef = React.createRef();
  const hoursToRef = React.createRef();
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

  const submitFormHandler = (e) => {
    e.preventDefault();
    const requestUrl = LIST_VACANCIES_BASE_URL + props.vacancyData.id + "/";

    const requestData = {
      name: vacancyNameRef.current.value,
      company: companyRef.current.value,
      salary: parseInt(salaryRef.current.value),
      location: locationRef.current.value,
      contract_type: vacancyCurrentValues.contract_type,
      hours_from: hoursFromRef.current.value,
      hours_to: hoursToRef.current.value,
      gender: vacancyCurrentValues.gender,
      description: descriptionRef.current.value,
      requirements: requirementsRef.current.value,
      residence_type: vacancyCurrentValues.residence_type,
      visa_assistance: vacancyCurrentValues.visa_assistance,
      sector: vacancyCurrentValues.sectors,
    };

    // const headers = { headers: { "Content-Type": "multipart/form-data" } };

    const sendRequest = async () => {
      try {
        console.log(requestData.sector);
        const response = await api
          .patch(requestUrl, requestData)
          .then((response) => console.log(response))
          .then(console.log("Vacancy updated"))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };

    sendRequest();
  };

  return (
    <form className="admin-vacancy-form" onSubmit={submitFormHandler}>
      <div className="admin-vacancy-form-close-button-container">
        <button className="admin-vacancy-form-close-button">
          <img src={closeIcon} alt="" />
        </button>
      </div>
      <div className="admin-vacancy-form-main-container">
        <div className="admin-vacancy-form-header-container">
          <div className="admin-vacancy-form-name-container">
            <label htmlFor="admin-edit-vacancy-name-input">Vacancy name</label>
            <input
              className="admin-vacancy-name-input admin-vacancy-form-input"
              type="text"
              placeholder="Vacancy name"
              defaultValue={props.vacancyData.name}
              ref={vacancyNameRef}
            />
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
              <option value=""></option>
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
            <label htmlFor="form-vacancy-hours-from-input">
              Work hours from
            </label>
            <input
              className="admin-vacancy-form-input"
              id="form-vacancy-hours-from-input"
              type="text"
              defaultValue={props.vacancyData.hours_from}
              ref={hoursFromRef}
            />
          </div>
          <div className="admin-form-vacancy-items">
            <label htmlFor="form-vacancy-hours-to-input">Work hours to</label>
            <input
              className="admin-vacancy-form-input"
              id="form-vacancy-hours-to-input"
              type="text"
              defaultValue={props.vacancyData.hours_to}
              ref={hoursToRef}
            />
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
              id="form-vacancy-requirements"
              cols="30"
              rows="6"
              defaultValue={props.vacancyData.requirements}
              ref={requirementsRef}
            ></textarea>
          </div>
        </div>
        <input
          type="submit"
          value="Save"
          className="button-common button-common-color1"
        />
      </div>
    </form>
  );
};
