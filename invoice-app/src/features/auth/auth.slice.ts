import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store.ts";

const token = localStorage.getItem("token");
const tokenExpiry = localStorage.getItem("tokenExpiry");

const initialState = {
  token: token && new Date().getTime() < Number(tokenExpiry) ? token : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;

      // Save token and expiry to localStorage
      const expiryTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", expiryTime.toString());
    },
    logout: (state) => {
      state.token = null;

      // Clear token and expiry from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
    },
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
