import { describe, expect, test } from "vitest";
import { renderWithProviders } from "../../utils/renderwithproviders.tsx";
import Invoices from "./Invoices.tsx";
import { fireEvent, screen } from "@testing-library/react";

describe("invoices component", () => {
  const data = {
    id: "RT3080",
    createdAt: "2021-08-18",
    paymentDue: "2021-08-19",
    description: "Re-branding",
    paymentTerms: 1,
    clientName: "Jensen Huang",
    clientEmail: "jensenh@mail.com",
    status: "paid",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "106 Kendell Street",
      city: "Sharrington",
      postCode: "NR24 5WQ",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Brand Guidelines",
        quantity: 1,
        price: 1800.9,
        total: 1800.9,
      },
    ],
    total: 1800.9,
  };
  test("should render components", () => {
    const { store } = renderWithProviders(<Invoices />, {
      preloadedState: {
        invoice: {
          invoices: [data],
          currentInvoice: { invoice: undefined, loading: "idle", error: null },
          statusFilter: [],
          loading: "idle",
          error: null,
        },
        modal: {
          showFormDialog: false,
          showDeleteDialog: false,
          showDropdown: false,
          showPaymentTerms: false,
          showProfile: false,
        },
      },
    });

    const state = store.getState();
    const headline = screen.getByRole("heading", { name: /invoices/i });
    const totalText = screen.getByText(/there is 1/i);
    const filterButton = screen.getByRole("button", { name: /filter/i });
    const newButton = screen.getByRole("button", { name: /new/i });

    state.invoice.invoices.forEach((invoice) => {
      const id = screen.getByText(invoice.id);
      const clientName = screen.getByText(invoice.clientName);
      const status = screen.getByText(invoice.status);

      expect(id).toBeInTheDocument();
      expect(clientName).toBeInTheDocument();
      expect(status).toBeInTheDocument();
    });

    expect(headline).toBeInTheDocument();
    expect(totalText).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(newButton).toBeInTheDocument();
  });

  test("should render not found component", () => {
    // TODO: Implement this test
    const { store } = renderWithProviders(<Invoices />, {
      preloadedState: {
        invoice: {
          invoices: [data],
          currentInvoice: { invoice: undefined, loading: "idle", error: null },
          statusFilter: [],
          loading: "idle",
          error: null,
        },
        modal: {
          showFormDialog: false,
          showDeleteDialog: false,
          showDropdown: false,
          showPaymentTerms: false,
          showProfile: false,
        },
      },
    });
    // screen.debug();

    const filterButton = screen.getByRole("button", { name: /filter/i });
    expect(filterButton).toBeInTheDocument();

    fireEvent.click(filterButton);

    const state = store.getState();
    expect(state.modal.showDropdown).toBe(true);

    const paid = screen.getByRole("checkbox", { name: /paid/i });
    const draft = screen.getByRole("checkbox", { name: /draft/i });
    const pending = screen.getByRole("checkbox", { name: /pending/i });

    expect(paid).toBeInTheDocument();
    expect(paid).not.toBeChecked();
    expect(draft).toBeInTheDocument();
    expect(draft).not.toBeChecked();
    expect(pending).toBeInTheDocument();
    expect(pending).not.toBeChecked();

    fireEvent.click(pending);
    expect(pending).toBeChecked();

    const stateAfterClick = store.getState();
    expect(stateAfterClick.invoice.statusFilter).toEqual(["pending"]);

    fireEvent.click(draft);
    expect(draft).toBeChecked();

    const notFound = screen.getByText(/There is nothing here/i);

    expect(notFound).toBeInTheDocument();
  });

  test("should render form modal", () => {
    // TODO: Implement this test
    const { store } = renderWithProviders(<Invoices />, {
      preloadedState: {
        invoice: {
          invoices: [],
          currentInvoice: { invoice: undefined, loading: "idle", error: null },
          statusFilter: [],
          loading: "idle",
          error: null,
        },
        modal: {
          showFormDialog: false,
          showDeleteDialog: false,
          showDropdown: false,
          showPaymentTerms: false,
          showProfile: false,
        },
      },
    });

    const state = store.getState();
    const newButton = screen.getByRole("button", { name: /new/i });

    expect(state.modal.showFormDialog).toBe(false);

    fireEvent.click(newButton);

    const stateAfterClick = store.getState();
    expect(stateAfterClick.modal.showFormDialog).toBe(true);
  });

  test("should render dropdown when filter button is clicked", () => {
    // TODO: Implement this test
    const { store } = renderWithProviders(<Invoices />, {
      preloadedState: {
        invoice: {
          invoices: [],
          currentInvoice: { invoice: undefined, loading: "idle", error: null },
          statusFilter: [],
          loading: "idle",
          error: null,
        },
        modal: {
          showFormDialog: false,
          showDeleteDialog: false,
          showDropdown: false,
          showPaymentTerms: false,
          showProfile: false,
        },
      },
    });

    const state = store.getState();
    const filterButton = screen.getByRole("button", { name: /filter/i });

    expect(state.modal.showDropdown).toBe(false);

    fireEvent.click(filterButton);

    const stateAfterClick = store.getState();
    expect(stateAfterClick.modal.showDropdown).toBe(true);

    const paid = screen.getByRole("checkbox", { name: /paid/i });
    const draft = screen.getByRole("checkbox", { name: /draft/i });
    const pending = screen.getByRole("checkbox", { name: /pending/i });

    expect(paid).toBeInTheDocument();
    expect(paid).not.toBeChecked();
    expect(draft).toBeInTheDocument();
    expect(draft).not.toBeChecked();
    expect(pending).toBeInTheDocument();
    expect(pending).not.toBeChecked();
  });

  test("should close dropdown when filter button is clicked again", () => {
    // TODO: Implement this test
    const { store } = renderWithProviders(<Invoices />, {
      preloadedState: {
        invoice: {
          invoices: [],
          currentInvoice: { invoice: undefined, loading: "idle", error: null },
          statusFilter: [],
          loading: "idle",
          error: null,
        },
        modal: {
          showFormDialog: false,
          showDeleteDialog: false,
          showDropdown: false,
          showPaymentTerms: false,
          showProfile: false,
        },
      },
    });

    const state = store.getState();
    const filterButton = screen.getByRole("button", { name: /filter/i });

    expect(state.modal.showDropdown).toBe(false);

    fireEvent.click(filterButton);

    const stateAfterClick1 = store.getState();
    expect(stateAfterClick1.modal.showDropdown).toBe(true);

    fireEvent.click(filterButton);

    const stateAfterClick2 = store.getState();
    expect(stateAfterClick2.modal.showDropdown).toBe(false);
  });

  test("should filter invoices based on selected status", () => {
    // TODO: Implement this test
    const { store } = renderWithProviders(<Invoices />, {
      preloadedState: {
        invoice: {
          invoices: [data],
          currentInvoice: { invoice: undefined, loading: "idle", error: null },
          statusFilter: ["paid"],
          loading: "idle",
          error: null,
        },
        modal: {
          showFormDialog: false,
          showDeleteDialog: false,
          showDropdown: false,
          showPaymentTerms: false,
          showProfile: false,
        },
      },
    });

    const state = store.getState();

    expect(state.invoice.statusFilter).toEqual(["paid"]);
    expect(state.invoice.invoices.length).toBe(1);
  });
});
