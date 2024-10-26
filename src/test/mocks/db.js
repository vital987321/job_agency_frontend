import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";
import { CONTRACT_TYPE } from "../../data/constants";
// import vacancyData from "./dbJson/vacancy.json"


export const db=factory({
    // vacancy: vacancyData
    vacancy: {
        id: primaryKey(faker.number.int),
        name: faker.person.jobTitle,
        sector: ()=> [ faker.number.int(), ],
        location: faker.location.city,
        salary: ()=>faker.number.int({min:20000, max:150000}),
        contract_type: ()=> CONTRACT_TYPE[faker.number.int({min:0, max:2})],
        hours_from: ()=> "8:00:00",
        hours_to: ()=> "16:00:00",
        gender: ()=> 'Male/Female',
        description: faker.commerce.productDescription,
        requirements: faker.commerce.productDescription, 
        created_at: ()=>new Date(Date.now()).toISOString(), 
        residence_type: ()=>faker.number.int({min:1, max: 7}), 
        visa_assistance: faker.datatype.boolean,
        sector_name: ()=> [{id:faker.number.int(), name:faker.commerce.department()},],
        active: ()=>true,
        partner_data: ()=>'',
    }
})