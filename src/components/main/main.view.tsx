import { FC, useEffect } from 'react';
import { SessionHooks } from '../../core/hooks/session.hooks';
import { CMSView } from './cms/cms.view';
import { LoginView } from './login/login.view';
import { NitroView } from './nitro/nitro.view';

export const MainView: FC<{  }> = props => {
    const { onRefresh, checkLogged } = SessionHooks();

    useEffect(() => {
        document.head.getElementsByClassName('css')[0].setAttribute('href', 'css/mythical.css');
        window.addEventListener('load', () => {
            onRefresh();
        });
    }, [ onRefresh ]);

    if (checkLogged()) {
        return (
            <>
                <CMSView />
                <NitroView />
            </>
        );
    } else {
        return (
            <LoginView />
        );
    }
}