import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { AdminVacancyForm } from "./AdminVacancyForm";
import { it, expect, describe, vi, beforeAll, afterAll } from "vitest";
import { db } from "../../../test/mocks/db";
import { delay } from "msw";
import {
  CONTRACT_TYPE,
  GENDER_LIST,
  RESIDENCE_TYPES,
} from "../../../data/constants";
import userEvent from "@testing-library/user-event";

describe("AdminVacancyForm", () => {
  var vacancyDb;
  var partnerDb;
  var sectorDb;
  beforeAll(() => {
    partnerDb = db.partner.create();
    sectorDb = db.sector.create();
    vacancyDb = db.vacancy.create({
      partner_data: partnerDb,
      sector: [sectorDb.id],
    });
  });
  afterAll(() => {
    db.vacancy.delete({ where: { id: vacancyDb.id } });
    db.partner.delete({ where: { id: partnerDb.id } });
    db.sector.delete({ where: { id: sectorDb.id } });
  });

  const setVacancyFormDisplayValue = vi.fn();
  const setVacancyListChangedState = vi.fn();
  const setVacancyData = vi.fn();

  const newVacancyProps = {
    newVacancy: true,
    vacancyData: "",
    setVacancyFormDisplayValue,
    vacancyFormDisplayValue: "block",
    setVacancyListChangedState,
    setVacancyData,
  };

  const getExistingVacancyProps = () => {
    return {
      ...newVacancyProps,
      newVacancy: false,
      vacancyData: { ...vacancyDb },
    };
  };

  const renderComponent = (props) => {
    render(<AdminVacancyForm {...props} />);
  };

  it("should render the form", () => {
    renderComponent(newVacancyProps);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });

  describe("AdminVacancyForm - Correct input fields", () => {
    it("should render form input fields", () => {
      renderComponent(newVacancyProps);
      const name = screen.getByRole("textbox", { name: /vacancy name/i });
      expect(name).toBeInTheDocument();
      const company = screen.getByRole("combobox", { name: /company/i });
      expect(company).toBeInTheDocument();
      const salary = screen.getByRole("textbox", { name: /salary/i });
      expect(salary).toBeInTheDocument();
      const location = screen.getByRole("textbox", { name: /location/i });
      expect(location).toBeInTheDocument();
      const contractType = screen.getByRole("combobox", {
        name: /contract type/i,
      });
      expect(contractType).toBeInTheDocument();
      const gender = screen.getByRole("combobox", { name: /gender/i });
      expect(gender).toBeInTheDocument();
      const hoursFrom = screen.getByRole("textbox", { name: /hours from/i });
      expect(hoursFrom).toBeInTheDocument();
      const minutesFrom = screen.getByRole("textbox", {
        name: /minutes from/i,
      });
      expect(minutesFrom).toBeInTheDocument();
      const hoursTo = screen.getByRole("textbox", { name: /hours to/i });
      expect(hoursTo).toBeInTheDocument();
      const minutesTo = screen.getByRole("textbox", { name: /minutes to/i });
      expect(minutesTo).toBeInTheDocument();
      const residence = screen.getByRole("combobox", { name: /residence/i });
      expect(residence).toBeInTheDocument();
      const visaAssistance = screen.getByRole("combobox", {
        name: /visa assistance/i,
      });
      expect(visaAssistance).toBeInTheDocument();
      const sector = screen.getByRole("listbox", { name: /sector/i });
      expect(sector).toBeInTheDocument();
      const description = screen.getByRole("textbox", { name: /description/i });
      expect(description).toBeInTheDocument();
      const requirements = screen.getByRole("textbox", {
        name: /requirements/i,
      });
      expect(requirements).toBeInTheDocument();
    });
  });

  describe("AdminVacancyForm - Buttons", () => {
    it("should render form buttons", () => {
      renderComponent(newVacancyProps);
      const submitButton = screen.getByRole("button", { name: /create/i });
      expect(submitButton).toBeInTheDocument();
      const closeButton = screen.getByRole("button", { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });
    it("should render save button on editing existing vacancy", () => {
      renderComponent(getExistingVacancyProps());
      const submitButton = screen.getByRole("button", { name: /save/i });
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("AdminVacancyForm - Default values", () => {
    it("should should render correct initial name", () => {
      renderComponent(getExistingVacancyProps());
      const name = screen.getByRole("textbox", { name: /vacancy name/i });
      expect(name.value).toEqual(vacancyDb.name);
    });

    it("should should render correct initial company", async () => {
      renderComponent(getExistingVacancyProps());
      const optionCompany = await screen.findByRole("option", {
        name: partnerDb.company,
      });
      waitFor(() => expect(optionCompany.selected).toBe(true));
    });

    it("should should render correct initial salary", () => {
      renderComponent(getExistingVacancyProps());
      const salary = screen.getByRole("textbox", { name: /salary/i });
      expect(parseInt(salary.value)).toEqual(vacancyDb.salary);
    });

    it("should should render correct initial location", () => {
      renderComponent(getExistingVacancyProps());
      const location = screen.getByRole("textbox", { name: /location/i });
      expect(location.value).toEqual(vacancyDb.location);
    });

    it("should should render correct initial contract type", async () => {
      renderComponent(getExistingVacancyProps());
      const selectedOption = await screen.findByRole("option", {
        name: vacancyDb.contract_type,
      });
      waitFor(() => expect(selectedOption.selected).toBe(true));
    });

    it("should should render correct initial gender", async () => {
      renderComponent(getExistingVacancyProps());
      const selectedOption = await screen.findByRole("option", {
        name: vacancyDb.gender,
      });
      waitFor(() => expect(selectedOption.selected).toBe(true));
    });

    it("should should render correct initial hoursFrom", () => {
      renderComponent(getExistingVacancyProps());
      const hoursFrom = screen.getByRole("textbox", { name: /hours from/i });
      expect(hoursFrom.value).toEqual(vacancyDb.hours_from.split(":")[0]);
    });

    it("should should render correct initial hoursFrom", () => {
      renderComponent(getExistingVacancyProps());
      const hoursFrom = screen.getByRole("textbox", { name: /hours from/i });
      expect(hoursFrom.value).toEqual(vacancyDb.hours_from.split(":")[0]);
    });

    it("should should render correct initial minutesFrom", () => {
      renderComponent(getExistingVacancyProps());
      const minutesFrom = screen.getByRole("textbox", {
        name: /minutes from/i,
      });
      expect(minutesFrom.value).toEqual(vacancyDb.hours_from.split(":")[1]);
    });

    it("should should render correct initial hoursTo", () => {
      renderComponent(getExistingVacancyProps());
      const hoursTo = screen.getByRole("textbox", { name: /hours to/i });
      expect(hoursTo.value).toEqual(vacancyDb.hours_to.split(":")[0]);
    });

    it("should should render correct initial minutesTo", () => {
      renderComponent(getExistingVacancyProps());
      const minutesTo = screen.getByRole("textbox", { name: /minutes to/i });
      expect(minutesTo.value).toEqual(vacancyDb.hours_to.split(":")[1]);
    });

    it("should should render correct initial residence", async () => {
      renderComponent(getExistingVacancyProps());
      const selectedOption = await screen.findByRole("option", {
        name: RESIDENCE_TYPES[vacancyDb.residence_type],
      });
      waitFor(() => expect(selectedOption.selected).toBe(true));
    });

    it("should render correct initial visa assistance", async () => {
      renderComponent(getExistingVacancyProps());
      const visaAssistance = screen.getByRole("combobox", {
        name: /visa assistance/i,
      });
      const expectedOption = vacancyDb.visa_assistance ? "Yes" : "No";
      waitFor(() =>
        expect(
          visaAssistance.options[visaAssistance.options.selectedIndex].innerHTML
        ).toEqual(expectedOption)
      );
    });

    it("should render correct initial sectors", async () => {
      renderComponent(getExistingVacancyProps());
      const selectedOption = await screen.findByRole("option", {
        name: sectorDb.name,
      });
      waitFor(() => expect(selectedOption.selected).toBe(true));
    });

    it("should render correct initial description", () => {
      renderComponent(getExistingVacancyProps());
      const description = screen.getByRole("textbox", { name: /description/i });
      expect(description.value).toEqual(vacancyDb.description);
    });

    it("should render correct initial requirements", () => {
      renderComponent(getExistingVacancyProps());
      const requirements = screen.getByRole("textbox", {
        name: /requirements/i,
      });
      expect(requirements.value).toEqual(vacancyDb.requirements);
    });
  });

  describe("AdminVacancyForm - Correct dropdown list", () => {
    it("should provide correct select options for company input field", async () => {
      renderComponent(getExistingVacancyProps());
      await waitFor(() =>
        expect(
          screen.getByRole("option", { name: partnerDb.company })
        ).toBeInTheDocument()
      );
      const company = screen.getByRole("combobox", { name: /company/i });
      expect(company.children.length).toEqual(db.partner.getAll().length + 1);
      const dbCompaniesNames = db.partner.getAll().map((item) => item.company);
      for (let i = 1; i < company.childNodes.length; i++) {
        expect(dbCompaniesNames).toContain(company.childNodes[i].innerHTML);
      }
    });
    it("should provide correct select options for contract type input field", async () => {
      renderComponent(getExistingVacancyProps());
      const contractType = screen.getByRole("combobox", {
        name: /contract type/i,
      });
      expect(contractType.children.length).toEqual(3);
      for (let item of contractType.childNodes) {
        expect(CONTRACT_TYPE).toContain(item.innerHTML);
      }
    });
    it("should provide correct select options for Gender input field", () => {
      renderComponent(getExistingVacancyProps());
      const gender = screen.getByRole("combobox", { name: /gender/i });
      expect(gender.children.length).toEqual(GENDER_LIST.length);
      for (let item of gender.childNodes) {
        expect(GENDER_LIST).toContain(item.innerHTML);
      }
    });
    it("should provide correct select options for Residence input field", () => {
      renderComponent(getExistingVacancyProps());
      const residence = screen.getByRole("combobox", { name: /residence/i });
      const residanceList = Object.values(RESIDENCE_TYPES);
      expect(residence.children.length).toEqual(residanceList.length);
      for (let item of residence.childNodes) {
        expect(residanceList).toContain(item.innerHTML);
      }
    });
    it("should provide correct list options for Seclor input field", async () => {
      renderComponent(newVacancyProps);
      const sector = screen.getByRole("listbox", { name: /sector/i });
      await waitFor(() =>
        expect(sector.children.length).toEqual(db.sector.getAll().length)
      );
      const sectorsNamesList = db.sector.getAll().map((item) => item.name);
      for (let item of sector.childNodes) {
        expect(sectorsNamesList).toContain(item.innerHTML);
      }
    });
  });

  describe("AdminVacancyForm - User Actions", () => {
    it('should change the selected option in "Company" field', async () => {
      renderComponent(newVacancyProps);
      const optionCompany = await screen.findByRole("option", {
        name: partnerDb.company,
      });
      const selectCompany = screen.getByRole("combobox", { name: /company/i });
      expect(optionCompany.selected).toBe(false);
      const user = userEvent.setup();
      await user.selectOptions(selectCompany, partnerDb.company);
      expect(optionCompany.selected).toBe(true);
    });

    it("should call setVacancyFormDisplayValue function on closeButton click", async () => {
      renderComponent(newVacancyProps);
      const closeButton = screen.getByRole("button", { name: /close/i });
      const user = userEvent.setup();
      await user.click(closeButton);
      expect(setVacancyFormDisplayValue).toHaveBeenCalledWith("none");
    });
  });

  describe("AdminVacancyForm - Validation", () => {
    it('should throw "vacancy name empty" message', async () => {
      renderComponent(newVacancyProps);
      const submitButton = screen.getByRole("button", { name: /create/i });
      const user = userEvent.setup();
      await user.click(submitButton);
      const nameValidationError = screen.getByText(
        /vacancy name cannot be empty/i
      );
      expect(nameValidationError).toBeInTheDocument();
    });

    it('should throw message "Salary must be a number"', async () => {
      renderComponent(newVacancyProps);
      const salary = screen.getByRole("textbox", { name: /salary/i });
      const user = userEvent.setup();
      await user.type(salary, "a");
      const submitButton = screen.getByRole("button", { name: /create/i });
      await user.click(submitButton);
      const salaryValidationError = screen.getByText(
        /salary must be a number/i
      );
      expect(salaryValidationError).toBeInTheDocument();
    });

    it('should throw message "Salary cannot be negative"', async () => {
      renderComponent(newVacancyProps);
      const salary = screen.getByRole("textbox", { name: /salary/i });
      const user = userEvent.setup();
      await user.type(salary, "-4");
      const submitButton = screen.getByRole("button", { name: /create/i });
      await user.click(submitButton);
      const salaryValidationError = screen.getByText(
        /salary cannot be negative/i
      );
      expect(salaryValidationError).toBeInTheDocument();
    });

    it('should throw message "Location not valid"', async () => {
      renderComponent(newVacancyProps);
      const loacation = screen.getByRole("textbox", { name: /location/i });
      const user = userEvent.setup();
      await user.type(loacation, "1");
      const submitButton = screen.getByRole("button", { name: /create/i });
      await user.click(submitButton);
      const locationValidationError = screen.getByText(/location not valid/i);
      expect(locationValidationError).toBeInTheDocument();
    });

    it('should throw message "Values must be numeric" on incorrect hours input', async () => {
      renderComponent(newVacancyProps);
      const hoursFrom = screen.getByRole("textbox", { name: /hours from/i });
      const user = userEvent.setup();
      await user.type(hoursFrom, "a");
      const submitButton = screen.getByRole("button", { name: /create/i });
      await user.click(submitButton);
      const hoursFromValidationError = screen.getByText(
        /values must be numeric/i
      );
      expect(hoursFromValidationError).toBeInTheDocument();
    });
    it('should throw message "Values must be integers" on incorrect hours input', async () => {
      renderComponent(newVacancyProps);
      const hoursFrom = screen.getByRole("textbox", { name: /hours from/i });
      const user = userEvent.setup();
      await user.type(hoursFrom, "1.5");
      const submitButton = screen.getByRole("button", { name: /create/i });
      await user.click(submitButton);
      const hoursFromValidationError = screen.getByText(
        /values must be integers/i
      );
      expect(hoursFromValidationError).toBeInTheDocument();
    });
    it('should throw message "Hours range: 0-23" on incorrect hours input', async () => {
      renderComponent(newVacancyProps);
      const hoursFrom = screen.getByRole("textbox", { name: /hours from/i });
      const user = userEvent.setup();
      await user.type(hoursFrom, "24");
      const submitButton = screen.getByRole("button", { name: /create/i });
      await user.click(submitButton);
      const hoursFromValidationError = screen.getByText(/hours range: 0-23/i);
      expect(hoursFromValidationError).toBeInTheDocument();
    });
    it('should throw message "Minutes range: 0-59" on incorrect hours input', async () => {
      renderComponent(newVacancyProps);
      const hoursFrom = screen.getByRole("textbox", { name: /hours from/i });
      const minutesFrom = screen.getByRole("textbox", {
        name: /minutes from/i,
      });
      const user = userEvent.setup();
      await user.type(hoursFrom, "10");
      await user.type(minutesFrom, "61");
      const submitButton = screen.getByRole("button", { name: /create/i });
      await user.click(submitButton);
      const minutesFromValidationError =
        screen.getByText(/minutes range: 0-59/i);
      expect(minutesFromValidationError).toBeInTheDocument();
    });

    it("should submit a form with edited vacancy", async () => {
      renderComponent(getExistingVacancyProps());
      const user = userEvent.setup();
      const name = screen.getByRole("textbox", { name: /vacancy name/i });
      await user.type(name, "testName");
      const submitButton = screen.getByRole("button", { name: /save/i });
      await user.click(submitButton);
      waitFor(() => expect(setVacancyData).toHaveBeenCalledOnce());
      waitFor(() =>
        expect(setVacancyFormDisplayValue).toHaveBeenCalledWith("none")
      );
    });

    it("should submit a form with new vacancy", async () => {
      renderComponent(newVacancyProps);
      const user = userEvent.setup();
      const name = screen.getByRole("textbox", { name: /vacancy name/i });
      await user.type(name, "testName");
      const salary = screen.getByRole("textbox", { name: /salary/i });
      await user.type(salary, "500");
      const company = screen.getByRole("combobox", { name: /company/i });
      await user.selectOptions(company, partnerDb.company);
      const submitButton = screen.getByRole("button", { name: /create/i });
      await user.click(submitButton);
      // expect(setVacancyData).toHaveBeenCalledOnce()
      waitFor(() => expect(setVacancyListChangedState).toHaveBeenCalledOnce());
      waitFor(() =>
        expect(setVacancyFormDisplayValue).toHaveBeenCalledWith("none")
      );
    });
  });
});
