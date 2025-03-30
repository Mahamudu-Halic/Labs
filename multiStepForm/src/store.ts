import {configureStore} from "@reduxjs/toolkit";
import formReducer from "./features/Form/FormSlice.tsx";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "form",
    storage,
    whitelist: ["formData"]
};

// Wrap the form reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, formReducer);


export const store = configureStore({
    reducer: {
        form: persistedReducer
    },
})
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch