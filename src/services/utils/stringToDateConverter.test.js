import { describe, expect, it } from "vitest"
import { stringToDateConverter } from "./stringToDateConverter";


describe("stringToDateConverter", () => {
    it('returns correct result', () => {
        const testDate = new Date('September 28, 2024')
        const testDateString = testDate.toString()
        const result = stringToDateConverter(testDateString);
        expect(result).toEqual('28-9-2024')
    })
    it("returns empty string if parameter has not been passed", () => {
        const result = stringToDateConverter()
      expect(result).toEqual("")
    });
});

