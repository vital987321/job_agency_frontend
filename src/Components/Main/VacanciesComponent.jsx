import React, { useEffect, useState } from "react";
import '../../css/commonElements.css'
import '../../css/vacancies.css'
import {LIST_VACANCIES_BASE_URL, VACANCY_LIST_LIMIT} from '../../constants.js'
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
      return LIST_VACANCIES_BASE_URL+ '?' + generateListVacanciesRequestQueryString()                                     
    }

    const generateListVacanciesRequestQueryString=(offset)=>{
      let qstr=''
      qstr+=searchParams.get('limit') ? 'limit=' + searchParams.get('limit') : 'limit='+VACANCY_LIST_LIMIT
      if (isNaN(offset)){
        qstr+=searchParams.get('offset') ? '&offset=' + searchParams.get('offset') : '&offset=0'
      }
      else{
        qstr+='&offset='+offset
      }
      qstr+=searchParams.get('key_search') ? '&key_search=' + searchParams.get('key_search') : ''
      qstr+=searchParams.get('salary_gte') ? '&salary_gte=' + searchParams.get('salary_gte') : ''
      qstr+=searchParams.get('salary_lte') ? '&salary_lte=' + searchParams.get('salary_lte') : ''
      qstr+=searchParams.get('location') ? '&location=' + searchParams.get('location') : ''
      qstr+=searchParams.get('residence_type') ? '&residence_type=' + searchParams.get('residence_type') : ''
      return qstr
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
                return queryString
            }
        }
        return ''
    }

    const paginationButtonHandler=(e)=>{
        const paginationDirection= e.target.id==="previousVacanciesButton" ? 'previous' : 'next';
        navigate('?'+ getQueryString(vacanciesResponseData[paginationDirection]))
    }

    const PaginationNumberedLinks=()=>{
      const vacanciesTotalNumber=vacanciesResponseData.count
      if (vacanciesTotalNumber>VACANCY_LIST_LIMIT){
        let paginationArray = new Array()
        const currentOffset=searchParams.get('offset') ? searchParams.get('offset') : '0'
        const currentPaginationNumber=Math.floor(currentOffset/VACANCY_LIST_LIMIT)+1
        const minPaginationNumber=Math.max(1, currentPaginationNumber-3)
        const maxPaginationNumber=Math.min(currentPaginationNumber+3, Math.ceil(vacanciesTotalNumber/VACANCY_LIST_LIMIT))

        for (let i=minPaginationNumber; i<=maxPaginationNumber; i++) {
          paginationArray.push(i)
        }
        return <>
          {paginationArray.map(item=>{
            return (
              <a
                key={item} 
                className={"vacancies-pagination-link" + (item==currentPaginationNumber ? ' current-vacancy-pagination-link' : '')}
                href={'?'+generateListVacanciesRequestQueryString((item-1)*VACANCY_LIST_LIMIT)}
              >
                {item}
              </a>
            )
          })}
        </>
      }
      return ''

    }


    return (
      <div className="vacancies-container">
        <button
          className="vacancies-filter-buttn button-common button-common-color3"
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
                    className="vacancies-pagination-button"
                    onClick={paginationButtonHandler}
                  >
                   {'<'} Previous
                  </button>
                );
            })()}
          </div>
          
          <PaginationNumberedLinks/>
          
          <div className="vacancies-pagination-previous-container">
            {(() => {
              if (vacanciesResponseData.next !== null)
                return (
                  <button
                    className="vacancies-pagination-button"
                    id="nextVacanciesButton"
                    onClick={paginationButtonHandler}
                  >
                    Next {'>'}
                  </button>
              );
            })()}
          </div>

          
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

