import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "../../types/invoice.types.ts";
import data from "../../data.json";
import { RootState } from "../../store.ts";

const initialState: InitialState = {
  invoices: [],
  invoice: undefined,
  statusFilter: [],
};

export const fetchInvoices = createAsyncThunk("invoices/fetch", () => {
  return data;
});

export const getInvoiceById = createAsyncThunk("invoice/get", (id: string) => {
  return data.find((invoice) => invoice.id === id);
});

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    filterInvoices: (state, action: PayloadAction<string>) => {
      state.statusFilter = state.statusFilter.includes(action.payload)
        ? state.statusFilter.filter(
            (status: string) => status !== action.payload,
          )
        : [...state.statusFilter, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvoices.fulfilled, (state, action) => {
      state.invoices = action.payload;
    });
    builder.addCase(getInvoiceById.fulfilled, (state, action) => {
      state.invoice = action.payload;
    });
  },
});

export const { filterInvoices } = invoiceSlice.actions;

export const selectInvoice = (state: RootState) => state.invoice.invoice;
export const selectInvoices = (state: RootState) => state.invoice.invoices;
export const selectStatusFilter = (state: RootState) =>
  state.invoice.statusFilter;
export default invoiceSlice.reducer;
