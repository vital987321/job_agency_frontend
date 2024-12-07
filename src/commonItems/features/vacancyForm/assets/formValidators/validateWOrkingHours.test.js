import { validateWorkingHours } from "./validateWorkingHours"
import { it, expect, describe } from 'vitest'

describe('validateWorkingHours', () => {
    it('should return positive validation', () => {
        const workingHoursString="7:00:00"
        const validationObject=validateWorkingHours(workingHoursString)
        expect(validationObject.validation).toBe(true)
        expect(validationObject.errorMessage).toBe('')
    })
    it('should return error "Values must be numeric"', () => {
        const workingHoursString="a"
        const validationObject=validateWorkingHours(workingHoursString)
        expect(validationObject.validation).toBe(false)
        expect(validationObject.errorMessage).toBe("Values must be numeric")
    })
    it('should return error "Values must be integers"', () => {
        const workingHoursString="7.5:10:10"
        const validationObject=validateWorkingHours(workingHoursString)
        expect(validationObject.validation).toBe(false)
        expect(validationObject.errorMessage).toBe("Values must be integers")
    })
    it('should return error "Hours range: 0-23"', () => {
        const workingHoursString="25:10:10"
        const validationObject=validateWorkingHours(workingHoursString)
        expect(validationObject.validation).toBe(false)
        expect(validationObject.errorMessage).toBe("Hours range: 0-23")
    })
    it('should return error "Minutes range: 0-59"', () => {
        const workingHoursString="10:60:10"
        const validationObject=validateWorkingHours(workingHoursString)
        expect(validationObject.validation).toBe(false)
        expect(validationObject.errorMessage).toBe("Minutes range: 0-59")
    })
})