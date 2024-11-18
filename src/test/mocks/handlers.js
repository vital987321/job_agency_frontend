import { http, HttpResponse } from "msw";
import { db } from "./db";
import {
  LIST_REVIEWS_REQUEST_URL,
  USER_REQUEST_URL,
  LIST_REVIEWS_REQUEST_URL,
  LIST_VACANCIES_BASE_URL,
  PARTNERS_REQUEST_URL,
  SECTOR_REQUEST_URL,
} from "../../data/constants";

export const handlers = [
  http.get(USER_REQUEST_URL, () => {
    const allUsers = db.user.getAll();
    const data = {
      count: allUsers.length,
      results: allUsers,
    };
    return HttpResponse.json(data);
  }),

  http.patch(USER_REQUEST_URL + ":id/", async ({ request, params }) => {
    const { id } = params;
    const userData = db.user.findFirst({
      where: { id: { equals: id } },
    });
    const updatedData = { data: userData };
    return HttpResponse.json(updatedData);
  }),

  http.get(LIST_REVIEWS_REQUEST_URL, () => {
    const allReviews = db.review.getAll();
    const data = {
      count: allReviews.length,
      results: allReviews,
    };
    return HttpResponse.json(data);
  }),

  http.get(LIST_VACANCIES_BASE_URL, () => {
    const allVacancies = db.vacancy.getAll();
    const data = {
      count: allVacancies.length,
      results: allVacancies,
    };
    return HttpResponse.json(data);
  }),

  http.get(LIST_VACANCIES_BASE_URL + ":id", ({ params }) => {
    const { id } = params;
    const data = db.vacancy.findFirst({
      where: {
        id: {
          equals: parseInt(id),
        },
      },
    });
    return HttpResponse.json(data);
  }),

  http.get(PARTNERS_REQUEST_URL,()=>{
    const partners=db.partner.getAll()
    const data={
      count: partners.length,
      results: partners
    }
    return (HttpResponse.json(data))
  }),

  http.get(SECTOR_REQUEST_URL, ()=>{
    const sectors=db.sector.getAll()
    const data={
      count: sectors.length,
      results: sectors
    }
    return HttpResponse.json(data)
  })
];
