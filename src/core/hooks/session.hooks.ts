import { useState } from 'react';
import { useBetween } from 'use-between';
import { UserInfoDefinition } from '../definition/user-info.definition';
import { UserSessionDefinition } from '../definition/user-session.definiton';
import { SessionSlice } from '../store/feature/session.reducer';
import { Store } from '../store/Store';

const SessionHooksState = () => {
    const [ logged, setLogged ] = useState<boolean>(false);

    const makeSession = (SSO: string, userInfo: UserInfoDefinition) => {
        let session: UserSessionDefinition = new UserSessionDefinition();
        session.SSO = SSO;
        session.userInfo = userInfo;
        setLogged(true);
        Store.dispatch(SessionSlice.actions.add(session));
    }

    const getSession = () => {
        if (localStorage.getItem('session') == null) {
            setLogged(false);
        } else {
            Store.dispatch(SessionSlice.actions.check({}));
            setLogged(true);
            let session: UserSessionDefinition = Store.getState().session;
            return session;
        }
    }

    const setSession = () => {
        Store.dispatch(SessionSlice.actions.check({}));
        setLogged(true);
    }

    const removeSession = () => {
        setLogged(false);
        Store.dispatch(SessionSlice.actions.remove({}));
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