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

        if (page == 'news') {
            title('News Archive');
            change('news');
        }
    }, [ change, title ]);

    const setNitro = useCallback(() => {
        title('Nitro');
        change('');
    }, [ change, title ]);

    return (
        <div className="absolute top-0 left-0 bg-white dark:bg-black flex justify-between laptop:flex-col laptop:w-[5.8%] laptop:h-screen mobileSmall:flex-row mobileSmall:w-screen mobileSmall:h-[10.9%]">
            <div className="flex items-center mobileSmall:flex-row laptop:flex-col">
                <div className="relative bg-back-light dark:bg-back-dark w-[28px] h-[16px] mobileSmall:left-5 laptop:left-0 laptop:top-5" onClick={ event => setNitro() }></div>
            </div>
            <div className="flex items-center mobileLarge:flex-row mobileSmall:gap-x-[50px] laptop:flex-col laptop:gap-y-[50px]">
                <div className="relative bg-profile-light dark:bg-profile-dark w-[48px] h-[40px]" onClick={ event => setPage('profile') }></div>
                <div className="relative bg-staff-light dark:bg-staff-dark w-[40px] h-[32px]" onClick={ event => setPage('staff') }></div>
                <div className="relative bg-news-light dark:bg-news-dark w-[36px] h-[38px]" onClick={ event => setPage('news') }></div>
            </div>
            <div className="flex items-center mobileSmall:flex-row laptop:flex-col">
                <div className="relative bg-settings-light dark:bg-settings-dark w-[32px] h-[32px] mobileSmall:right-5 laptop:right-0 laptop:bottom-5"></div>
            </div>
        </div>
    );
}
