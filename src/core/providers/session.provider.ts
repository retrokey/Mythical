import { useState } from 'react';
import { useBetween } from 'use-between';
import { UserSessionDefinition } from '../definitions/user-session.definition';
import { RequestManager } from '../manager/request.manager';

const session = () => {
    const requestManager: RequestManager = new RequestManager();
    const [ logged, setLogged ] = useState<boolean>(false);
    const [ userSession, setUserSession ] = useState<UserSessionDefinition>();

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
            },
            permission: null
        };
        requestManager.get('user/permission/' + userSession.userInfo.rank, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        })
        .then((response) => {
            if (response.status != 'success') {
                return;
            }

            let json = response.data;
            let permissionMap: Map<string, boolean> = new Map<string, boolean>();
            for (let permission of json.lists) {
                permissionMap.set(permission.name, true);
            }
            userSession.permission = permissionMap;
            setUserSession(userSession);
            setLogged(true);
            localStorage.setItem('session', userSession.token);
        });
    }

    const hasPermission = (permission: string) => {
        return userSession.permission.has(permission);
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

    return { registerUser, hasPermission, onRefresh, removeUser, getUser, getLogged }
}
export const SessionProvider = () => useBetween(session);