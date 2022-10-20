import { FC, useEffect } from 'react';
import { PageHooks } from '../core/hooks/page.hooks';
import { SessionHooks } from '../core/hooks/session.hooks';
import { CMSView } from './cms/cms.view';
import { LoginView } from './login/login.view';
import { NitroView } from './nitro/nitro.view';

export const MainView: FC<{  }> = props => {
    const { setSession, haveSession, getLogged } = SessionHooks();
    const { setNitro } = PageHooks();

    useEffect(() => {
        window.addEventListener('load', () => {
            if (haveSession()) {
                setNitro();
                setSession();
            }
        });
    }, [ setSession, haveSession ]);

    if (getLogged()) {
        return (
            <>
            <CMSView></CMSView>
            <NitroView></NitroView>
            </>
        );
    } else {
        return (
            <LoginView></LoginView>
        );
    }
}