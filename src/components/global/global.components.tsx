import { FC, useEffect } from 'react';
import { SessionProvider } from '../../core/providers/session.provider';
import { CMSView } from './cms/cms.view';
import { LoginView } from './guest/login.view';

export const Global: FC<{  }> = props => {
    const { getLogged, onRefresh } = SessionProvider();

    useEffect(() => {
        onRefresh()
    }, [  ]);

    if (getLogged()) {
        return (<>
            <CMSView />
        </>);
    } else {
        return (<LoginView />);
    }
}