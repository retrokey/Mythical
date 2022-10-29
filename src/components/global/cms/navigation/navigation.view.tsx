import { FC, useCallback } from 'react';
import { PageProvider } from '../../../../core/providers/page.provider';
import { ProfileProvider } from '../../../../core/providers/profile.provider';
import { SessionProvider } from '../../../../core/providers/session.provider';
import { StaffProvider } from '../../../../core/providers/staff.provider';

export const NavigationView: FC<{}> = props => {
    const { change, title } = PageProvider();
    const { setProfile } = ProfileProvider();
    const { setStaff } = StaffProvider();
    const { getUser } = SessionProvider();

    const setPage = useCallback((page: string) => {
        if (page == 'profile') {
            setProfile(getUser().userInfo.username)
            .then(() => {
                title('Profile of ' + getUser().userInfo.username);
                change('profile');
            });
        }

        if (page == 'staff') {
            setStaff()
            .then(() => {
                title('Staff List');
                change('staff');
            });
        }
    }, [ change, title ]);

    const setNitro = useCallback(() => {
        title('Nitro');
        change('');
    }, [ change, title ]);

    return (
        <div className="absolute top-0 left-0 w-20 h-screen bg-white dark:bg-black flex flex-col justify-between">
            <div className="flex flex-col items-center">
                <div className="absolute bg-back-light dark:bg-back-dark w-14px h-8px top-5" onClick={ event => setNitro() }></div>
            </div>
            <div className="flex flex-col items-center gap-y-50px">
                <div className="relative bg-profile-light dark:bg-profile-dark w-24px h-20px" onClick={ event => setPage('profile') }></div>
                <div className="relative bg-staff-light dark:bg-staff-dark w-20px h-16px" onClick={ event => setPage('staff') }></div>
                <div className="relative bg-news-light dark:bg-news-dark w-18px h-19px"></div>
            </div>
            <div className="flex flex-col items-center">
                <div className="absolute bg-settings-light dark:bg-settings-dark w-16px h-16px bottom-5"></div>
            </div>
        </div>
    );
}
