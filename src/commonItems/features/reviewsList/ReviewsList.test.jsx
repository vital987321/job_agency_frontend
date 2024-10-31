import { render, screen } from "@testing-library/react";
import { ReviewsList } from "./ReviewsList";
import { it, expect, describe, beforeAll, afterAll, vi } from 'vitest'
import { db } from "../../../test/mocks/db";
import { LIST_REVIEWS_REQUEST_URL } from "../../../data/constants";
import { delay } from "msw";


describe('ReviewsList', () => {
    const allRevies=[]
    const allUsers=[]
    beforeAll(()=>{
        const user=db.user.create()
        allUsers.push(user)
        const review = db.review.create({
            user: user,
            first_name: user.first_name,
            last_name: user.last_name,
        })
        allRevies.push(review)
    })
    afterAll(()=>{
        const reviewIds=allRevies.map(review=>review.id)
        db.review.deleteMany({where: {id: {in: reviewIds}}})
        const userIds=allUsers.map(user=>user.id)
        db.user.deleteMany({where: {id: {in: userIds}}})
    })

    const setReviewsResponseData=vi.fn()
    const validProps={
        listReviewsRequestUrl: LIST_REVIEWS_REQUEST_URL,
        setReviewsResponseData,
        staffUser:false,
        updateDataState:undefined
    }
    const renderComponent =(props)=>{
        render(<ReviewsList {...props} />)
    }

    it('should render reviews',async () => {
        renderComponent(validProps)
        await delay(1000)
        await screen.findByText(allUsers[0].first_name)
        screen.debug()
    })
})