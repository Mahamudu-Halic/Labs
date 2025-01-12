import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Invoice } from "../types/invoice.types.ts";

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://invoice-app-bknd-strapi-cloud.onrender.com",

    prepareHeaders: (headers) => {
      // Retrieve token and token expiration from localStorage
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      // Check if the token has expired
      if (token && tokenExpiry && new Date().getTime() < Number(tokenExpiry)) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        // Token expired: remove from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
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
      // async onQueryStarted(credentials, { queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log(credentials);
      //
      //     // Save token and expiration time (1 hour from now)
      //     const token = data.token;
      //     const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds
      //     localStorage.setItem("token", token);
      //     localStorage.setItem("tokenExpiry", expiryTime.toString());
      //   } catch (error) {
      //     console.error("Login failed:", error);
      //   }
      // },
    }),

    getInvoices: builder.query({
      query: () => `/invoices`,
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

export const { useLoginMutation } = invoiceApi;
