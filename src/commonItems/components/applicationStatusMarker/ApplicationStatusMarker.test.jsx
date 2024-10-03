import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ApplicationStatusMarker } from "./ApplicationStatusMarker";

describe("ApplicationStatusMarker", () => {
    it('returns correct results without props', () => {
        render(<ApplicationStatusMarker />);
        screen.debug()
        const result = screen.getByTestId("status-element");
        // expect(result).toHaveTextContent("⬤");
        expect(result).toHaveClass(/statusPending/i)
    })
    it("returns correct results with props status=Rejected", () => {
      render(<ApplicationStatusMarker status="Rejected"/>);
      screen.debug();
      const result = screen.getByTestId("status-element");
      expect(result).toHaveClass(/statusRejected/i);
    });
    it("returns correct results with props status=Approved", () => {
      render(<ApplicationStatusMarker status="Approved" />);
      screen.debug();
      const result = screen.getByTestId("status-element");
      expect(result).toHaveClass(/statusApproved/i);
    });
});