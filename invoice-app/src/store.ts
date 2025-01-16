import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/theme.slice.ts";
import invoiceReducer from "./features/invoice/invoice.slice.ts";
import authReducer from "./features/auth/auth.slice.ts";
import { invoiceApi } from "./api/invoice.api.ts";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducers = combineReducers({
  theme: themeReducer,
  invoice: invoiceReducer,
  auth: authReducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
});

export const createStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducers,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(invoiceApi.middleware),
    devTools: true,
  });

setupListeners(createStore().dispatch);

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = AppStore["dispatch"];
