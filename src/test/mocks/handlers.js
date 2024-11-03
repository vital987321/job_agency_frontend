import {http, HttpResponse} from "msw"
import { db } from "./db"
import { LIST_REVIEWS_REQUEST_URL } from "../../data/constants"

export const handlers=[

    ...db.vacancy.toHandlers('rest', 'http://127.0.0.1:8000/user/'),

    http.get('http://127.0.0.1:8000/user/', ()=>{
        const data={
            count: 3, //db.user.getAll().length
            results: db.user.getAll(),
        }
        return HttpResponse.json(data)
    }),


    ...db.user.toHandlers('rest', 'http://127.0.0.1:8000'),
    http.patch('http://127.0.0.1:8000/user/:id/', async ({request, params})=>{
        const {id}=params
        const userData=db.user.findFirst({
            where: { id: {equals: id}}
        })
        const updatedData={data: userData}
        return HttpResponse.json(updatedData)
    }),
    
    http.get('http://127.0.0.1:8000/review/', ()=>{
        const data={
            count: db.review.getAll().length,
            results: db.review.getAll()
        }
        return HttpResponse.json(data)
    }),
]