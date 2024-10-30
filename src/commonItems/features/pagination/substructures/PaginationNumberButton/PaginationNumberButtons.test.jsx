import { queryAllByRole, render, screen } from "@testing-library/react";
import { PaginationNumberButtons } from "./PaginationNumberButtons";
import { it, expect, describe, vi } from 'vitest'
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { delay } from "msw";

describe('PaginationNumberButtons', () => {
    const setUrlState = vi.fn();
    const validProps = {
      responseData: {
        next: "http://127.0.0.1:8000/vacancy/?limit=10&offset=20",
        previous: "http://127.0.0.1:8000/vacancy/?limit=10&offset=10",
        count:'100',
      },
      listItemsLimit: "10",
      urlState: "http://localhost:3000/vacancies/?offset=10",
      setUrlState,
    };

    const renderComponent = (props) => {
        render( <BrowserRouter>
            <PaginationNumberButtons {...props} />
        </BrowserRouter>
        )
    }
    it("should not render component if itemsTotalNumber<=limit", () => {
        const props = {
          ...validProps,
          responseData: {
            count: "10",
          },
        };
        renderComponent(props)
        const buttons = screen.queryAllByRole('button')
        expect(buttons).toHaveLength(0)
    });
    it('should render 5 buttons', () => {
        renderComponent(validProps)
        const buttons = screen.queryAllByRole("button");
        expect(buttons).toHaveLength(5);
    })
    it("buttons should have context 1 to 5", () => {
      renderComponent(validProps);
        const buttons = screen.queryAllByRole("button");
        expect(buttons).toHaveLength(5);
        let buttonNumber = 1;
        buttons
          .forEach((button) => {
            expect(button).toHaveTextContent(buttonNumber.toString());
            buttonNumber++;
          })
    })
    it("buttons should have context 7 to 10", () => {
        const props = {
          ...validProps,
          urlState: "http://localhost:3000/vacancies/?offset=90",
        };
      renderComponent(props);
        const buttons = screen.queryAllByRole("button");
        expect(buttons).toHaveLength(4)
        let buttonNumber=7
        buttons.forEach((button) => {
            expect(button).toHaveTextContent(buttonNumber.toString())
            buttonNumber++;
        })
    })
    it('should rerponse correctly on button click', async  () => {
        renderComponent(validProps);
        const user = userEvent.setup()
        const button=screen.getByRole('button', {name: '3'})
        await user.click(button);
        expect(setUrlState).toHaveBeenCalledWith(
          "http://localhost:3000/vacancies/?offset=20"
        );
    })
})