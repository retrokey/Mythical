import { FC, useCallback } from 'react';
import { NewsProvider } from '../../../../core/providers/news.provider';
import { PageProvider } from '../../../../core/providers/page.provider';
import { ProfileProvider } from '../../../../core/providers/profile.provider';
import { SessionProvider } from '../../../../core/providers/session.provider';
import { SettingsProvider } from '../../../../core/providers/settings.provider';
import { StaffProvider } from '../../../../core/providers/staff.provider';

export const NavigationView: FC<{}> = props => {
    const { change, title } = PageProvider();
    const { setProfile } = ProfileProvider();
    const { setStaff } = StaffProvider();
    const { setNewsLists } = NewsProvider();
    const { setUserSettings } = SettingsProvider();
    const { getUser } = SessionProvider();

    const setPage = useCallback((page: string) => {
        switch (page) {
            case 'profile':
                setProfile(getUser().userInfo.username)
                .then(() => {
                    title('Profile of ' + getUser().userInfo.username);
                    change('profile');
                });
            break;
            case 'staff':
                setStaff()
                .then(() => {
                    title('Staff List');
                    change('staff');
                });
            break;
            case 'news':
                setNewsLists()
                .then(() => {
                    title('News Archive');
                    change('news');
                });
            break;
            case 'settings':
                setUserSettings(getUser().userInfo.id)
                .then(() => {
                    title('Settings');
                    change('settings');
                })
            break;
        }
    }, [ change, title ]);

    const setNitro = useCallback(() => {
        title('Nitro');
        change('');
    }, [ change, title ]);

    return (
        <div className="absolute top-0 left-0 bg-white dark:bg-black flex justify-between laptop:flex-col laptop:w-[80px] laptop:h-screen mobileSmall:flex-row mobileSmall:w-screen mobileSmall:h-[80px]">
            <div className="flex items-center mobileSmall:flex-row laptop:flex-col">
                <div className="relative cursor-pointer bg-back-light dark:bg-back-dark w-[28px] h-[16px] mobileSmall:left-5 laptop:left-0 laptop:top-5" onClick={ event => setNitro() }></div>
            </div>
            <div className="flex items-center mobileLarge:flex-row mobileSmall:gap-x-[50px] laptop:flex-col laptop:gap-y-[50px]">
                <div className="relative cursor-pointer bg-profile-light dark:bg-profile-dark w-[48px] h-[40px]" onClick={ event => setPage('profile') }></div>
                <div className="relative cursor-pointer bg-staff-light dark:bg-staff-dark w-[40px] h-[32px]" onClick={ event => setPage('staff') }></div>
                <div className="relative cursor-pointer bg-news-light dark:bg-news-dark w-[36px] h-[38px]" onClick={ event => setPage('news') }></div>
            </div>
            <div className="flex items-center mobileSmall:flex-row laptop:flex-col">
                <div className="relative cursor-pointer bg-settings-light dark:bg-settings-dark w-[32px] h-[32px] mobileSmall:right-5 laptop:right-0 laptop:bottom-5" onClick={ event => setPage('settings') }></div>
            </div>
        </div>
    );
}
