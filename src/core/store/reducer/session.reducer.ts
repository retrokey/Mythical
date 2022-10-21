import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    createAction,
    createReducer,
    PayloadAction,
    Reducer
} from '@reduxjs/toolkit';
import { UserSessionDefinition } from '../../definition/user-session.definiton';

export const add: ActionCreatorWithPayload<UserSessionDefinition> = createAction('add');
export const set: ActionCreatorWithoutPayload = createAction('set');
export const remove: ActionCreatorWithoutPayload = createAction('remove');

const initialState: UserSessionDefinition = new UserSessionDefinition();
export const SessionReducer: Reducer = createReducer(initialState, (builder) => {
    builder
    .addCase(add.type, (state: UserSessionDefinition, action: PayloadAction<UserSessionDefinition>) => {
        localStorage.setItem('session', JSON.stringify(action.payload));
        return action.payload;
    })
    .addCase(set.type, () => {
        if (JSON.parse(localStorage.getItem('session')) == null) {
            return null;
        }

        let userSession: UserSessionDefinition = JSON.parse(localStorage.getItem('session'));
        userSession.userInfo.permission = new Map<string, boolean>();
        return userSession;
    })
    .addCase(remove.type, () => {
        localStorage.removeItem('session');
        return initialState;
    });
});