import { useEffect, useState } from "react";
import { CONTRACT_TYPE } from "../../constants";
import { GENDER_LIST } from "../../constants";
import { SECTOR_REQUEST_URL } from "../../constants";
import { RESIDENCE_TYPES } from "../../constants";
import api from "../api";

export const AdminEditVacancyFormComponent = (props) => {
  const [sectorSelectOptions, setSectorSelectOptions] = useState([]);
  const [vacancyCurrentValues, setVacancyCurrentValues] = useState({
    sectors: [],
    residence_type: "",
    gender: "",
    contract_type: "",
    visa_assistance:"",
  });
  useEffect(() => {
    // console.log(Object.keys(defaultSectors));
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
        visa_assistance: props.vacancyData.visa_assistance,
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

  return (
    <form className="admin-edit-vacancy-form">
      <input
        className="admin-edit-vacancy-input-name"
        type="text"
        placeholder="Vacancy name"
        defaultValue={props.vacancyData.name}
      />

      <div className="admin-form-vacancy-container">
        <div>
          <label htmlFor="form-vacancy-salary-input">Salary</label>
          <input
            id="form-vacancy-salary-input"
            type="text"
            defaultValue={props.vacancyData.salary}
          />
        </div>
        <div>
          <label htmlFor="form-vacancy-location-input">Location</label>
          <input
            id="form-vacancy-location-input"
            type="text"
            defaultValue={props.vacancyData.location}
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
                <option
                  key={item}
                  value={item}
                  // selected={item==props.vacancyData.contract_type}
                >
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
          />
        </div>
        <div>
          <label htmlFor="form-vacancy-hours-to-input">Work hours to</label>
          <input
            id="form-vacancy-hours-to-input"
            type="text"
            defaultValue={props.vacancyData.hours_to}
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
                <option
                  key={item_key}
                  value={item_key}
                  // selected={props.vacancyData.residence_type == item_key}
                >
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
            <option value="">Unknown</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>

          </select>
        </div>
      </div>
    </form>
  );
};
