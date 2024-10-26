import {http, HttpResponse} from "msw"
import { db } from "./db"

export const handlers=[
    http.get('http://127.0.0.1:8000/vacancy', ()=>{
        const results=db.vacancy.getAll()
        // const a=[{'d':"f", g:"g"}, {f:"f",  g:"g"}]
        const data={
            count: 3,
            results: db.vacancy.getAll(),
            // results: a,
            // results: [results[0],]
        }
        // console.log(data)
        return HttpResponse.json(data)
    }),
    ...db.vacancy.toHandlers('rest')
]