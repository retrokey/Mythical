import { FC, useEffect } from 'react';
import { UserSessionDefinition } from '../../core/definitions/user-session.definition';
import { RequestManager } from '../../core/manager/request.manager';
import { PageProvider } from '../../core/providers/page.provider';
import { SessionProvider } from '../../core/providers/session.provider';
import { CMSView } from './cms/cms.view';
import { LoginView } from './guest/login.view';
import { RegistrationView } from './guest/registration.view';

export const Global: FC<{  }> = props => {
    const requestManager: RequestManager = new RequestManager();
    const { getLogged, onRefresh, registerUser, removeUser } = SessionProvider();
    const { check } = PageProvider();

    useEffect(() => {
        const token: string = onRefresh();
        if (token != undefined) {
            requestManager.get('user/verify', {
                'token': token
            })
            .then(response => {
                if (response.status != 'success') {
                    return;
                }

                let json = response.data;
                let userSession: UserSessionDefinition = new UserSessionDefinition();
                userSession.token = json.token;
                userSession.userInfo.id = json.user.id;
                userSession.userInfo.username = json.user.nickname;
                userSession.userInfo.SSO = json.user.SSO;
                userSession.userInfo.look = json.user.avatar;
                userSession.userInfo.motto = json.user.mission;
                userSession.userInfo.role = json.user.role;
                userSession.userInfo.rank = json.user.rank;
                registerUser(userSession);
            });
        }
    }, [  ]);

    if (getLogged()) {
        return (<>
            <CMSView />
        </>);
    } else if (!getLogged() && check('')) {
        return (<LoginView />);
    } else if (!getLogged() && check('registration')) {
        return (<RegistrationView />)
    }
}