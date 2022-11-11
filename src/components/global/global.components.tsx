import { FC, useEffect } from 'react';
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
                    removeUser();
                    return;
                }

                let json = response.data;
                registerUser(json);
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
