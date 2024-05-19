import { useEffect, useState } from "react"
import {CONTRACT_TYPE} from "../../constants"
import {GENDER_LIST} from "../../constants"
import {SECTOR_REQUEST_URL} from "../../constants"
import api from '../api'

export const AdminEditVacancyFormComponent=(props)=>{
    const [sectorData, setSectorData]=useState([])
    useEffect(()=>{
        const fetchSectors = async ()=>{
            try {
                const response=await api
                .get(SECTOR_REQUEST_URL)
                .then((response)=>{
                    
                    
                    setSectorData(response.data.results.map((item)=>item.name))
                })
                .catch((error)=>{console.log(error)})
            }
            catch(error){console.log(error)}
        };
        fetchSectors();
    },[])

    // console.log(props.vacancyData.sector_name.map((item)=>item.name))
    try{
        console.log(props.vacancyData.sector_name.map((item)=>item.name))
    } catch{console.log('error')}
    
    const sectorSelectedItems=()=>{
        try{

            return props.vacancyData.sector_name.map((item)=>item.name)
        } catch {return []}
    }

    return(
        <form 
            className="admin-edit-vacancy-form"
        >
            <input 
                className="admin-edit-vacancy-input-name"
                type="text"
                placeholder="Vacancy name"
                defaultValue={props.vacancyData.name} 
            />

            <div className="admin-form-vacancy-container">
                <div>
                    <label htmlFor="form-vacancy-salary-input">Salary</label>
                    <input
                        id="form-vacancy-salary-input"
                        type="text"
                        defaultValue={props.vacancyData.salary} 
                    />
                </div>
                <div>
                    <label htmlFor="form-vacancy-location-input">Location</label>
                    <input
                        id="form-vacancy-location-input"
                        type="text"
                        defaultValue={props.vacancyData.location} 
                    />
                </div>

                <div>
                    <label htmlFor="form-vacancy-contract-type-select">Contract type</label>
                    <select 
                        id="form-vacancy-contract-type-select"
                        value={props.vacancyData.contract_type}
                    >
                        <option value=""></option>
                        {CONTRACT_TYPE.map((item)=>{
                            return (
                                <option 
                                    key={item}
                                    value={item}
                                    // selected={item==props.vacancyData.contract_type}
                                >
                                    {item}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div>
                    <label htmlFor="form-vacancy-hours-from-input">Work hours from</label>
                    <input
                        id="form-vacancy-hours-from-input"
                        type="text"
                        defaultValue={props.vacancyData.hours_from} 
                    />
                </div>
                <div>
                    <label htmlFor="form-vacancy-hours-to-input">Work hours to</label>
                    <input
                        id="form-vacancy-hours-to-input"
                        type="text"
                        defaultValue={props.vacancyData.hours_to} 
                    />
                </div>

                <div>
                    <label htmlFor="form-vacancy-gender-select">Gender</label>
                    <select 
                        id="form-vacancy-gender-select"
                        value={props.vacancyData.gender}
                    >
                        {GENDER_LIST.map((item)=>{
                            return (
                                <option 
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            )
                        })}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="form-vacancy-sector-select">Sector</label>
                    <select 
                        id="form-vacancy-sector-select"
                        multiple
                        defaultValue={['IT - Software development']}
                        // defaultValue={sectorSelectedItems()}
                    >
                        {sectorData.map((item)=>{
                            return (
                                <option 
                                    key={item}
                                    value={item}
                                    // selected={item==props.vacancyData.gender}
                                >
                                    {item}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </form>
    )
}