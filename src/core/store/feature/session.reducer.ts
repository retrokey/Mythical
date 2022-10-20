import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { UserSessionDefinition } from '../../definition/user-session.definiton';

const initialState: UserSessionDefinition = {
    SSO: '',
    userInfo: null
};

export const SessionSlice: Slice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        add: (state: UserSessionDefinition, action: PayloadAction<UserSessionDefinition>) => {
            state.SSO = action.payload.SSO;
            state.userInfo = action.payload.userInfo;
            localStorage.setItem('session', JSON.stringify(state));
        },
        check: (state) => {
            let session: UserSessionDefinition = JSON.parse(localStorage.getItem('session'));
            state.SSO = session.SSO;
            state.userInfo = session.userInfo;
        },
        remove: () => {
            localStorage.removeItem('session');
            return initialState;
        },
        get: (state) => {
            return state;
        }
    }
});