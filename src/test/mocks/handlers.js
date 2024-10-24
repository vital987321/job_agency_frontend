import {http, HttpResponce} from "msw"
import { db } from "./db"

export const handlers=[
    ...db.vacancy.toHandlers('rest')
]