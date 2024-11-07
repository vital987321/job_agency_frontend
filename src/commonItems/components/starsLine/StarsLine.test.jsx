import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StarsLine } from "./StarsLine";

describe("StarsLine", () => {
    it("returns 5 empty stars on rating=0", () => {
        const rating=0
        render(<StarsLine rating={rating} />)
        const result = screen.getAllByRole("img")
        expect(result).toHaveLength(5)
        result.forEach((value)=>{
          expect(value).toHaveAttribute('src', expect.stringContaining('white'))
        })
    });
    it('returns 3 full stars and 2 empty stars on rating=3.6', ()=>{
      const rating=3.6
      render(<StarsLine rating={rating} />)
      const result = screen.getAllByRole("img")
      expect(result).toHaveLength(5)
      result.slice(0,3).forEach((value)=>{
        expect(value).toHaveAttribute('src', expect.stringContaining('yellow'))
      })
      result.slice(3,6).forEach((value)=>{
        expect(value).toHaveAttribute('src', expect.stringContaining('white'))
      })
    });
    it('returns 4 full stars and 1 empty stars on rating=3.6 and roundRating=true', ()=>{
      const rating=3.6
      render(<StarsLine rating={rating} roundRating={true} />)
      const result = screen.getAllByRole("img")
      expect(result).toHaveLength(5)
      result.slice(0,4).forEach((value)=>{
        expect(value).toHaveAttribute('src', expect.stringContaining('yellow'))
      })
      result.slice(4,6).forEach((value)=>{
        expect(value).toHaveAttribute('src', expect.stringContaining('white'))
      })
    });
})