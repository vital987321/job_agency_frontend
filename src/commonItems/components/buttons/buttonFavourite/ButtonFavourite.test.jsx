import { render, screen, waitFor } from "@testing-library/react";
import { ButtonFavourite} from "./ButtonFavourite";
import { it, expect, describe, vi, afterEach, beforeAll, afterAll } from 'vitest'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../../context/AuthProvider";
import { useAuth } from "../../../../hooks/useAuth";
import { db } from "../../../../test/mocks/db";
import userEvent from "@testing-library/user-event";
import { delay } from "msw";

describe('ButtonFavourite', () => {
    let userDbData
    beforeAll(()=>{
        userDbData=db.user.create()
    })
    afterAll(()=>db.user.delete({where: {id: userDbData.id}}))
    
    afterEach(vi.restoreAllMocks)

    const setUserData=vi.fn()
    const validProps={
        userData: {favourites:[]},
        setUserData,
        vacancyId:'1',
    }
    const MockedUser={
        auth: {user_id: '1'}
    }
    const MockedNoUser={auth:{}}
    vi.mock('../../../../hooks/useAuth')
   
    const renderComponent=({props, user})=>{
        vi.mocked(useAuth).mockReturnValue(user)
        render(
            <BrowserRouter>
                <AuthProvider>
                    <ButtonFavourite {...props}/>
                </AuthProvider>
            </BrowserRouter>
        )
    }
    it('should not render the component if user in not authentecated', () => {
        const noUserProps={
            ...validProps,
            userData: {},
        }
        renderComponent({props: noUserProps, user:MockedNoUser})
        const button=screen.queryByRole('button')
        expect(button).not.toBeInTheDocument()

    })
    it('should render the component if user is authenticated', () => {
        renderComponent({props:validProps, user: MockedUser})
        const button=screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('title')
    })
    it('should have correct title if vacancy is not in favourites', () => {
        renderComponent({props:validProps, user: MockedUser})
        const button=screen.getByRole('button')
        expect(button).toHaveAttribute('title', "Add to Favourites")
    })
    it('should have correct title if vacancy is in favourites', () => {
        const props={
            ...validProps,
            userData: {favourites:['1']},
        }
        renderComponent({props:props, user: MockedUser})
        const button=screen.getByRole('button')
        expect(button).toHaveAttribute('title', "Remove from Favourites")
    })
    it.only('should have correct behaviour on click', async  () => {
        const props={
            ...validProps,
            userData: userDbData,
        }
        const authUser={auth:{user_id: userDbData.id}}
        renderComponent({props, user: authUser})

        const addButton=screen.getByTitle(/add to favourites/i)
        expect(addButton).toBeInTheDocument()

        const user=userEvent.setup()
        await user.click(addButton)
        const removeButton=await screen.findByTitle(/remove from favourites/i)
        expect(removeButton).toBeInTheDocument()
        expect(setUserData).toHaveBeenCalled()
    })
})