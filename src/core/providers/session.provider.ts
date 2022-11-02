import { useState } from 'react';
import { useBetween } from 'use-between';
import { UserSessionDefinition } from '../definitions/user-session.definition';

const session = () => {
    let [ logged, setLogged ] = useState<boolean>(false);
    let [ userSession, setUserSession ] = useState<UserSessionDefinition>();

    const registerUser = (json: any) => {
        let userSession: UserSessionDefinition = {
            token: json.token,
            userInfo: {
                id: json.user.id,
                username: json.user.nickname,
                SSO: json.user.SSO,
                look: json.user.avatar,
                motto: json.user.mission,
                role: json.user.role,
                rank: json.user.rank
            }
        };
        setUserSession(userSession);
        setLogged(true);
        localStorage.setItem('session', userSession.token);
    }

    const onRefresh = () => {
        if (localStorage.getItem('session') == undefined) {
            setLogged(false);
            return;
        }

        return localStorage.getItem('session');
    }

    const removeUser = () => {
        setLogged(false);
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