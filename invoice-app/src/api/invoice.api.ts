import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Invoice } from "../types/invoice.types.ts";

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://invoice-app-bknd-strapi-cloud.onrender.com",

    prepareHeaders: (headers, { getState }) => {
      // @ts-expect-error: get auth token
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: `/login`,
        method: "POST",
        body: { ...credentials },
      }),
    }),

    getInvoices: builder.query({
      query: () => `/invoices`,
      // keepUnusedDataFor: 5,
    }),

    getInvoiceById: builder.query({
      query: (id: string) => `/invoices/${id}`,
    }),

    createInvoice: builder.mutation({
      query: (invoice: Invoice) => ({
        url: `/invoices`,
        method: "POST",
        body: { ...invoice },
      }),
    }),

    updateInvoice: builder.mutation({
      query: (invoice: Invoice) => ({
        url: `/invoices/${invoice.id}`,
        method: "PUT",
        body: { ...invoice },
      }),
    }),

    deleteInvoice: builder.mutation({
      query: (id: string) => ({
        url: `/invoices/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useUpdateInvoiceMutation,
  useGetInvoiceByIdQuery,
  useGetInvoicesQuery,
} = invoiceApi;
