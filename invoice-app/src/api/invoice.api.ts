import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../features/auth/auth.slice.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://invoice-app-bknd-strapi-cloud.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log(getState);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      console.log(token);
    }
    console.log(headers);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log(`args: ${args}, api: ${api}, extraOptions: ${extraOptions}`);
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    const refreshResult = await baseQuery("/login", api, extraOptions);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ user, ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `/login`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
