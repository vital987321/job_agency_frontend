import React, { useEffect, useState } from "react";
import '../../css/commonElements.css'
import '../../css/vacancies.css'
import {LIST_VACANCIES_BASE_URL} from '../../constants.js'
import filterIcon from '../../svg/settings.svg'
import { ListVacanciesComponent } from './ListVacanciesComponent'
import { VacancyFilterComponent } from './VacancyFilterComponent'
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

export const VacanciesComponent=()=>{
    
    const [vacancyFilterDisplayValue, setVacancyFilterDisplayValue]=useState('none')
    const [listVacanciesRequestUrl, setListVacanciesRequestUrl]=useState(LIST_VACANCIES_BASE_URL)
    const [vacanciesResponseData, setVacanciesResponseData]=useState({})
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();


    const filterButtonHandler=()=>{
        setVacancyFilterDisplayValue('flex')
    }

    const generateListVacanciesRequestURL=()=>{
        let url=LIST_VACANCIES_BASE_URL+'?';
        url+=searchParams.get('limit') ? 'limit=' + searchParams.get('limit') : 'limit=10'
        url+=searchParams.get('offset') ? '&offset=' + searchParams.get('offset') : '&offset=0'
        url+=searchParams.get('key_search') ? '&key_search=' + searchParams.get('key_search') : ''
        url+=searchParams.get('salary_gte') ? '&salary_gte=' + searchParams.get('salary_gte') : ''
        url+=searchParams.get('salary_lte') ? '&salary_lte=' + searchParams.get('salary_lte') : ''
        url+=searchParams.get('location') ? '&location=' + searchParams.get('location') : ''
        url+=searchParams.get('residence_type') ? '&residence_type=' + searchParams.get('residence_type') : ''
        return url                                        
    }


    const updateListVacanciesRequestURL=()=>{
        const updatedURL=generateListVacanciesRequestURL()
        if (updatedURL!==listVacanciesRequestUrl){
            setListVacanciesRequestUrl(updatedURL)
        }
    }

    updateListVacanciesRequestURL()
    

    const getQueryString=(urlString)=>{
        if (urlString){
            const queryString=urlString.split('?')[1]
            if (queryString) {
                console.log(queryString)
                return queryString
            }
        }
        return ''
    }

    const paginationButtonHandler=(e)=>{
        const paginationDirection= e.target.id==="previousVacanciesButton" ? 'previous' : 'next';
        navigate('?'+getQueryString(vacanciesResponseData[paginationDirection]))
    }


    return (
      <div className="vacancies-container">
        <button
          className="vacancies-filter-buttn button-common"
          onClick={filterButtonHandler}
        >
          Filter <img src={filterIcon} alt="" />
        </button>
        <h2 className="h2-main-header h2-common">Vacancies</h2>
        <ListVacanciesComponent
          listVacanciesRequestUrl={listVacanciesRequestUrl}
          setVacanciesResponseData={setVacanciesResponseData}
        />
        <section className="vacancies-pagination-section">
          <div className="vacancies-pagination-previous-container">
            {(() => {
              if (vacanciesResponseData.previous !== null)
                return (
                  <button
                    id="previousVacanciesButton"
                    className="vacancies-paggination-button"
                    onClick={paginationButtonHandler}
                  >
                   {'<'} Previous
                  </button>
                );
            })()}
          </div>
        <div className="vacancies-pagination-previous-container">
                    {(() => {
            if (vacanciesResponseData.next !== null)
              return (
                <button
                  className="vacancies-paggination-button"
                  id="nextVacanciesButton"
                  onClick={paginationButtonHandler}
                >
                  Next {'>'}
                </button>
              );
          })()}</div>

          
        </section>
        <VacancyFilterComponent
          vacancyFilterDisplayValue={vacancyFilterDisplayValue}
          setVacancyFilterDisplayValue={setVacancyFilterDisplayValue}
          listVacanciesBaseUrl={LIST_VACANCIES_BASE_URL}
          setListVacanciesRequestUrl={setListVacanciesRequestUrl}
          generateListVacanciesRequestURL={generateListVacanciesRequestURL}
          searchParams={searchParams}
        />
      </div>
    );
}

