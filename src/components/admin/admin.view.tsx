import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHooks } from '../../core/hooks/page.hooks';
import { SessionHooks } from '../../core/hooks/session.hooks';
import { ConfigManager } from '../../core/manager/config.manager';
import { DashView } from './dash/dash.view';
import { ClientView } from './server/client.view';

export const AdminView: FC<{  }> = props => {
    const configManager = new ConfigManager();
    const { adminPageCheck, adminChangePage } = PageHooks();
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
            <div className="row">
                <div className="col-12">
                    <div className="hk_navigation">
                        <ul className="d-flex">
                            <li id="dashboard" onClick={ event => adminChangePage('dash', 'Dashboard') }>Dashboard</li>
                            <li id="server" onClick={ event => adminChangePage('server.client', 'Server: Client Settings') }>Server</li>
                            <li id="site">Site & Content</li>
                            <li id="user">Users & Moderation</li>
                            <li id="back"><Link to="/">Users & Moderation</Link></li>
                        </ul>
                    </div>
                    <div className="hk_welcome">
                        <span>{ configManager.config.mythical.name } || Housekeeping</span>
                        <span className="right">Welcome, <b>{ getUser().userInfo.username }</b>!</span>
                    </div>
                    <div className="hk_body">
                        { adminPageCheck('dash') && <DashView />}
                        { adminPageCheck('server.client') && <ClientView />}
                    </div>
                </div>
            </div>
            <footer className="text-center">
                Mythical Project. All rights reserved<br />
                Developed by RealCosis<br />
                Designed by Laynester
            </footer>
        </div>
    );
}