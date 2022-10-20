import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { ConfigManager } from '../../../core/manager/config.manager';
import { PageHooks } from '../../../core/hooks/page.hooks';
import { ProfileHooks } from '../../../core/hooks/profile.hooks';
import { SessionHooks } from '../../../core/hooks/session.hooks';
import { StaffHooks } from '../../../core/hooks/staff.hooks';
import { PermissionManager } from '../../../core/manager/permission.manager';

export const NavView: FC<{  }> = props => {
    const permissionManager: PermissionManager = new PermissionManager();
    const { changePage, setNitro, clearPage } = PageHooks();
    const { removeSession, getSession } = SessionHooks();
    const { setProfile } = ProfileHooks();
    const { setStaff } = StaffHooks();
    const [ adminBtn, setAdminBtn ] = useState<ReactElement>();
 
    const ifAdmin = useCallback(() => {
        permissionManager.getPermission('admin').then((admin: boolean) => {
            console.log(admin);
            if (!admin) {
                return;
            }

            setAdminBtn(<li className="btn" onClick={ event => openAdmin() }>
                <img src="/images/icons/admin.png" className="icon" />
            </li>);
        });
    }, [ permissionManager ]);

    useEffect(() => {
        ifAdmin();
    }, [ ifAdmin ]);

    const setPage = useCallback((page: string) => {
        if (page == 'profile') {
            setProfile(getSession().userInfo.username).then(() => {
                changePage('profile', 'Profile of ' + getSession().userInfo.username);
            });
        }

        if (page == 'settings') {
            changePage('settings', 'Settings');
        }

        if (page == 'staff') {
            setStaff().then(() => {
                changePage('staff', 'Staff List');
            })
        }

        if (page == 'news') {
            changePage('news', 'News Archive');
        }
    }, [ setProfile, setStaff, getSession, changePage ]);

    const logout = useCallback(() => {
        clearPage();
        removeSession();
    }, [ clearPage, removeSession ]);

    const openAdmin = useCallback(() => {
        
    }, [  ]);

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
                <li className="btn" onClick={ event => setNitro() }>
                    <img src="/images/icons/client.png" className="icon" />
                </li>
                <li className="btn" onClick={ event => logout() }>
                    <img src="/images/icons/exit.png" className="icon" />
                </li>
                { adminBtn }
            </ul>
        </div>
    );
}