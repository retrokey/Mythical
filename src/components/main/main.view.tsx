import { FC, useEffect } from 'react';
import { PageHooks } from '../../core/hooks/page.hooks';
import { SessionHooks } from '../../core/hooks/session.hooks';
import { CMSView } from './cms/cms.view';
import { LoginView } from './login/login.view';
import { NitroView } from './nitro/nitro.view';

export const MainView: FC<{  }> = props => {
    const { checkLogged } = SessionHooks();

    useEffect(() => {
        const style: HTMLLinkElement = document.createElement("link");
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href= 'css/mythical.css';
        document.head.appendChild(style);
    }, [  ]);

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