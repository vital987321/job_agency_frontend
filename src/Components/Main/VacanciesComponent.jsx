import React, { useEffect, useState } from "react";
import '../../css/commonElements.css'
import '../../css/vacancies.css'
import filterIcon from '../../svg/settings.svg'
import { ListVacanciesComponent } from './ListVacanciesComponent'
import { VacancyFilterComponent } from './VacancyFilterComponent'

export const VacanciesComponent=()=>{
    const listVacanciesBaseUrl="http://127.0.0.1:8000/vacancy/"
    
    const [vacancyFilterDisplayValue, setVacancyFilterDisplayValue]=useState('none')
    const [listVacanciesRequestUrl, setListVacanciesRequestUrl]=useState(listVacanciesBaseUrl)

    const filterButtonHandler=()=>{
        setVacancyFilterDisplayValue('flex')
    }

    

    return <div className="vacancies-container">
        <button className="vacancies-filter-button common-button"
            onClick={filterButtonHandler}
            >
            Filter <img src={filterIcon} alt="" />
        </button>
        <ListVacanciesComponent listVacanciesRequestUrl={listVacanciesRequestUrl}/>
        <section className="vacancies-pagination">

        </section>
        <VacancyFilterComponent 
            vacancyFilterDisplayValue={vacancyFilterDisplayValue} 
            setVacancyFilterDisplayValue={setVacancyFilterDisplayValue}
            listVacanciesBaseUrl={listVacanciesBaseUrl}
            setListVacanciesRequestUrl={setListVacanciesRequestUrl}
        />
    </div>
}