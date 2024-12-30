import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/theme.slice.ts";
import invoiceReducer from "./features/invoice/invoice.slice.ts";
import modalReducer from "./features/modal/modal.slice.tsx";
import mobileReducer from "./features/mobile/mobile.slice.tsx";

// Combine reducers into one root reducer
const rootReducers = combineReducers({
  theme: themeReducer,
  invoice: invoiceReducer,
  modal: modalReducer,
  mobile: mobileReducer,
});

// Define the store with preloaded state
export const createStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducers,
    preloadedState, // Add optional preloaded state here
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = AppStore["dispatch"];
