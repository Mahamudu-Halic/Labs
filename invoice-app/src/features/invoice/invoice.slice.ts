import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, Invoice } from "../../types/invoice.types.ts";
import data from "../../data.json";
import { RootState } from "../../store.ts";

const initialState: InitialState = {
  invoices: data as Invoice[],
  filteredInvoices: data as Invoice[],
  invoice: undefined,
  statusFilter: [],
  error: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = [...action.payload];
    },

    setInvoice: (state, action: PayloadAction<Invoice | undefined>) => {
      state.invoice = action.payload;
    },

    filterInvoices: (state) => {
      state.filteredInvoices = state.statusFilter.length
        ? state.invoices.filter((invoice) =>
            state.statusFilter.includes(invoice.status),
          )
        : [...state.invoices];
    },

    addStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = state.statusFilter.includes(action.payload)
        ? state.statusFilter.filter((status) => status !== action.payload)
        : [...state.statusFilter, action.payload];
    },

    updateInvoice: (state, action) => {
      const { payload } = action;
      const index = state.invoices.findIndex(
        (invoice) => invoice.id === payload.id,
      );
      state.invoices[index] = { ...payload };
      state.invoice = { ...payload };
    },

    deleteInvoice: (state, action: PayloadAction<string>) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload,
      );
    },
  },
});

export const {
  filterInvoices,
  // addInvoice,
  updateInvoice,
  addStatusFilter,
  deleteInvoice,
  setInvoices,
  setInvoice,
} = invoiceSlice.actions;

export const selectInvoice = (state: RootState) => state.invoice.invoice;
export const selectInvoices = (state: RootState) => state.invoice.invoices;
export const selectFilteredInvoices = (state: RootState) =>
  state.invoice.filteredInvoices;
export const selectStatusFilter = (state: RootState) =>
  state.invoice.statusFilter;
export default invoiceSlice.reducer;
