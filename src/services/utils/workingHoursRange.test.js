import { describe, expect, it } from "vitest";
import { workingHoursRange } from "./workingHoursRange";

describe("workingHoursRange", () => {
    it('returns correct time range', () => {
        const hours_from = "08:30:35"
        const hours_to = "16:00"
        const result = workingHoursRange(hours_from, hours_to);
        expect(result).toEqual("08:30 - 16:00")
    });
    it("returns correct empty range if parameters are empty strings", () => {
      const hours_from = "";
      const hours_to = "";
      const result = workingHoursRange(hours_from, hours_to);
      expect(result).toEqual(" - ");
    });
    it("returns correct empty range if no parameters have been passed", () => {
      const result = workingHoursRange();
      expect(result).toEqual(" - ");
    });
});