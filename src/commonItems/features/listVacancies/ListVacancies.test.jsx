import { it, expect, describe, vi } from "vitest";
import { ListVacancies } from "./ListVacancies";
import { render } from "@testing-library/react";

describe("ListVacancies", () => {


  const setVacanciesResponseData = vi.fn();
  const validProps = {
    listVacanciesRequestUrl: "/vacancy",
    setVacanciesResponseData: setVacanciesResponseData,
    vacancyListChangedState: {},
  };

  const renderComponent = (props) => {
    render(<ListVacancies {...props} />);
  };

  it("should render a list of vacancies", () => {
    renderComponent(validProps);

  });
});
