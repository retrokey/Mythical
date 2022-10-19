import { Reducer, combineReducers } from '@reduxjs/toolkit';
import { SessionSlice } from './feature/session.reducer';

export const rootReducer: Reducer = combineReducers({
    session: SessionSlice.reducer
});