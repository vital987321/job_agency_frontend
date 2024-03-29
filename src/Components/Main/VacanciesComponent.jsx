import React, { useEffect, useState } from "react";
import axios from 'axios'

export const VacanciesComponent = () => {
  const [data, setData]=useState([])
  useEffect(() => {
    axios
      // .get("https://jsonplaceholder.typicode.com/users")
      .get("http://127.0.0.1:8000/vacancy")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    },[]
  )
  return (
    <div className="vacancies-container">

    </div>
  );
};
