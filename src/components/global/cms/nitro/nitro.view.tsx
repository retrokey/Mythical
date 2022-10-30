import { FC } from 'react';
import { ConfigManager } from '../../../../core/manager/config.manager';

export const NitroView: FC<{  }> = props => {
    const configManager: ConfigManager = new ConfigManager();

    return (
        <iframe className="absolute right-0 w-[95%] h-screen" src={ configManager.config.nitro_url }></iframe>
    );
}