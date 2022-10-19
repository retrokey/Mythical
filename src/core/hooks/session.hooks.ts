import { useState } from 'react';
import { useBetween } from 'use-between';
import { UserInfoDefinition } from '../definition/user-info.definition';
import { UserSessionDefinition } from '../definition/user-session.definiton';
import { SessionSlice } from '../store/feature/session.reducer';
import { store } from '../store/Store';

const SessionHooksState = () => {
    const [ logged, setLogged ] = useState<boolean>(false);

    const makeSession = (SSO: string, userInfo: UserInfoDefinition) => {
        let session: UserSessionDefinition = new UserSessionDefinition();
        session.SSO = SSO;
        session.userInfo = userInfo;
        setLogged(true);
        store.dispatch(SessionSlice.actions.add(session));
    }

    const getSession = () => {
        if (localStorage.getItem('session') == null) {
            setLogged(false);
        } else {
            store.dispatch(SessionSlice.actions.check({}));
            setLogged(true);
            return store.getState().session;
        }
    }

    const setSession = () => {
        store.dispatch(SessionSlice.actions.check({}));
        setLogged(true);
    }

    const removeSession = () => {
        setLogged(false);
        store.dispatch(SessionSlice.actions.remove({}));
    }

    const haveSession = () => {
        return localStorage.getItem('session') != null;
    }

    const getLogged = () => {
        return logged;
    }

    return { makeSession, getSession, setSession, removeSession, haveSession, getLogged };
}

export const SessionHooks = () => useBetween(SessionHooksState);