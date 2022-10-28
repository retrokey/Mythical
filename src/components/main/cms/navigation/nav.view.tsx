import { FC, useCallback } from 'react';
import { PageHooks } from '../../../../core/hooks/page.hooks';
import { ProfileHooks } from '../../../../core/hooks/profile.hooks';
import { SessionHooks } from '../../../../core/hooks/session.hooks';
import { StaffHooks } from '../../../../core/hooks/staff.hooks';

export const NavView: FC<{}> = props => {
    const { changePage } = PageHooks();
    const { getUser } = SessionHooks();
    const { setProfile } = ProfileHooks();
    const { setStaff } = StaffHooks();

    const setPage = useCallback((page: string) => {
        if (page == 'profile') {
            setProfile(getUser().userInfo.username).then(() => {
                changePage('profile', 'Profile of ' + getUser().userInfo.username);
            });
        }

        if (page == 'staff') {
            setStaff().then(() => {
                changePage('staff', 'Staff List');
            })
        }
    }, [ setProfile, getUser, setStaff, changePage ]);

    return (
        <div id="navigation" className="flex flex-col justify-between">
            <div className="flex flex-col items-center">
                <div className="back top-5" onClick={ event => changePage('', 'Nitro') }></div>
            </div>
            <div className="flex flex-col items-center gap-y-[50px]">
                <div className="profile" onClick={ event => setPage('profile') }></div>
                <div className="staff" onClick={ event => setPage('staff') }></div>
                <div className="news"></div>
            </div>
            <div className="flex flex-col items-center">
                <div className="settings bottom-5"></div>
            </div>
        </div>
    );
}