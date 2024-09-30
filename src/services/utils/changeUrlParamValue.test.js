import { describe, expect, it } from "vitest";
import { changeUrlParamValue } from "./changeUrlParamValue";

describe('changeUrlParam', ()=>{
    it("returns correct url string with updated paramValue",()=>{
        const url='http://testpage/?param1=value1&param2=value2'
        const paramKey='param1'
        const paramValue='valueA'
        const result=changeUrlParamValue(url, paramKey, paramValue)
        expect(result).toEqual('http://testpage/?param1=valueA&param2=value2')
    })
    it("removes param if paramValue is null",()=>{
        const url='http://testpage/?param1=value1&param2=value2'
        const paramKey='param1'
        const paramValue=null
        const result=changeUrlParamValue(url, paramKey, paramValue)
        expect(result).toEqual('http://testpage/?param2=value2')
    })
    it("removes queryparams if the only paramValue is null",()=>{
        const url='http://testpage/?param1=value1'
        const paramKey='param1'
        const paramValue=null
        const result=changeUrlParamValue(url, paramKey, paramValue)
        expect(result).toEqual('http://testpage/')
    })
})