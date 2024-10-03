import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StarsLine } from "./StarsLine";

describe("StarsLine", () => {
    it("returns 5 empty stars on rating=0", () => {
        render(<StarsLine rating={1} />)
        const result = screen.getAllByRole("img")
        screen.debug()
        expect(result).toHaveLength(5)
        const result2 = screen.get("img", {
          source: "/src/assets/svg/rating_star_icon_yellow.svg",
        });
        expect(result2).toHaveLength(1);
    })
})