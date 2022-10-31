import { FC, useEffect } from 'react';
import { PageProvider } from '../../core/providers/page.provider';
import { SessionProvider } from '../../core/providers/session.provider';
import { CMSView } from './cms/cms.view';
import { LoginView } from './guest/login.view';
import { RegistrationView } from './guest/registration.view';

export const Global: FC<{  }> = props => {
    const { getLogged, onRefresh } = SessionProvider();
    const { check } = PageProvider();

    useEffect(() => {
        onRefresh();
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