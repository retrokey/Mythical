import { FC } from 'react';
import { ConfigManager } from '../../../../core/manager/config.manager';
import { SessionProvider } from '../../../../core/providers/session.provider';

export const NitroView: FC<{  }> = props => {
    const configManager: ConfigManager = new ConfigManager();
    const { getUser } = SessionProvider();

    return (
        <iframe className="absolute right-0 w-[95%] h-screen" src={ configManager.config.nitro_url + getUser().userInfo.SSO }></iframe>
    );
}