import { render, screen } from "@testing-library/react"
import { AdminFilterControls } from "./AdminFilterControls"
import { it, expect, describe, vi } from 'vitest'
import userEvent from "@testing-library/user-event";

describe('AdminFilterControls', () => {
    const filterButtonHandler=vi.fn();
    const resetFiltersHandler=vi.fn();
    const validProps={
        filterButtonHandler,
        resetFiltersHandler,
        onPageListItemsAmount: '5',
        onChangeListItemsAmount: vi.fn(),
        displayResetFilterButton: false,
    };

    const propsWithReset={
        ...validProps,
        displayResetFilterButton: true
    }

    const renderComponent=(propsObject)=>{
        render(<AdminFilterControls {...propsObject}/>)

        return{
            user: userEvent.setup(),
            getFilterButton: ()=>screen.getByRole('button', {name: (content, element) => content.startsWith('Filter') }),
            getResetFilterButton: ()=> screen.queryByRole('button', {name: /reset filter/i})
        }
    }

    it('should render filter button', () => {
        const {getFilterButton}=renderComponent(validProps)
        expect (getFilterButton()).toBeInTheDocument()
    })
    it('should render "on Page" component ', () => {
        renderComponent(validProps)
        const onPage=screen.getByLabelText(/on page/i)
        expect (onPage).toBeInTheDocument()
    })
    it('should not render Reset Filter button if displayResetFilterButton=false', () => {
        const {getResetFilterButton}=renderComponent(validProps)
        expect(getResetFilterButton()).not.toBeInTheDocument()
    })
    it('should render Reset Filter button if displayResetFilterButton=true', () => {
        const {getResetFilterButton}=renderComponent(propsWithReset)
        expect(getResetFilterButton()).toBeInTheDocument()
    })
    it('should run handler on Filter button click', async () => {
        const {user, getFilterButton}=renderComponent(validProps)
        await user.click(getFilterButton())
        expect(filterButtonHandler).toHaveBeenCalledOnce()
    })
    it('should run handler on Reset Filter button click', async () => {
        const {user, getResetFilterButton}=renderComponent(propsWithReset)
        await user.click(getResetFilterButton())
        expect(resetFiltersHandler).toHaveBeenCalledOnce()
    })

})