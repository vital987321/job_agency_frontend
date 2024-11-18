import { it, expect, describe, beforeAll, afterAll } from 'vitest'
import { db } from '../../../../test/mocks/db'
import { fetchSectorsList } from './fetchSectorsList'

describe('fetchSectorsList', () => {
    const newSectors=[]
    beforeAll(()=>{
        for (let i=0; i<2; i++){
            const sector=db.sector.create()
            newSectors.push(sector)
        }
    })
    afterAll(()=>{
        const newSectorsIds=newSectors.map((sector)=>sector.id)
        db.sector.deleteMany({where: {id:{in: newSectorsIds}}})
    })

    it('should return fetched list of sectors', async() => {
        const sectorsList=await fetchSectorsList()
        expect(sectorsList.length).equals(2)
        newSectors.forEach((value, index)=>{
            expect(value.label).equals(sectorsList[index].name)
        })
    })
})