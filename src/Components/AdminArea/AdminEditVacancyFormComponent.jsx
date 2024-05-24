import React, { useEffect, useState } from "react";
import { CONTRACT_TYPE } from "../../constants";
import { GENDER_LIST } from "../../constants";
import { SECTOR_REQUEST_URL } from "../../constants";
import { RESIDENCE_TYPES } from "../../constants";
import { LIST_VACANCIES_BASE_URL } from "../../constants";
import api from "../api";


export const AdminEditVacancyFormComponent = (props) => {
  const [sectorSelectOptions, setSectorSelectOptions] = useState([]);
  const [vacancyCurrentValues, setVacancyCurrentValues] = useState({
    sectors: [],
    residence_type: "",
    gender: "",
    contract_type: "",
    visa_assistance: "",
  });
  const vacancyNameRef = React.createRef();
  const companyRef=React.createRef();
  const locationRef=React.createRef()
  const salaryRef=React.createRef();
  const hoursFromRef=React.createRef()
  const hoursToRef=React.createRef()
  const descriptionRef=React.createRef()
  const requirementsRef=React.createRef()


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

    let formData = new FormData();
    formData.append("name", vacancyNameRef.current.value);
    formData.append("company", companyRef.current.value);
    formData.append("salary", parseInt(salaryRef.current.value));
    formData.append("location", locationRef.current.value);
    formData.append("contract_type", vacancyCurrentValues.contract_type);
    // formData.append("hours_from", hoursFromRef.current.value);
    // formData.append("hours_to", hoursToRef.current.value);
    formData.append("gender", vacancyCurrentValues.gender);
    formData.append("description", descriptionRef.current.value);
    formData.append("requirements", requirementsRef.current.value);
    formData.append("residence_type", vacancyCurrentValues.residence_type);
    formData.append("visa_assistance", vacancyCurrentValues.visa_assistance);
    // formData.append("sector",);

    const headers={headers:{ "Content-Type": "multipart/form-data" }}
    // console.log(formData)
    // console.log(vacancyNameRef)
    const sendRequest = async ()=>{
      
      try {
      const response = await api
      .patch(requestUrl, formData, headers)
      .then((response)=>console.log(response))
      .catch((error)=>console.log(error))
    } catch (error) {
      console.log(error);
    }
    }
    
    sendRequest()

  };

  return (
    <form className="admin-edit-vacancy-form" onSubmit={submitFormHandler}>
      <label htmlFor="admin-edit-vacancy-name-input">Vacancy name</label>
      <input
        className="admin-edit-vacancy-name-input"
        type="text"
        placeholder="Vacancy name"
        defaultValue={props.vacancyData.name}
        ref={vacancyNameRef}
      />
      <div>
        <label htmlFor="form-vacancy-conpany-input">Company</label>
        <input
          id="form-vacancy-company-input"
          type="text"
          defaultValue={props.vacancyData.company}
          ref={companyRef}
        />
      </div>

      <div className="admin-form-vacancy-container">
        <div>
          <label htmlFor="form-vacancy-salary-input">Salary</label>
          <input
            id="form-vacancy-salary-input"
            type="text"
            defaultValue={props.vacancyData.salary}
            ref={salaryRef}
          />
        </div>
        <div>
          <label htmlFor="form-vacancy-location-input">Location</label>
          <input
            id="form-vacancy-location-input"
            type="text"
            defaultValue={props.vacancyData.location}
            ref={locationRef}
          />
        </div>

        <div>
          <label htmlFor="form-vacancy-contract-type-select">
            Contract type
          </label>
          <select
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

        <div>
          <label htmlFor="form-vacancy-hours-from-input">Work hours from</label>
          <input
            id="form-vacancy-hours-from-input"
            type="text"
            defaultValue={props.vacancyData.hours_from}
            ref={hoursFromRef}
          />
        </div>
        <div>
          <label htmlFor="form-vacancy-hours-to-input">Work hours to</label>
          <input
            id="form-vacancy-hours-to-input"
            type="text"
            defaultValue={props.vacancyData.hours_to}
            ref={hoursToRef}
          />
        </div>

        <div>
          <label htmlFor="form-vacancy-gender-select">Gender</label>
          <select
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

        <div>
          <label htmlFor="form-vacancy-residence-select">Residence</label>
          <select
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

        <div>
          <label htmlFor="form-vacancy-visa-assistance-select">
            Visa assistance
          </label>
          <select
            id="form-vacancy-visa-assistance-select"
            value={vacancyCurrentValues.visa_assistance}
            onChange={changeVisaAssistanceHandler}
          >
            <option value={""}>Unknown</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="form-vacancy-description">Description</label>
        <textarea
          id="form-vacancy-description"
          cols="30"
          rows="6"
          defaultValue={props.vacancyData.description}
          ref={descriptionRef}
        ></textarea>
      </div>
      <div>
        <label htmlFor="form-vacancy-requirements">Requirements</label>
        <textarea
          id="form-vacancy-requirements"
          cols="30"
          rows="6"
          defaultValue={props.vacancyData.requirements}
          ref={requirementsRef}
        ></textarea>
      </div>
      <input
        type="submit"
        value="Save"
        className="button-common button-common-color1"
      />
    </form>
  );
};
