import styles from "./SalaryLevel.module.css";
import { useState, useEffect } from "react";
import { SALARY_CEILING, FILTER_POINTER_SIZE } from "../../../data/constants";

export const SalaryLevel = (props) => {
  //* Props
  //      salaryMinRef
  //      salaryMaxRef
  //      searchParams

  //* States
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

  //* useEffects
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
    setLeftPointerPosition(calculateLeftPointerPosition(minSalaryValue));
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
  }, [pointerToDrag]);

  //* Functions
  const inputSalaryValueHandler = (e) => {
    if (e.target.id === "vacancy-filter-salary-from-input") {
      setMinSalaryValue(e.target.value);
      setLeftPointerPosition(calculateLeftPointerPosition(e.target.value));
    } else {
      setMaxSalaryValue(e.target.value);
      setRightPointerPosition(calculateRightPointerPosition(e.target.value));
    }
  };

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

  const mouseDownHandler = (e) => {
    setPointerToDrag(e.target.id);
  };

  //* Main Body
  return (
    <div className={styles["vacancy-filter-salary-container"]}>
      <div className={styles["vacancy-filter-salary-from-container"]}>
        <label
          className={styles["vacancy-filter-salary-from-label"]}
          htmlFor="vacancy-filter-salary-from-input"
        >
          Min
        </label>
        <input
          type="number"
          className={styles["vacancy-filter-salary-from-input"]}
          id="vacancy-filter-salary-from-input"
          value={minSalaryValue}
          onChange={inputSalaryValueHandler}
          ref={props.salaryMinRef}
        />
      </div>
      <div className={styles["vacancy-filter-salary-bar"]} id="vacancy-filter-salary-bar">
        <div
          className={styles["vacancy-filter-salary-min-point"]}
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
          className={styles["vacancy-filter-salary-max-point"]}
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
      <div className={styles["vacancy-filter-salary-to-container"]}>
        <label
          className={styles["vacancy-filter-salary-to-label"]}
          htmlFor="vacancy-filter-salary-to-input"
        >
          Max
        </label>
        <input
          type="number"
          className={styles["vacancy-filter-salary-to-input"]}
          id="vacancy-filter-salary-to-input"
          value={maxSalaryValue}
          onChange={inputSalaryValueHandler}
          ref={props.salaryMaxRef}
        />
      </div>
    </div>
  );
};
