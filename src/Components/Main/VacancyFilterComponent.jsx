import closeIcon from '../../svg/X.svg'
import '../../css/vacancyFilter.css'
import { useState, useEffect } from 'react'

export const VacancyFilterComponent=()=>{
    const closeButtonHandler=()=>{
    }

    const pointerDiameter=20
    const salaryCeiling=150000
    const [leftPointerPosition, setLeftPointerPosition]=useState(0)
    const [rightPointerPosition, setRightPointerPosition]=useState(0)
    const [pointerToDrag, setPointerToDrag]=useState(null);
    const [extreemLeftPointerX, setExtreemLeftPointerX]=useState()
    const [extreemRightPointerX, setExtreemRightPointerX]=useState()
    const [minSalaryValue, setMinSaleryValue]=useState(0)
    const [maxSalaryValue, setMaxSaleryValue]=useState(salaryCeiling)
    
    useEffect(()=>{
        const vacancyFilterSalaryBar=document.getElementById('vacancy-filter-salary-bar')
        setExtreemLeftPointerX(vacancyFilterSalaryBar.offsetLeft);
        setExtreemRightPointerX(extreemLeftPointerX+vacancyFilterSalaryBar.offsetWidth-pointerDiameter);
        setLeftPointerPosition(extreemLeftPointerX)
        setRightPointerPosition(extreemRightPointerX)
    },[extreemLeftPointerX, extreemRightPointerX])

    useEffect(()=>{
        const handleMouseUp=(event)=>{
            setPointerToDrag(null)
        };
        document.addEventListener('mouseup', handleMouseUp)
        return ()=>{
            document.removeEventListener('mouseup', handleMouseUp)
        }
    },[]
    )

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (pointerToDrag=='salaryLeftPointer') {
                let x = 0;
                if (event.pageX < extreemLeftPointerX) x = extreemLeftPointerX;
                else {
                        if (event.pageX > rightPointerPosition-pointerDiameter) x = rightPointerPosition-pointerDiameter;
                        else x = event.pageX;
                    }
                setLeftPointerPosition(x)
                let calcSalaryInput=(x-extreemLeftPointerX)*salaryCeiling/(extreemRightPointerX-pointerDiameter-extreemLeftPointerX)
                calcSalaryInput=(Math.round(calcSalaryInput/1000))*1000
                setMinSaleryValue(calcSalaryInput)
            }
            if (pointerToDrag=='salaryRightPointer') {
                let x = 0;
                if (event.pageX < leftPointerPosition+pointerDiameter) x = leftPointerPosition+pointerDiameter;
                else {
                        if (event.pageX > extreemRightPointerX) x = extreemRightPointerX;
                        else x = event.pageX;
                    }
                setRightPointerPosition(x)
                let calcSalaryInput=(x-extreemLeftPointerX-pointerDiameter)*salaryCeiling/(extreemRightPointerX-extreemLeftPointerX-pointerDiameter)
                calcSalaryInput=(Math.round(calcSalaryInput/1000))*1000
                setMaxSaleryValue(calcSalaryInput)
            }
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
        };
      }, [pointerToDrag,]); // Empty dependency array means this effect runs only once, similar to componentDidMount and componentWillUnmount
    
    
    const mouseDownHandler=(e)=>{
        setPointerToDrag(e.target.id)
      }
    
    const inputSalaryValueHandler=(e)=>{
        if (e.target.id==='vacancy-filter-salary-from-input'){
            setMinSaleryValue(e.target.value)
            let calcPointerPosition=e.target.value*(extreemRightPointerX-extreemLeftPointerX-pointerDiameter)/salaryCeiling+extreemLeftPointerX
            calcPointerPosition=Math.max(extreemLeftPointerX, calcPointerPosition)
            calcPointerPosition=Math.min(extreemRightPointerX-pointerDiameter, calcPointerPosition)
            setLeftPointerPosition(calcPointerPosition)
        }
        else{
            setMaxSaleryValue(e.target.value)
            let calcPointerPosition=e.target.value*(extreemRightPointerX-extreemLeftPointerX-pointerDiameter)/salaryCeiling+extreemLeftPointerX+pointerDiameter
            calcPointerPosition=Math.max(extreemLeftPointerX+pointerDiameter, calcPointerPosition)
            calcPointerPosition=Math.min(extreemRightPointerX, calcPointerPosition)
            setRightPointerPosition(calcPointerPosition)
        }
    }
    
    return <div className="vacancy-filter-window">
        <form >
            <div className="vacancy-filter-close-container">
                <img className='vacancy-filter-close-button' onClick={closeButtonHandler} src={closeIcon} alt="X" />
            </div>
            <p className='vacancy-filter-input-title'>Vacancy key words:</p>
            <input type="text" className='vacancy-filter-key-words-input' id='vacancy-filter-key-words-input'/>

            <p className='vacancy-filter-input-title'>Salary level:</p>
            <div className='vacancy-filter-salary-container' >
                <div className='vacancy-filter-salary-from-container'>
                    <label className='vacancy-filter-salary-from-label' htmlFor="vacancy-filter-salary-from-input">Min</label>
                    <input type="text"
                        id='vacancy-filter-salary-from-input'
                        value={minSalaryValue}
                        onChange={inputSalaryValueHandler}
                    />
                </div>
                <div className='vacancy-filter-salary-bar' id='vacancy-filter-salary-bar'>
                    <div className='vacancy-filter-salary-min-point'
                        style={{'left':(leftPointerPosition-extreemLeftPointerX)+'px'}}
                        id='salaryLeftPointer'
                        onMouseDown={mouseDownHandler}
                        >
                    </div>
                    <div className='vacancy-filter-salary-max-point'
                        id='salaryRightPointer'
                        style={{'left':(rightPointerPosition-extreemLeftPointerX)+'px'}}
                        onMouseDown={mouseDownHandler}
                        >
                    </div>
                    </div>
                <div className='vacancy-filter-salary-to-container'>
                    <label className='vacancy-filter-salary-to-label'  htmlFor="vacancy-filter-salary-to-input">Max</label>
                    <input type="text"
                        id='vacancy-filter-salary-to-input'
                        value={maxSalaryValue}
                        onChange={inputSalaryValueHandler}
                    />
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

