import { FC, useCallback } from 'react';
import { ConfigManager } from '../../../core/config/config.manager';
import { PageHooks } from '../../../core/hooks/page.hooks';
import { ProfileHooks } from '../../../core/hooks/profile.hooks';
import { SessionHooks } from '../../../core/hooks/session.hooks';
import { StaffHooks } from '../../../core/hooks/staff.hooks';

export const NavView: FC<{  }> = props => {
    const configManager: ConfigManager = new ConfigManager();
    const { changePage } = PageHooks();
    const { removeSession, getSession } = SessionHooks();
    const { setProfile } = ProfileHooks();
    const { setStaff } = StaffHooks();
 
    const setPage = useCallback((page: string) => {
        if (page == 'profile') {
            setProfile(getSession().userInfo.username)
            .then(() => {
                changePage('profile');
            });
        }

        if (page == 'staff') {
            setStaff()
            .then(() => {
                changePage('staff');
            })
        }
    }, [ setProfile, getSession, changePage ]);

    const closePage = useCallback(() => {
        document.title = configManager.config.mythical.name + ' - Nitro';
        changePage('');
    }, [  ]);

    const logout = useCallback(() => {
        removeSession();
    }, [ removeSession ]);

    return (
        <div id="sidebar">
            <ul className="components">
                <li className="btn" onClick={ event => setPage('profile') }>
                    <img src="/images/icons/profile.png" className="icon" />
                </li>
                <li className="btn" onClick={ event => setPage('settings') }>
                    <img src="/images/icons/settings.png" className="icon" />
                </li>
                <li className="btn" onClick={ event => setPage('staff') }>
                    <img src="/images/icons/staff.png" className="icon" />
                </li>
                <li className="btn" onClick={ event => setPage('news') }>
                    <img src="/images/icons/news.png" className="icon" />
                </li>
                <li className="btn" onClick={ event => closePage() }>
                    <img src="/images/icons/client.png" className="icon" />
                </li>
                <li className="btn" onClick={ event => logout() }>
                    <img src="/images/icons/exit.png" className="icon" />
                </li>
            </ul>
        </div>
    );
}