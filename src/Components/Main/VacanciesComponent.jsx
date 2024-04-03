import filterIcon from '../../svg/settings.svg'
import { ListVacanciesComponent } from './ListVacanciesComponent'

export const VacanciesComponent=()=>{
    return <>
    <button className="vacancies-filter-button">
        Filter <img src={filterIcon} alt="" />
    </button>
    <ListVacanciesComponent/>
    <section className="vacancies-pagination">
        
    </section>
    </>
}