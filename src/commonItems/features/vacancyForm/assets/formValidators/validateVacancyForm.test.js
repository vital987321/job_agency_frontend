import { it, expect, describe } from 'vitest'
import { validateVacancyForm } from './validateVacancyForm'
import {validateWorkingHours} from "./validateWorkingHours"

describe('validateVacancyForm', () => {
    const validData={
            name:"Python developer",
            salary: "100",
            location: "Prague",
            hours_from: "7:00:00",
            hours_to: "17:00:00"
        }

        vi.mock('./validateWorkingHours')
        vi.mocked(validateWorkingHours).mockReturnValue({validation:true})

    it('should return true validation', () => {
        const formValidation=validateVacancyForm(validData)
        expect(formValidation.validation).toBe(true)
    })
    it('should return name validation error ', () => {
        const invalidData={...validData,
            name:"",
        }
        const formValidation=validateVacancyForm(invalidData)
        expect(formValidation.validation).toBe(false)
        expect(formValidation.validationErrors.name).toBe("Vacancy name cannot be empty")
    })
    it('should return validation error "Salary must be a number" ', () => {
        const invalidData={...validData,
            salary:"huge",
        }
        const formValidation=validateVacancyForm(invalidData)
        expect(formValidation.validation).toBe(false)
        expect(formValidation.validationErrors.salary).toBe("Salary must be a number")
    })
    it('should return validation error "Salary cannot be negative"', () => {
        const invalidData={...validData,
            salary:"-10",
        }
        const formValidation=validateVacancyForm(invalidData)
        expect(formValidation.validation).toBe(false)
        expect(formValidation.validationErrors.salary).toBe("Salary cannot be negative")
    })
    it('should return validation error "Location not valid"', () => {
        const invalidData={...validData,
            location:"+",
        }
        const formValidation=validateVacancyForm(invalidData)
        expect(formValidation.validation).toBe(false)
        expect(formValidation.validationErrors.location).toBe("Location not valid")
    })
    it('should call validateWorkingHours', () => {
        const formValidation=validateVacancyForm(validData)
        expect(validateWorkingHours).toHaveBeenCalledTimes(2)
    })
})