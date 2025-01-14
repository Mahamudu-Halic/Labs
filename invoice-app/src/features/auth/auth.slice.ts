import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store.ts";

const token = localStorage.getItem("token");
const tokenExpiry = localStorage.getItem("tokenExpiry");

const initialState = {
  token: new Date().getTime() < Number(tokenExpiry) ? token : null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;

      localStorage.setItem("token", token);
      const expiry = new Date().getTime() + 60 * 1000 * 60;
      localStorage.setItem("tokenExpiry", expiry.toString());
    },
    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
    },
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
