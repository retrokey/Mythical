import { combineReducers, configureStore, createSerializableStateInvariantMiddleware, getDefaultMiddleware, Store as store } from '@reduxjs/toolkit';
import { SessionReducer } from './reducer/session.reducer';

const serializableMiddlware = createSerializableStateInvariantMiddleware({
    isSerializable: () => false
})

export const Store: store = configureStore({
    reducer: combineReducers({
        session: SessionReducer
    }),
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});