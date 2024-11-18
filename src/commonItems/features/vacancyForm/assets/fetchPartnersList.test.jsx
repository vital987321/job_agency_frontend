import { it, expect, describe, beforeAll, afterAll } from 'vitest'
import { db } from '../../../../test/mocks/db'
import { fetchPartnersList } from './fetchPartnersList'

describe('fetchPartnersList', () => {
    const newPartners=[]
    beforeAll(()=>{
        for (let i=0; i<2; i++){
            const partner=db.partner.create()
            newPartners.push(partner)
        }
    })
    afterAll(()=>{
        const newPartnersIds=newPartners.map((partner)=>partner.id)
        db.partner.deleteMany({where: {id:{in: newPartnersIds}}})
    })

    it('should return fetched list of partners', async() => {
        const partnersList=await fetchPartnersList()
        expect(partnersList.length).equals(2)
        newPartners.forEach((value, index)=>{
            expect(value.id).equals(partnersList[index].id)
        })
    })
})