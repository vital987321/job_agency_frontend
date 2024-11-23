import { faker } from "@faker-js/faker";
import { factory, oneOf, primaryKey } from "@mswjs/data";
import { CONTRACT_TYPE } from "../../data/constants";
// import vacancyData from "./dbJson/vacancy.json"


export const db=factory({
    // vacancy: vacancyData
    partner:{
            id: primaryKey(faker.number.int),
            company: faker.company.name,
            hr_name: faker.person.lastName,
            phone: faker.number.int
        },

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
        partner_data: oneOf('partner'),
    },
    user: {
        id: primaryKey(faker.number.int),
        userName: faker.internet.userName,
        first_name: faker.person.firstName,
        last_name:faker.person.lastName,
        email: faker.internet.email,
        phone:faker.number.int,
        cv:()=>null,
        favourites:()=>[],
        avatar:()=>null,
        role: ()=>'1150'
    },
    review: {
        id: primaryKey(faker.number.int),
        // user: oneOf('user'),
        user: faker.number.int,
        first_name: faker.person.firstName,
        last_name: faker.person.lastName,
        rating: ()=> faker.number.int({min:1, max:5}),
        comment: faker.commerce.productDescription,
        created_at: new Date(Date.now()).toISOString(),
        status: "Approved",
        avatar: "",
        avg_rating: '3.6'
    },
    
    sector:{
        id:  primaryKey(faker.number.int),
        name: faker.commerce.productName
    }
})