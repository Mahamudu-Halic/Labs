import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/theme.slice.ts";
import invoiceReducer from "./features/invoice/invoice.slice.ts";
import modalReducer from "./features/modal/modal.slice.tsx";
import mobileReducer from "./features/mobile/mobile.slice.tsx";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    invoice: invoiceReducer,
    modal: modalReducer,
    mobile: mobileReducer,
  },
});

export type RootState = ReturnType<(typeof store)["getState"]>;
export type AppDispatch = (typeof store)["dispatch"];
