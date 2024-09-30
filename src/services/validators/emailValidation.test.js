import { describe, it, expect} from "vitest";
import { emailValidation } from "./emailValidation";

describe('emailValidation',()=>{
    it('Positive scenario. email is Valid',()=>{
        const email='margaret@gmail.com'
        const result=emailValidation(email)
        expect(result.isValid).toBe(true)
        expect(result.validationErrors).toEqual("")
    })
    it('email margaretgmail.com is not valid', ()=>{
        const email='margaretgmail.com'
        const result=emailValidation(email)
        expect(result.isValid).toBe(false)
        expect(result.validationErrors).toEqual("Enter correct email address")
    })
    it('email margaret@gmail is not valid', ()=>{
        const email='margaretgmail'
        const result=emailValidation(email)
        expect(result.isValid).toBe(false)
        expect(result.validationErrors).toEqual("Enter correct email address")
    })
    it('email margaret@gmail is not valid', ()=>{
        const result=emailValidation()
        expect(result.isValid).toBe(false)
        expect(result.validationErrors).toEqual("Enter correct email address")
    })
})