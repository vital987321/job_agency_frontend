import { it, expect, describe, vi } from 'vitest'
import { PaginationComponent} from "./Pagination"
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

describe('PaginationComponent', () => {
    const setUrlState = vi.fn();
    const validProps = { 
      responseData: {
        next: "http://127.0.0.1:8000/vacancy/?limit=10&offset=30",
        previous: "http://127.0.0.1:8000/vacancy/?limit=10&offset=10",
        count:'100',
      },
      listItemsLimit: "10",
      urlState: "http://localhost:3000/vacancies/?offset=10",
      setUrlState,
    };
    

    const renderComponent=(props)=>{
        render(<BrowserRouter>
            <PaginationComponent {...props}/>
        </BrowserRouter>)
    }

    it('should render buttons "next", "previous", "1"', () => {
        renderComponent(validProps)
        const nextButton=screen.getByRole('button', {name: /next/i})
        expect(nextButton).toBeInTheDocument()
        const previousButton=screen.getByRole('button', {name: /previous/i})
        expect(previousButton).toBeInTheDocument() 
        const button1=screen.getByRole('button', {name: /1/i})
        expect(button1).toBeInTheDocument()  
    })
})