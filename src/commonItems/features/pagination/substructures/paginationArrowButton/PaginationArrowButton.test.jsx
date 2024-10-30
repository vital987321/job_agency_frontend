import { render, screen } from "@testing-library/react";
import { PaginationArrowButton } from "./PaginationArrowButton";
import { it, expect, describe, vi } from 'vitest'
import userEvent from "@testing-library/user-event";

describe('PaginationArrowButton', () => {
    const setUrlState=vi.fn()
    const validProps = {
      direction: "next",
      responseData: {
        next: "http://127.0.0.1:8000/vacancy/?limit=10&offset=20",
        previous: "http://127.0.0.1:8000/vacancy/?limit=10&offset=10",
      },
      urlState:
        "http://localhost:3000/vacancies",
      setUrlState,
    };
    const renderComponent=(props)=>{
        render(<PaginationArrowButton {...props} />)
        return {
          nextButton: screen.queryByRole("button", { name: /next/i }),
          previousButton: screen.queryByRole("button", { name: /previous/i }),
        };
    }

    it('should render "next" button', () => {
        const { nextButton }=renderComponent(validProps)
        expect(nextButton).toBeInTheDocument;
    })
    it('should render "previous" button', () => {
        const props = {
          ...validProps,
          direction: "previous",
        };
        const { previousButton } = renderComponent(props);
        expect(previousButton).toBeInTheDocument()
    });
    it('should not render "previous" button if direction is next', () => {
        const { previousButton } = renderComponent(validProps);
        expect(previousButton).not.toBeInTheDocument();
    });
    it('should not render "next" button if there is no coresponding url in responseData', () => {
      const props = {
        ...validProps,
        responseData: { next: null },
      };
      const { nextButton } = renderComponent(props);
      expect(nextButton).not.toBeInTheDocument();
    });
    it('should not render "previous" button if there is no coresponding url in responseData', () => {
        const props = {
          ...validProps,
          direction: "previous",
          responseData:{previous: null}
        };
        const { previousButton } = renderComponent(props);
        expect(previousButton).not.toBeInTheDocument();
    });
    it('should react correctly on click', async () => {
        const { nextButton } = renderComponent(validProps);
        const user = userEvent.setup()
        await user.click(nextButton)
        expect(setUrlState).toHaveBeenCalledOnce();
         expect(setUrlState).toHaveBeenCalledWith(
           "http://localhost:3000/vacancies?offset=20"
         );
    })
})