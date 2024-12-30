import { describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/renderwithproviders.tsx";
import Form from "./Form.tsx";

describe("Form component", () => {
  // const mockInitialValues = {
  //   id: "123",
  //   clientName: "John Doe",
  //   clientEmail: "johndoe@example.com",
  //   createdAt: "2024-12-29",
  //   paymentDue: "",
  //   description: "Test Project",
  //   paymentTerms: 1,
  //   clientAddress: {
  //     street: "123 Main St",
  //     city: "Springfield",
  //     postCode: "12345",
  //     country: "USA",
  //   },
  //   senderAddress: {
  //     street: "456 Elm St",
  //     city: "Shelbyville",
  //     postCode: "67890",
  //     country: "USA",
  //   },
  //   items: [{ name: "Test Item", quantity: 1, price: 100, total: 100 }],
  //   status: "draft",
  //   total: 100,
  // };
  test("should render form components", () => {
    //todo: implement this test
    renderWithProviders(<Form type={"newInvoice"} />);

    const headline = screen.getByRole("heading", { name: /new invoice/i });
    // const clientName = screen.getByRole("textbox", { name: /client's name/i });
    const clientName = screen.getByLabelText(/client's name/i);
    const clientEmail = screen.getByLabelText(/client's email/i);
    const description = screen.getByLabelText(/description/i);
    const paymentTerms = screen.getByText(/payment terms/i);
    const cityInputs = screen.getAllByLabelText(/city/i);
    const countryInputs = screen.getAllByLabelText(/country/i);
    const postalCodeInputs = screen.getAllByLabelText(/postal code/i);
    const streetInputs = screen.getAllByLabelText(/street/i);
    const saveButton = screen.getByRole("button", { name: /save & send/i });
    const discardButton = screen.getByRole("button", { name: /discard/i });
    const saveDraftButton = screen.getByRole("button", {
      name: /save as draft/i,
    });

    expect(headline).toBeInTheDocument();
    expect(clientName).toBeInTheDocument();
    expect(clientEmail).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(paymentTerms).toBeInTheDocument();

    cityInputs.forEach((input) => {
      expect(input).toBeInTheDocument();
    });

    countryInputs.forEach((input) => {
      expect(input).toBeInTheDocument();
    });

    postalCodeInputs.forEach((input) => {
      expect(input).toBeInTheDocument();
    });

    streetInputs.forEach((input) => {
      expect(input).toBeInTheDocument();
    });

    expect(saveButton).toBeInTheDocument();
    expect(discardButton).toBeInTheDocument();
    expect(saveDraftButton).toBeInTheDocument();
  });

  test("should validate form inputs", () => {
    //todo: implement this test
  });

  test("should handle form submission", () => {
    //todo: implement this test
  });

  test("should handle form reset", () => {
    //todo: implement this test
  });

  test("should handle form discard", () => {
    //todo: implement this test
  });

  test("should handle form save draft", () => {
    //todo: implement this test
  });

  test("should render existing values when called with edit", () => {
    //todo: implement this test
  });
});
