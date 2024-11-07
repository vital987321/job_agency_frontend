import { VacancyData } from "./VacancyData";
import { it, expect, describe, beforeAll, afterAll, vi } from "vitest";
import { db } from "../../../test/mocks/db";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../../context/AuthProvider";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

describe("VacancyData", () => {
  const allVacancies = [];
  const allUsers = [];
  let userDb;
    let vacancyDb;
 vi.mock("react-router-dom");
 
 beforeAll(() => {
     userDb = db.user.create();
     vacancyDb = db.vacancy.create();
     allVacancies.push(vacancyDb);
     vi.mocked(useParams).mockReturnValue({ vacancy_id: vacancyDb.id });   
     
  });
  afterAll(() => {
    const vacanciesIds = allVacancies.map((vacancy) => vacancy.id);
    db.vacancy.deleteMany({ where: { id: { in: vacanciesIds } } });
    const userIds = allUsers.map((user) => user.id);
    db.user.deleteMany({ where: { id: { in: userIds } } });
  });

  

  vi.mock("../../../hooks/useAuth");
  vi.mocked(useAuth).mockReturnValue({ auth: { user_id: "1" } });

  const setVacancyData = vi.fn();
  const setUserData = vi.fn();

  const validProps = {
    setVacancyData,
    userData: { favourites: [] },
    setUserData,
  };

  const renderComponent = () => {
    render(
      <AuthProvider>
        <VacancyData {...validProps} />
      </AuthProvider>
    );
  };

  it("should render vacancy", async () => {
    renderComponent();
    const header = await screen.findByRole("heading", { name: vacancyDb.name });
    expect(header).toBeInTheDocument();
    const vacancyId = screen.getByTestId("vacancyId");
    expect(vacancyId).toHaveTextContent(vacancyDb.id);
    const location = screen.getByTestId("location");
    expect(location).toHaveTextContent(vacancyDb.location);
  });
  it("should render favouriteButton", async () => {
    renderComponent();
    const button = await screen.findByRole("button", { title: /favourite/i });
    expect(button).toBeInTheDocument();
  });
});
