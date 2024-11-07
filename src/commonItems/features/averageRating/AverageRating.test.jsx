import { render, screen } from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import { AverageRating } from './AverageRaring'

describe('AverageRating', () => {

    const validData={
        results: [{avg_rating:"4.666"},]
    }
    const loadingData={}

    const renderComponet=(data)=>{
        render (<AverageRating reviewsResponseData={data}/>)
    }

    it('should render rating component', () => {
        renderComponet(validData)
        expect(screen.getByText(/rating/i)).toBeInTheDocument()
    })
    it('should display rating rounded to 4.7', () => {
        renderComponet(validData)
        expect(screen.getByText(/4.7/i)).toBeInTheDocument()
    })
    it('should render star icons', () => {
        renderComponet(validData)
        const stars=screen.getAllByAltText("*")
        expect(stars).toHaveLength(5)
    })

    it('should render loading message', () => {
        renderComponet(loadingData)
        const message=screen.getByText(/loading/i)
        expect(message).toBeInTheDocument()
    })
})