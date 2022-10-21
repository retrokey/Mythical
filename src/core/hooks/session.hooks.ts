import { useBetween } from 'use-between';
import { UserSessionDefinition } from '../definition/user-session.definiton';
import { Store } from '../store/store.redux';
import { add, remove, set } from '../store/reducer/session.reducer';
import { useState } from 'react';
import { PermissionManager } from '../manager/permission.manager';

const SessionHooksState = () => {
    const permissionManager: PermissionManager = new PermissionManager();
    const [ logged, setLogged ] = useState<boolean>(false);

    const registerUser = async (json: any) => {
        let userSession: UserSessionDefinition = new UserSessionDefinition();
        userSession.userInfo.username = json.user.nickname;
        userSession.userInfo.SSO = json.sso;
        userSession.userInfo.look = json.user.avatar;
        userSession.userInfo.motto = json.user.mission;
        userSession.userInfo.role = json.user.role;
        userSession.userInfo.rank = json.user.rank;
        Store.dispatch(add(userSession));
        await loadPermission('admin');
        setLogged(true);
    }

    const loadPermission = async (permission: string) => {
        let havePermission: boolean = await permissionManager.getPermission(permission, getUser().userInfo.rank);
        getUser().userInfo.permission.set(permission, havePermission);
    }

    const getUser = () => {
        let userSession: UserSessionDefinition = Store.getState().session;
        return userSession;
    }

    const removeUser = () => {
        Store.dispatch(remove());
        setLogged(false);
    }

    const onRefresh = () => {
        return localStorage.getItem('session') == null ? false : true;
    }

    const setSession = async () => {
        Store.dispatch(set());
        await loadPermission('admin');
        setLogged(true);
    }

    const checkLogged = () => {
        return logged;
    }

    const checkPermission = (permission: string) => {
        return getUser().userInfo.permission.get(permission);
    }

    return { registerUser, getUser, removeUser, onRefresh, setSession, checkLogged, checkPermission };
}

export const SessionHooks = () => useBetween(SessionHooksState);