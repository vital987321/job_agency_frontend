import closeIcon from "../../../../../assets/svg/X.svg";
import "./vacancyFilter.css";
import React, { useState, useEffect } from "react";
import {
  SALARY_CEILING,
  FILTER_POINTER_SIZE,
  RESIDENCE_TYPES,
} from "../../../../../data/constants";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { ButtonType1 } from "../../../../../environmentCommon/components/buttons/buttonType1/ButtonType1";

const vacancyKeyWordsRef = React.createRef();
const salaryMinRef = React.createRef();
const salaryMaxRef = React.createRef();
const vacancyResidenceRef = React.createRef();
const vacancyLocationRef = React.createRef();

export const VacancyFilterComponent = (props) => {
  const closeButtonHandler = () => {
    props.setVacancyFilterDisplayValue("none");
  };

  const navigate = useNavigate();
  const [leftPointerPosition, setLeftPointerPosition] = useState(0);
  const [rightPointerPosition, setRightPointerPosition] = useState(0);
  const [pointerToDrag, setPointerToDrag] = useState(null);
  const [extreemLeftPointerX, setExtreemLeftPointerX] = useState();
  const [extreemRightPointerX, setExtreemRightPointerX] = useState();
  const [minSalaryValue, setMinSalaryValue] = useState(
    props.searchParams.get("salary_gte") || 0
  );
  const [maxSalaryValue, setMaxSalaryValue] = useState(
    props.searchParams.get("salary_lte") || SALARY_CEILING
  );

  const calculateLeftPointerPosition = (salaryValue) => {
    let calcPointerPosition =
      (salaryValue *
        (extreemRightPointerX - extreemLeftPointerX - FILTER_POINTER_SIZE)) /
        SALARY_CEILING +
      extreemLeftPointerX;
    calcPointerPosition = Math.max(extreemLeftPointerX, calcPointerPosition);
    calcPointerPosition = Math.min(
      extreemRightPointerX - FILTER_POINTER_SIZE,
      calcPointerPosition
    );
    return calcPointerPosition;
  };

  const calculateRightPointerPosition = (salaryValue) => {
    let calcPointerPosition =
      (salaryValue *
        (extreemRightPointerX - extreemLeftPointerX - FILTER_POINTER_SIZE)) /
        SALARY_CEILING +
      extreemLeftPointerX +
      FILTER_POINTER_SIZE;
    calcPointerPosition = Math.max(
      leftPointerPosition + FILTER_POINTER_SIZE,
      calcPointerPosition
    );
    calcPointerPosition = Math.min(extreemRightPointerX, calcPointerPosition);
    return calcPointerPosition;
  };

  useEffect(() => {
    const vacancyFilterSalaryBar = document.getElementById(
      "vacancy-filter-salary-bar"
    );
    setExtreemLeftPointerX(vacancyFilterSalaryBar.offsetLeft);
    setExtreemRightPointerX(
      extreemLeftPointerX +
        vacancyFilterSalaryBar.offsetWidth -
        FILTER_POINTER_SIZE
    );
    // setLeftPointerPosition(extreemLeftPointerX);
    setLeftPointerPosition(calculateLeftPointerPosition(minSalaryValue));
    // setRightPointerPosition(extreemRightPointerX)
    setRightPointerPosition(calculateRightPointerPosition(maxSalaryValue));
  }, [
    extreemLeftPointerX,
    extreemRightPointerX,
    props.vacancyFilterDisplayValue,
  ]);

  useEffect(() => {
    const handleMouseUp = (event) => {
      setPointerToDrag(null);
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (pointerToDrag === "salaryLeftPointer") {
        let x = 0;
        if (event.pageX < extreemLeftPointerX) x = extreemLeftPointerX;
        else {
          if (event.pageX > rightPointerPosition - FILTER_POINTER_SIZE)
            x = rightPointerPosition - FILTER_POINTER_SIZE;
          else x = event.pageX;
        }
        setLeftPointerPosition(x);
        let calcSalaryInput =
          ((x - extreemLeftPointerX) * SALARY_CEILING) /
          (extreemRightPointerX - FILTER_POINTER_SIZE - extreemLeftPointerX);
        calcSalaryInput = Math.round(calcSalaryInput / 1000) * 1000;
        setMinSalaryValue(calcSalaryInput);
      }
      if (pointerToDrag === "salaryRightPointer") {
        let x = 0;
        if (event.pageX < leftPointerPosition + FILTER_POINTER_SIZE)
          x = leftPointerPosition + FILTER_POINTER_SIZE;
        else {
          if (event.pageX > extreemRightPointerX) x = extreemRightPointerX;
          else x = event.pageX;
        }
        setRightPointerPosition(x);
        let calcSalaryInput =
          ((x - extreemLeftPointerX - FILTER_POINTER_SIZE) * SALARY_CEILING) /
          (extreemRightPointerX - extreemLeftPointerX - FILTER_POINTER_SIZE);
        calcSalaryInput = Math.round(calcSalaryInput / 1000) * 1000;
        setMaxSalaryValue(calcSalaryInput);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [pointerToDrag]); // Empty dependency array means this effect runs only once, similar to componentDidMount and componentWillUnmount

  const mouseDownHandler = (e) => {
    setPointerToDrag(e.target.id);
  };

  const inputSalaryValueHandler = (e) => {
    if (e.target.id === "vacancy-filter-salary-from-input") {
      setMinSalaryValue(e.target.value);
      setLeftPointerPosition(calculateLeftPointerPosition(e.target.value));
    } else {
      setMaxSalaryValue(e.target.value);
      setRightPointerPosition(calculateRightPointerPosition(e.target.value));
    }
  };

  const buildFIlterQueryString = () => {
    const vacancyKeyWords = vacancyKeyWordsRef.current.value;
    const salaryMin = salaryMinRef.current.value;
    const salaryMax = salaryMaxRef.current.value;
    const vacancyLocation = vacancyLocationRef.current.value;
    const vacancyResidence = vacancyResidenceRef.current.value;

    let queryStringArray = [];
    let queryString = "";
    if (vacancyKeyWords)
      queryStringArray.push(
        "key_search=" + encodeURIComponent(vacancyKeyWords)
      );
    if (salaryMin > 0) queryStringArray.push("salary_gte=" + salaryMin);
    if (salaryMax < SALARY_CEILING)
      queryStringArray.push("salary_lte=" + salaryMax);
    if (vacancyLocation)
      queryStringArray.push("location=" + encodeURIComponent(vacancyLocation));
    if (vacancyResidence)
      queryStringArray.push("residence_type=" + vacancyResidence);
    if (queryStringArray.length > 0) {
      queryString = "?" + queryStringArray.join("&");
    }
    return queryString;
  };

  const submitVacancyFilterHandler = (e) => {
    e.preventDefault();
    navigate("" + buildFIlterQueryString());
    props.setVacancyFilterDisplayValue("none");
  };

  const onFormModalSpaceClick = (e) => {
    if (e.target.id == "vacancy-filter-container") closeButtonHandler();
  };

  return (
    <div
      id="vacancy-filter-container"
      className="vacancy-filter-container"
      style={{ display: props.vacancyFilterDisplayValue }}
      onClick={onFormModalSpaceClick}
    >
      <form
        className="vacancy-filter-form"
        onSubmit={submitVacancyFilterHandler}
      >
        <div className="vacancy-filter-close-container">
          <img
            className="vacancy-filter-close-button"
            onClick={closeButtonHandler}
            src={closeIcon}
            alt="X"
          />
        </div>
        <p className="vacancy-filter-input-title">Vacancy key words:</p>
        <input
          type="text"
          className="vacancy-filter-key-words-input"
          id="vacancy-filter-key-words-input"
          defaultValue={props.searchParams.get("key_search")}
          ref={vacancyKeyWordsRef}
        />

        <p className="vacancy-filter-input-title">Salary level:</p>
        <div className="vacancy-filter-salary-container">
          <div className="vacancy-filter-salary-from-container">
            <label
              className="vacancy-filter-salary-from-label"
              htmlFor="vacancy-filter-salary-from-input"
            >
              Min
            </label>
            <input
              type="number"
              id="vacancy-filter-salary-from-input"
              value={minSalaryValue}
              onChange={inputSalaryValueHandler}
              ref={salaryMinRef}
            />
          </div>
          <div
            className="vacancy-filter-salary-bar"
            id="vacancy-filter-salary-bar"
          >
            <div
              className="vacancy-filter-salary-min-point"
              style={{
                left: leftPointerPosition - extreemLeftPointerX + "px",
                width: FILTER_POINTER_SIZE + "px",
                height: FILTER_POINTER_SIZE + "px",
                top: -FILTER_POINTER_SIZE / 2 + "px",
              }}
              id="salaryLeftPointer"
              onMouseDown={mouseDownHandler}
            ></div>
            <div
              className="vacancy-filter-salary-max-point"
              id="salaryRightPointer"
              style={{
                left: rightPointerPosition - extreemLeftPointerX + "px",
                width: FILTER_POINTER_SIZE + "px",
                height: FILTER_POINTER_SIZE + "px",
                top: -FILTER_POINTER_SIZE / 2 + "px",
              }}
              onMouseDown={mouseDownHandler}
            ></div>
          </div>
          <div className="vacancy-filter-salary-to-container">
            <label
              className="vacancy-filter-salary-to-label"
              htmlFor="vacancy-filter-salary-to-input"
            >
              Max
            </label>
            <input
              type="number"
              id="vacancy-filter-salary-to-input"
              value={maxSalaryValue}
              onChange={inputSalaryValueHandler}
              ref={salaryMaxRef}
            />
          </div>
        </div>
        <p className="vacancy-filter-input-title">Residence type:</p>
        <select
          className="vacancy-filter-residence-input"
          id="vacancy-filter-residence-type-input"
          defaultValue={props.searchParams.get("residence_type")}
          ref={vacancyResidenceRef}
        >
          <option value=""></option>
          {Object.keys(RESIDENCE_TYPES).map((objectKey, index) => {
            return (
              <option key={objectKey} value={objectKey}>
                {RESIDENCE_TYPES[objectKey]}
              </option>
            );
          })}
        </select>

        <p className="vacancy-filter-input-title">Location:</p>
        <input
          className="vacancy-filter-location-input"
          type="text"
          id="vacancy-filter-location-input"
          defaultValue={props.searchParams.get("location")}
          ref={vacancyLocationRef}
        />
        <div className="vacancy-filter-submit-button-container">

          <ButtonType1
            value='Filter'
            onClickHandler={submitVacancyFilterHandler}
            strength='2'          
          />
        </div>
      </form>
    </div>
  );
};
