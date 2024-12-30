import { describe, expect, test } from "vitest";
import { renderWithProviders } from "../../utils/renderwithproviders.tsx";
import Header from "./Header.tsx";
import { fireEvent, screen } from "@testing-library/react";

describe("header component", () => {
  test("should render header components", () => {
    renderWithProviders(<Header total={10} />);

    const headline = screen.getByRole("heading", { name: /invoices/i });
    const totalText = screen.getByText(/there are 10/i);
    const filterButton = screen.getByRole("button", { name: /filter/i });
    const newButton = screen.getByRole("button", { name: /new/i });

    expect(headline).toBeInTheDocument();
    expect(totalText).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(newButton).toBeInTheDocument();
  });

  test("should render 'No invoices' when total is 0", () => {
    renderWithProviders(<Header total={0} />);

    const noInvoicesText = screen.getByText(/no invoices/i);

    expect(noInvoicesText).toBeInTheDocument();
  });

  test("should render 'Total' when total is 1 and status filter is empty", () => {
    renderWithProviders(<Header total={1} />);
    screen.debug();
    const totalText = screen.getByText(/there is 1 total/i);

    expect(totalText).toBeInTheDocument();
  });

  test("should render invoices when one status filter is selected", () => {
    renderWithProviders(<Header total={10} />, {
      preloadedState: {
        invoice: {
          invoices: [],
          invoice: { invoice: undefined, loading: "idle", error: null },
          statusFilter: ["draft"],
          loading: "idle",
          error: null,
        },
      },
    });

    const totalText = screen.getByText(/there are 10 draft invoices/i);

    expect(totalText).toBeInTheDocument();
  });

  test("should render invoices when multiple status filters are selected", () => {
    renderWithProviders(<Header total={10} />, {
      preloadedState: {
        invoice: {
          invoices: [],
          invoice: { invoice: undefined, loading: "idle", error: null },
          statusFilter: ["draft", "pending"],
          loading: "idle",
          error: null,
        },
      },
    });

    const totalText = screen.getByText(/there are 10 invoices/i);

    expect(totalText).toBeInTheDocument();
  });

  test("should toggle form dialog when button is clicked", () => {
    const { store } = renderWithProviders(<Header total={10} />, {
      preloadedState: {
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
    expect(state.modal.showFormDialog).toBe(false);

    const newButton = screen.getByRole("button", { name: /new/i });
    fireEvent.click(newButton);

    const stateAfterClick = store.getState();
    expect(stateAfterClick.modal.showFormDialog).toBe(true);
  });
});
