import { FC, useEffect } from 'react';
import { ConfigManager } from '../../../core/config/config.manager';

export const NewsView: FC<{  }> = props => {
    const configManager: ConfigManager = new ConfigManager();

    useEffect(() => {
        document.title = configManager.config.mythical.name + ' - News Archive';
    }, [  ]);

    return (
        <div className="d-flex justify-content-center">
            <div id="box">
                <div className="header">
                    News Archive
                </div>
                <div className="content">

                </div>
            </div>
        </div>
    );
}