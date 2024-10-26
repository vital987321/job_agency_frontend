import { it, expect, describe, vi, beforeAll, afterAll } from "vitest";
import { ListVacancies } from "./ListVacancies";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { db } from "../../../test/mocks/db";
import { http, HttpResponse } from "msw";
import { AuthProvider } from "../../../context/AuthProvider.jsx";
import { BrowserRouter} from 'react-router-dom';
import { server } from "../../../test/mocks/server.js";
import { FETCH_SERVER_URL } from "../../../test/testConstants.js";

describe("ListVacancies", () => {
    let allVacancies=[]

    beforeAll(()=>{
            const vacancy=db.vacancy.create()
            allVacancies.push(vacancy)
    })
    afterAll(()=>{
        const vacanciesIds=allVacancies.map((vacancy)=>vacancy.id)
        db.vacancy.deleteMany({where: {id: {in: vacanciesIds}}})
        allVacancies=[]
    })

  const validProps = {
    listVacanciesRequestUrl: "./vacancy",

  };

  const renderComponent = (props) => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <ListVacancies {...props} />
            </AuthProvider>
        </BrowserRouter>
    );
    return {
        getLoadingMessage: ()=> screen.getByRole('statusBlock', {name: /loading/i})
    }
  };
  it('should redner loading message', () => {
    const {getLoadingMessage}=renderComponent(validProps)
    expect(getLoadingMessage()).toBeInTheDocument()    
  })

  it("should render vacancy's parameters", async () => {
    const {getLoadingMessage}=renderComponent(validProps);
    await waitForElementToBeRemoved(getLoadingMessage)
    const vacancy=allVacancies[0]

    const name=screen.getByText(RegExp(vacancy.name.slice(0,25)))
    expect(name).toBeInTheDocument()
    const location=screen.getByText(vacancy.location)
    expect(location).toBeInTheDocument()
    const gender=screen.getByText(vacancy.gender)
    expect(gender).toBeInTheDocument()
    const contractType=screen.getByText(vacancy.contract_type)
    expect(contractType).toBeInTheDocument()
    const link=screen.getByRole('link', {name: /details/i})
    expect(link.href).toMatch(new RegExp ('vacancies/'+vacancy.id))
  });
  it('should render multiple vacancies', async () => {
    const newVacancy=db.vacancy.create({name:'uniqueTestName', location:"uniqueTestLocation"})
    allVacancies.push(newVacancy)
    const {getLoadingMessage}=renderComponent(validProps);
    await waitForElementToBeRemoved(getLoadingMessage)
    allVacancies.forEach(vacancy=>{
        const name=screen.getByText(RegExp(vacancy.name.slice(0,25)))
        expect(name).toBeInTheDocument()
        const location=screen.getByText(vacancy.location)
        expect(location).toBeInTheDocument()
    })
  })
  it('should render error message on fetching error', async () => {
    server.use(http.get(FETCH_SERVER_URL+'/vacancy', HttpResponse.error()));
    const {getLoadingMessage}=renderComponent(validProps);
    await waitForElementToBeRemoved(getLoadingMessage)
    const message=screen.getByRole('statusBlock', {name: /error/i})
    expect(message).toBeInTheDocument()
  })
});
