import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store.ts";

const token = localStorage.getItem("token");

const initialState = {
  token: token ?? null,
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
    },
    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
    },
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
