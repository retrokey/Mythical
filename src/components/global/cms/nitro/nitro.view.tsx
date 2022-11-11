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
        <iframe className="absolute laptop:h-screen laptop:w-[calc(100%-80px)] laptop:right-0 mobileSmall:w-screen mobileSmall:h-[calc(100%-80px)] mobileSmall:bottom-0" src={ window.config.getValue<string>('nitro_url') + getUser().userInfo.SSO }></iframe>
    );
}