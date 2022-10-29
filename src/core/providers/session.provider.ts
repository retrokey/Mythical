import { useState } from 'react';
import { useBetween } from 'use-between';
import { UserSessionDefinition } from '../definitions/user-session.definition';

const session = () => {
    let [ logged, setLogged ] = useState<boolean>(false);
    let [ userSession, setUserSession ] = useState<UserSessionDefinition>(new UserSessionDefinition());

    const registerUser = (userSession: UserSessionDefinition) => {
        setUserSession(userSession);
        setLogged(true);
        localStorage.setItem('session', JSON.stringify(userSession));
    }

    const onRefresh = () => {
        if (localStorage.getItem('session') == null) {
            setLogged(false);
            return;
        }

        let userSession: UserSessionDefinition = JSON.parse(localStorage.getItem('session'));
        setUserSession(userSession);
        setLogged(true);
    }


    const removeUser = () => {
        localStorage.removeItem('session');
        setUserSession(null);
    }

    const getUser = () => {
        return userSession;
    }

    const getLogged = () => {
        return logged;
    }

    return { registerUser, onRefresh, removeUser, getUser, getLogged }
}
export const SessionProvider = () => useBetween(session);