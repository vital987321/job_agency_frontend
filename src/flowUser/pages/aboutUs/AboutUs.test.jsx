import { render, screen } from "@testing-library/react";
import { describe, it, expect} from "vitest";
import { AboutUs } from "./AboutUs";

describe("AboutUsComponent", ()=>{
    it("renders component", ()=>{
        render(<AboutUs/>)
        // screen.debug();
        expect(screen.getByTestId("about-us-component")).toHaveTextContent("About us")
    })
})