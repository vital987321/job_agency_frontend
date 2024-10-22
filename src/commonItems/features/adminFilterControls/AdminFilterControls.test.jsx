import { render, screen } from "@testing-library/react"
import { AdminFilterControls } from "./AdminFilterControls"
import { it, expect, describe } from 'vitest'

describe('AdminFilterControls', () => {
    it('render filter button', () => {
        render(<AdminFilterControls/>)
        filterButton=screen.getByRole('button', {name: /Filter/i})

    })
})