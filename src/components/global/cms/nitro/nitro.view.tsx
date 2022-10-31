import { FC, useEffect } from 'react';
import { ConfigManager } from '../../../../core/manager/config.manager';
import { PageProvider } from '../../../../core/providers/page.provider';
import { SessionProvider } from '../../../../core/providers/session.provider';

export const NitroView: FC<{  }> = props => {
    const configManager: ConfigManager = new ConfigManager();
    const { title } = PageProvider();
    const { getUser } = SessionProvider();

    useEffect(() => {
        title('Nitro');
    }, [  ]);

    return (
        <iframe className="absolute laptop:h-screen laptop:w-[94.2%] laptop:right-0 mobileSmall:w-screen mobileSmall:h-[95.1%] tablet:h-[89%] mobileSmall:bottom-0" src={ configManager.config.nitro_url + getUser().userInfo.SSO }></iframe>
    );
}