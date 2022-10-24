import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHooks } from '../../../../core/hooks/page.hooks';
import { ProfileHooks } from '../../../../core/hooks/profile.hooks';
import { SessionHooks } from '../../../../core/hooks/session.hooks';
import { StaffHooks } from '../../../../core/hooks/staff.hooks';

export const NavView: FC<{  }> = props => {
    const { changePage, setNitro, clearPage } = PageHooks();
    const { removeUser, getUser, checkPermission } = SessionHooks();
    const { setProfile } = ProfileHooks();
    const { setStaff } = StaffHooks();
    const [ adminBtn, setAdminBtn ] = useState<ReactElement>();
 
    useEffect(() => {
        if (checkPermission('admin')) {
            setAdminBtn(
            <Link to="admin">
                <li className="btn">
                    <img src="/images/icons/admin.png" className="icon" />
                </li>
            </Link>);
        }
    }, [ checkPermission, setAdminBtn ]);

    const setPage = useCallback((page: string) => {
        if (page == 'profile') {
            setProfile(getUser().userInfo.username).then(() => {
                changePage('profile', 'Profile of ' + getUser().userInfo.username);
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
    }, [ setProfile, getUser, setStaff, changePage ]);

    const logout = useCallback(() => {
        clearPage();
        removeUser();
    }, [ clearPage, removeUser ]);

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