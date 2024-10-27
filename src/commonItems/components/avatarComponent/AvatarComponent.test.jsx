import { it, expect, describe } from 'vitest'
import { AvatarComponent } from './AvatarComponent'
import { render, screen } from '@testing-library/react'

describe('AvatarComponent', () => {
    const validProps={
        size: 10,
        // userAvatarUrl
        title:'testAvatarTitle',
        iconSymbol: 'Q'
    }
    const renderComponent=(props)=>{
        render(<AvatarComponent {...props}/>)
    }
    it('should render avatar componet with correct title and icon', () => {
        renderComponent(validProps)
        expect(screen.getByTitle('testAvatarTitle')).toBeInTheDocument()
        expect(screen.getByText('Q')).toBeInTheDocument()
    })
})