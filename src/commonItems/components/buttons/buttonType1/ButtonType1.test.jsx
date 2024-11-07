import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ButtonType1 } from "./ButtonType1";
import userEvent from "@testing-library/user-event";

describe("ButtonType1", ()=>{
    it("renders without props correctly", ()=>{
        render(<ButtonType1/>)
        expect(screen.getByText("Button")).toBeInTheDocument()
    })
    it('renders with value correctly', ()=>{
        render(<ButtonType1 value="Submit"/>)
        expect(screen.getByText("Submit")).toBeInTheDocument()
    })
    it('renders with correct class', ()=>{
        render(<ButtonType1 strength='2'/>)
        const result=screen.getByRole("button")
        expect(result).toHaveClass(/buttonStrength2/i)
    })
    it('calls clickHandler on click', async ()=>{
        const user=userEvent.setup()
        const clickHandler=vi.fn()
        render(<ButtonType1 value="Submit" onClickHandler={clickHandler} />)
        const testedButton=screen.getByText('Submit')
        await user.click(testedButton)
        expect(clickHandler).toHaveBeenCalledOnce()
    })
})