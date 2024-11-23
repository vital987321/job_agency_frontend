import { render, screen, waitFor } from "@testing-library/react";
import { AdminVacancyForm } from "./AdminVacancyForm";
import { it, expect, describe, vi, beforeAll, afterAll } from 'vitest'
import { db } from "../../../test/mocks/db";
import { delay } from "msw";

describe('AdminVacancyForm', () => {
    var vacancyDb
    var partnerDb
    var sectorDb
    beforeAll(()=>{
        partnerDb=db.partner.create()
        sectorDb=db.sector.create()
        vacancyDb=db.vacancy.create({partner_data: partnerDb, sector: sectorDb.id})

    })
    afterAll(()=>{
        db.vacancy.delete({where:{id:vacancyDb.id}})
        db.partner.delete({where:{id:partnerDb.id}})
        db.sector.delete({where:{id:sectorDb.id}})

    })


    const setVacancyFormDisplayValue=vi.fn()
    const setVacancyListChangedState=vi.fn()

    const newVacancyProps={
            newVacancy: true,
            vacancyData: "",
            setVacancyFormDisplayValue,
            vacancyFormDisplayValue:"block",
            setVacancyListChangedState,
        }
    
    const getExistingVacancyProps=()=>{
        return({
            ... newVacancyProps,
            newVacancy: false,
            vacancyData:{...vacancyDb}
        })
    }

    const renderComponent=(props)=>{
        render(<AdminVacancyForm {...props}/>)
    }

    it('should render the form', () => {
        renderComponent(newVacancyProps)
        const form=screen.getByRole('form')
        expect(form).toBeInTheDocument()
    })

    it('should render form input fields', () => {
        renderComponent(newVacancyProps)
        const name=screen.getByRole('textbox', {name: /vacancy name/i})
        expect(name).toBeInTheDocument()
        const company=screen.getByRole('combobox', {name: /company/i})
        expect(company).toBeInTheDocument()
        const salary=screen.getByRole('textbox', {name: /salary/i})
        expect(salary).toBeInTheDocument()
        const location=screen.getByRole('textbox', {name: /location/i})
        expect(location).toBeInTheDocument()
        const contractType=screen.getByRole('combobox', {name: /contract type/i})
        expect(contractType).toBeInTheDocument()
        const gender=screen.getByRole('combobox', {name: /gender/i})
        expect(gender).toBeInTheDocument()
        const hoursFrom=screen.getByRole('textbox', {name: /hours from/i})
        expect(hoursFrom).toBeInTheDocument()
        const minutesFrom=screen.getByRole('textbox', {name: /minutes from/i})
        expect(minutesFrom).toBeInTheDocument()
        const hoursTo=screen.getByRole('textbox', {name: /hours to/i})
        expect(hoursTo).toBeInTheDocument()
        const minutesTo=screen.getByRole('textbox', {name: /minutes to/i})
        expect(minutesTo).toBeInTheDocument()
        const residence=screen.getByRole('combobox', {name: /residence/i})
        expect(residence).toBeInTheDocument()
        const visaAssistance=screen.getByRole('combobox', {name: /visa assistance/i})
        expect(visaAssistance).toBeInTheDocument()
        const sector=screen. getByRole('listbox', {name: /sector/i})
        expect(sector).toBeInTheDocument()
        const description=screen.getByRole('textbox', {name: /description/i})
        expect(description).toBeInTheDocument()
        const requirements=screen.getByRole('textbox', {name: /requirements/i})
        expect(requirements).toBeInTheDocument()
    })
    it('should render form buttons', () => {
        renderComponent(newVacancyProps)
        const submitButton=screen.getByRole('button', {name: /create/i})
        expect(submitButton).toBeInTheDocument()
        const closeButton=screen.getByRole('button', {name: /close/i})
        expect(closeButton).toBeInTheDocument()
    })
    it('should render correct initial values', async() => {
        renderComponent(getExistingVacancyProps())
        const name=screen.getByRole('textbox', {name: /vacancy name/i})
        expect(name.value).toEqual(vacancyDb.name)
        const company=screen.getByRole('combobox', {name: /company/i})
        waitFor(()=>expect(company.value).toEqual(vacancyDb.partner_data.company))
        const salary=screen.getByRole('textbox', {name: /salary/i})
        expect(parseInt(salary.value)).toEqual(vacancyDb.salary)
        const location=screen.getByRole('textbox', {name: /location/i})
        expect(location.value).toEqual(vacancyDb.location)
        const contractType=screen.getByRole('combobox', {name: /contract type/i})
        waitFor(()=>expect(contractType.value).toEqual(vacancyDb.contract_type))
        const gender=screen.getByRole('combobox', {name: /gender/i})
        expect(gender.value).toEqual(vacancyDb.gender)
        const hoursFrom=screen.getByRole('textbox', {name: /hours from/i})
        expect(hoursFrom.value).toEqual(vacancyDb.hours_from.split(":")[0])
        const minutesFrom=screen.getByRole('textbox', {name: /minutes from/i})
        expect(minutesFrom.value).toEqual(vacancyDb.hours_from.split(":")[1])
        const hoursTo=screen.getByRole('textbox', {name: /hours to/i})
        expect(hoursTo.value).toEqual(vacancyDb.hours_to.split(":")[0])
        const minutesTo=screen.getByRole('textbox', {name: /minutes to/i})
        expect(minutesTo.value).toEqual(vacancyDb.hours_to.split(":")[1])
        const residence=screen.getByRole('combobox', {name: /residence/i})
        waitFor(()=>expect(parseInt(residence.value)).toEqual(vacancyDb.residence_type))
        const visaAssistance=screen.getByRole('combobox', {name: /visa assistance/i})
        waitFor(()=>expect(visaAssistance.value).toEqual(vacancyDb.visa_assistance))
        await delay(1000)
        const sector=screen.getByRole('listbox', {name: /sector/i})
        waitFor(()=>expect(sector.children[0].innerHTML).toEqual(sectorDb.name))
        const description=screen.getByRole('textbox', {name: /description/i})
        expect(description.value).toEqual(vacancyDb.description)
        const requirements=screen.getByRole('textbox', {name: /requirements/i})
        expect(requirements.value).toEqual(vacancyDb.requirements)
    })


})