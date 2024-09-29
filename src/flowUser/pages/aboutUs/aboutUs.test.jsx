import { render, screen } from "@testing-library/react";
import { describe, it, expect} from "vitest";
import { AboutUsComponent } from "./aboutUsComponent";

describe("AboutUsComponent", ()=>{
    it("renders component", ()=>{
        render(<AboutUsComponent/>)
        // screen.debug();
        expect(screen.getByTestId("about-us-component")).toHaveTextContent("About us")
    })
})