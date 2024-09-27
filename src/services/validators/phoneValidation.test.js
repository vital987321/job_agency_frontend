import { describe, expect, it } from "vitest";
import { phoneValidation } from "./phoneValidation";

describe('phoneValidation', ()=>{
    it('Positive scenario. phone is valid', ()=>{
        const phone='+420-777-888-999'
        const result=phoneValidation(phone)
        expect(result.phoneIsValid).toBe(true)
        expect(result.validatedPhone).toEqual('+420777888999')
        expect(result.phoneValidationErrors).toEqual('')
    })
    it("Phone 'tel:+420777888999'. Letters not allowed", ()=>{
        const phone='tel:+420777888999'
        const result=phoneValidation(phone)
        expect(result.phoneIsValid).toBe(false)
        expect(result.validatedPhone).toEqual('')
        expect(result.phoneValidationErrors).toEqual('Letters are not allowed')
    })
    it("Too long phone number.", ()=>{
        const phone='+420777888999111222333444555'
        const result=phoneValidation(phone)
        expect(result.phoneIsValid).toBe(false)
        expect(result.phoneValidationErrors).toEqual('Too long number')
    })
    it("phone parameter missing", ()=>{
        const result=phoneValidation()
        expect(result.phoneIsValid).toBe(false)
        expect(result.validatedPhone).toEqual('')
        expect(result.phoneValidationErrors).toEqual('phone is missing')
    })
})