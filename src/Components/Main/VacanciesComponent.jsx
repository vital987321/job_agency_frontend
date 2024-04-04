import filterIcon from '../../svg/settings.svg'
import { ListVacanciesComponent } from './ListVacanciesComponent'
import { VacancyFilterComponent } from './VacancyFilterComponent'

export const VacanciesComponent=()=>{
    return <>
    <VacancyFilterComponent/>
    <button className="vacancies-filter-button">
        Filter <img src={filterIcon} alt="" />
    </button>
    <ListVacanciesComponent/>
    <section className="vacancies-pagination">
        
    </section>
    
    </>
}