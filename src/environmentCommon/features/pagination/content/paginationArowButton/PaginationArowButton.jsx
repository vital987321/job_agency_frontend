import styles from "./paginationArowButton.module.css";
import { useNavigate } from "react-router-dom";

export const PaginationArowButton = (props) => {
  const direction = props.direction; /*previous or next*/
  const responseData = props.responseData;
  const setRequestUrl=props.setRequestUrl
  const navigate = useNavigate();

  const paginationButtonHandler = (e) => {
    const paginationDirection = e.target.dataset.direction;
    
    if (setRequestUrl){
      setRequestUrl(responseData[paginationDirection])
    }
    else {
      const requestQueryString=getQueryString(responseData[paginationDirection])
      navigate("?" + requestQueryString);
    }
  };

  const getQueryString = (urlString) => {
    if (urlString) {
      const queryString = urlString.split("?")[1];
      if (queryString) {
        return queryString;
      }
    }
    return "";
  };

  if (responseData[direction] !== null) {
    return (
      <button
        className={styles["vacancies-pagination-button"]}
        onClick={paginationButtonHandler}
        data-direction={direction}
      >
        {direction === "previous" ? "< Previous" : "Next >"}
      </button>
    );
  }
};




// Previous version

// import styles from "./paginationArowButton.module.css";
// import { useNavigate } from "react-router-dom";

// export const PaginationArowButton = (props) => {
//   const direction = props.direction; /*previous or next*/
//   const responseData = props.responseData;
//   const navigate = useNavigate();

//   const paginationButtonHandler = (e) => {
//     const paginationDirection = e.target.dataset.direction;
//     navigate("?" + getQueryString(responseData[paginationDirection]));
//   };

//   const getQueryString = (urlString) => {
//     if (urlString) {
//       const queryString = urlString.split("?")[1];
//       if (queryString) {
//         return queryString;
//       }
//     }
//     return "";
//   };

//   if (responseData[direction] !== null) {
//     return (
//       <button
//         className={styles["vacancies-pagination-button"]}
//         onClick={paginationButtonHandler}
//         data-direction={direction}
//       >
//         {direction === "previous" ? "< Previous" : "Next >"}
//       </button>
//     );
//   }
// };