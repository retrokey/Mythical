import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHooks } from '../../core/hooks/page.hooks';
import { SessionHooks } from '../../core/hooks/session.hooks';
import { ConfigManager } from '../../core/manager/config.manager';
import { DashView } from './dash/dash.view';
import { ClientView } from './server/client.view';
import { CMSView } from './server/cms.view';

export const AdminView: FC<{  }> = props => {
    const configManager = new ConfigManager();
    const { adminPageCheck, adminChangePage, adminPageCheckS } = PageHooks();
    const { getUser } = SessionHooks();

    useEffect(() => {
        const style: HTMLLinkElement = document.createElement("link");
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href= 'css/admin.css';
        document.head.appendChild(style);
        adminChangePage('dash', 'Dashboard')
    }, [  ]);

    return (
        <div className="container">
            <ul className="navigation d-flex">
                <li className={ `d-flex justify-content-between${adminPageCheck('dash') ? " active" : ""}`} onClick={ event => adminChangePage('dash', 'Dashboard') }>
                    <i className="icon dashboard" />
                    Dashboard
                </li>
                <li className={ `d-flex justify-content-between${adminPageCheckS('server') ? " active" : ""}`} onClick={ event => adminChangePage('server.client', 'Server: Client Settings') }>
                    <i className="icon server" />
                    Server
                </li>
                <li className={ `d-flex justify-content-between`}>
                    <i className="icon user" />
                    User & Moderation
                </li>
                <li className={ `d-flex justify-content-between`}>
                    <i className="icon site" />
                    Site & Content
                </li>
            </ul>
            <div className="body">
                { adminPageCheck('dash') && <DashView />}
                { adminPageCheck('server.client') && <ClientView />}
                { adminPageCheck('server.cms') && <CMSView />}
            </div>
            <footer>
                Mythical Project. All rights reserved<br />
                Developed by RealCosis<br />
                Designed by Laynester
            </footer>
        </div>
    );
}