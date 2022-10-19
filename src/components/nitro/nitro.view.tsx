import { FC, useEffect, useState } from 'react';
import { ConfigManager } from '../../core/config/config.manager';
import { SessionHooks } from '../../core/hooks/session.hooks';

export const NitroView: FC<{  }> = props => {
    const configManager: ConfigManager = new ConfigManager();
    const [ SSO, setSSO ] = useState<string>('');
    const { getSession } = SessionHooks();

    useEffect(() => {
        document.title = configManager.config.mythical.name + ' - Nitro';
    }, [  ]);

    useEffect(() => {
        if (getSession() == null) {
            return;
        }

        setSSO(getSession().SSO);
    }, [ getSession, setSSO ]);

    return (
        <iframe src={ configManager.config.mythical.nitro_url + SSO } className="nitro-container"></iframe>
    );
}