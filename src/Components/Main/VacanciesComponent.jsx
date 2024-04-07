import React, { useEffect, useState } from "react";
import '../../css/commonElements.css'
import '../../css/vacancies.css'
import {LIST_VACANCIES_BASE_URL} from '../../constants.js'
import filterIcon from '../../svg/settings.svg'
import { ListVacanciesComponent } from './ListVacanciesComponent'
import { VacancyFilterComponent } from './VacancyFilterComponent'

export const VacanciesComponent=()=>{
    // const LIST_VACANCIES_BASE_URL="http://127.0.0.1:8000/vacancy/"
    
    const [vacancyFilterDisplayValue, setVacancyFilterDisplayValue]=useState('none')
    const [listVacanciesRequestUrl, setListVacanciesRequestUrl]=useState(LIST_VACANCIES_BASE_URL)
    const [nextPaginationPage, setNextPaginationPage]=useState(null)
    const [vacanciesResponseData, setVacanciesResponseData]=useState({})
    
    // useEffect(()=>{},[listVacanciesRequestUrl])
    
    
    const filterButtonHandler=()=>{
        setVacancyFilterDisplayValue('flex')
    }

    const generateListVacanciesRequestURL=(urlParams)=>{
        let url=urlParams.listVacanciesBaseUrl+'?';
        url+=urlParams.limit ? 'limit=' + urlParams.limit : 'limit=10'
        url+=urlParams.offset ? '&offset=' + urlParams.offset : '&offset=0'
        url+=urlParams.key_search ? '&key_search=' + urlParams.key_search : ''
        url+=urlParams.salary_gte ? '&salary_gte=' + urlParams.salary_gte : ''
        url+=urlParams.salary_lte ? '&salary_lte=' + urlParams.salary_lte : ''
        url+=urlParams.location ? '&location=' + urlParams.location : ''
        url+=urlParams.residence_type ? '&residence_type=' + urlParams.residence_type : ''
        // console.log(url)
        return url                                        
    }

    const paginationButtonHandler=(e)=>{
        const paginationDirection= e.target.id==="previousVacanciesButton" ? 'previous' : 'next';
        setListVacanciesRequestUrl(vacanciesResponseData[paginationDirection])
    }

    return <div className="vacancies-container">
        <button className="vacancies-filter-button common-button"
            onClick={filterButtonHandler}
            >
            Filter <img src={filterIcon} alt="" />
        </button>
        <h2 className="h2-main-header">Vacancies</h2>
        <ListVacanciesComponent listVacanciesRequestUrl={listVacanciesRequestUrl}
                                setVacanciesResponseData={setVacanciesResponseData}
        />
        <section className="vacancies-pagination">
            {
                (()=>{
                    if (vacanciesResponseData.previous !== null) return (
                        <button id="previousVacanciesButton"
                        onClick={paginationButtonHandler}>Previous</button>
                    )
                })()
            }
            {
                (()=>{
                    if (vacanciesResponseData.next !== null) return (
                        <button id="nextVacanciesButton" onClick={paginationButtonHandler}>Next</button>
                    )
                })()
            }
        </section>
        <VacancyFilterComponent 
            vacancyFilterDisplayValue={vacancyFilterDisplayValue} 
            setVacancyFilterDisplayValue={setVacancyFilterDisplayValue}
            listVacanciesBaseUrl={LIST_VACANCIES_BASE_URL}
            setListVacanciesRequestUrl={setListVacanciesRequestUrl}
            generateListVacanciesRequestURL={generateListVacanciesRequestURL}
            
        />
        
    </div>
}