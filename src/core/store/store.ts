import { configureStore, getDefaultMiddleware, Store as store } from "@reduxjs/toolkit";
import { rootReducer } from "./root.reducer";

export const Store: store = configureStore({
    reducer: rootReducer ,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});