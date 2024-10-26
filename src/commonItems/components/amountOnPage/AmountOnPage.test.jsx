import { render, screen } from "@testing-library/react";
import { AmountOnPage } from "./AmountOnPage";
import { it, expect, describe, vi } from 'vitest'
import userEvent from "@testing-library/user-event";
import { delay } from "msw";

describe('AmountOnPage', () => {
    const onChangeListItemsAmount=vi.fn()

    const validProps={
        onPageListItemsAmount:'10',
        onChangeListItemsAmount
    }

    const renderComponent=(props)=>{
        render(
            <AmountOnPage {...props}/>
        )
        return(
            {
                selectElement: screen.getByRole('combobox')
            }
        )
    }

    it('should render component with correct initial value', () => {
        const {selectElement} = renderComponent(validProps)
        expect(selectElement).toBeInTheDocument()
        expect(selectElement).toHaveValue(validProps.onPageListItemsAmount)
    })
    it('should have options', () => {
        renderComponent(validProps)
        const optionslist=screen. getAllByRole('option')
        expect(optionslist.length).toBeGreaterThanOrEqual(1)
    })
    it('should call onChangeHandler on selecting an option', async () => {
        const {selectElement} = renderComponent(validProps)
        const user=userEvent.setup()
        const option=screen.getByRole('option', {name: '50'})
        expect(option).toBeInTheDocument()
        await user.selectOptions(selectElement, option)
        expect(onChangeListItemsAmount).toHaveBeenCalledOnce()

    })
})