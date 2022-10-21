import { FC, useEffect } from 'react';
import { PageHooks } from '../core/hooks/page.hooks';
import { SessionHooks } from '../core/hooks/session.hooks';
import { AdminView } from './admin/admin.view';
import { CMSView } from './cms/cms.view';
import { LoginView } from './login/login.view';
import { NitroView } from './nitro/nitro.view';

export const MainView: FC<{  }> = props => {
    const { checkLogged, onRefresh, setSession } = SessionHooks();
    const { setNitro, adminCheck } = PageHooks();

    useEffect(() => {
        window.addEventListener('load', () => {
            if (onRefresh()) {
                setSession();
                setNitro();
            }
        });
    }, [ onRefresh, setSession, setNitro ]);

    if (checkLogged() && !adminCheck()) {
        return (
            <>
            <CMSView></CMSView>
            <NitroView></NitroView>
            </>
        );
    } else if (checkLogged() && adminCheck()) {
        return (
            <AdminView></AdminView>
        );
    } else {
        return (
            <LoginView></LoginView>
        );
    }
}