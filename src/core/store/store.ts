import { configureStore, getDefaultMiddleware, Store } from "@reduxjs/toolkit";
import { rootReducer } from "./root.reducer";

export const store: Store = configureStore({
    reducer: rootReducer ,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});