import closeIcon from '../../svg/X.svg'
import '../../css/vacancyFilter.css'

export const VacancyFilterComponent=()=>{
    const closeButtonHandler=()=>{
        console.log('close filter window')
    }

    return <div className="vacancy-filter-window">
        <form >
            <div className="vacancy-filter-close-container">
                <img className='vacancy-filter-close-button' onClick={closeButtonHandler} src={closeIcon} alt="X" />
            </div>
            <p className='vacancy-filter-input-title'>Vacancy key words:</p>
            <input type="text" className='vacancy-filter-key-words-input' id='vacancy-filter-key-words-input'/>

            <p className='vacancy-filter-input-title'>Salary level:</p>
            <div className='vacancy-filter-salary-container'>
                <div className='vacancy-filter-salary-from-container'>
                    <label className='vacancy-filter-salary-from-label' htmlFor="vacancy-filter-salary-from-input">Min</label>
                    <input type="text" id='vacancy-filter-salary-from-input'/>
                </div>
                <div>O----O-----</div>
                <div className='vacancy-filter-salary-to-container'>
                    <label className='vacancy-filter-salary-to-label'  htmlFor="vacancy-filter-salary-to-input">Max</label>
                    <input type="text" id='vacancy-filter-salary-to-input' />
                </div>
            </div>
            <p className='vacancy-filter-input-title'>Residence type:</p>
            <select className='vacancy-filter-residence-input' id='vacancy-filter-residence-type-input'>
                <option value="1">EU citizenship</option>
                <option value="2">Permanent rsidance</option>
                <option value="3">Residance permit with free acces to job market</option>
                <option value="4">Blue card</option>
                <option value="5">Working card</option>
                <option value="6">Working visa</option>
                <option value="7">No visa</option>
d
            </select>
            
            <p className='vacancy-filter-input-title'>Location:</p>
            <input className='vacancy-filter-location-input' type="text" id='vacancy-filter-location-input' />
            <div className='vacancy-filter-submit-button-container'>
                <input className='vacancy-filter-submit-button' type="submit" value='Filter' />
            </div>
        </form>

    </div>
}