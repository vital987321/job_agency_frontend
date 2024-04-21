import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import '../../css/listUserApplications.css'
import { stringToDateDMY, identifyWorkingHours } from "../../funcs";
import {LIST_APPLICATIONS_BASE_URL} from '../../constants.js'

export const ListUserApplicationsComponent = () => {
  const [applicationsListData, setApplicationsListData]=useState([])
  const [applicationsResponseData, aetApplicationsResponseData]=useState({"count":"0", "next":null, "previous":null})
  const [applicationsListRequestUrl, setApplicationListRequestUrl]=useState(LIST_APPLICATIONS_BASE_URL)
  useEffect(() => {
    axios
      .get(applicationsListRequestUrl)
      .then(response => {
          setApplicationsListData(response.data.results)
          return response
        }
      )
      .then(response=>{aetApplicationsResponseData({...applicationsResponseData, 
        ...{"count":response.data.count, 
            "next":response.data.next, 
            "previous":response.data.previous
          }
        })}
      )
      .catch((err) => console.log(err));
    },[applicationsListRequestUrl]
  )


const paginationButtonHandler=(e)=>{
  const paginationDirection= e.target.dataset.direction
  setApplicationListRequestUrl(applicationsResponseData[paginationDirection])
}

  return (
    <section className="list-applications-container">
      <table className="list-table">
        <tbody >
          {applicationsListData.map(application => {
          return (
            <tr key={application.id}>
              <td>{application.vacancy_details.name}</td>
              <td>{application.vacancy_details.salary} CZK</td>
              <td>{application.vacancy_details.location}</td>
              <td>{application.status}</td>
              <td>{stringToDateDMY(application.created_at)}</td>
              <td>
                <Link to={"/applications/"+application.id} className="details-link">
                    <button className="details-link-button button-common">Details</button>
                </Link>
              </td>
            </tr>
          );
        })}
        </tbody>
        
      </table>
      <div className="applications-list-pagination-container">
        {applicationsResponseData.previous ? 
          <button 
            onClick={paginationButtonHandler}
            data-direction="previous"
            id="previousApplicationsButton"
            className="applications-pagination-button"
          >
            {'<'} Previous
          </button>
          :null
        }
        {applicationsResponseData.next ? 
          <button 
            onClick={paginationButtonHandler}
            data-direction="next"
            id="nextApplicationsButton"
            className="applications-pagination-button"
          >
            Next {'>'}
          </button>
          :null
        }
      </div>
    </section>
  );
};
