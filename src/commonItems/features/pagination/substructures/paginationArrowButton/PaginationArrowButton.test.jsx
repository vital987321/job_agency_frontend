import { render, screen } from "@testing-library/react";
import { PaginationArrowButton } from "./PaginationArrowButton";
import { it, expect, describe, vi } from 'vitest'

describe('PaginationArrowButton', () => {
    const setUrlState=vi.fn()
    const validProps={
            direction: 'next',
            responseData:{
                next: "http://127.0.0.1:8000/vacancy/?limit=10&offset=10",
                previous: null,
            },
            urlState: 'http://localhost:3000/vacancies?salary_gte=1000&salary_lte=149000',
            setUrlState,
        }
    const renderComponent=(props)=>{
        
        render(<PaginationArrowButton {...props}/>)
    }

    it('should render "next" button', () => {
        renderComponent(validProps)
        nextButton=screen.getByRole('button', {name: /next/i})
    })
})