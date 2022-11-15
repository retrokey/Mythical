import { FC, useCallback, useRef } from 'react';
import { PageProvider } from '../../../core/providers/page.provider';
import { SessionProvider } from '../../../core/providers/session.provider';
import { Admin } from '../../admin/admin.components';
import { NavigationView } from './navigation/navigation.view';
import { NewsView } from './news/news.view';
import { NitroView } from './nitro/nitro.view';
import { ProfileView } from './profile/profile.view';
import { SettingsView } from './settings/settings.view';
import { StaffView } from './staff/staff.view';

export const CMSView: FC<{  }> = props => {
    const { check, title, changeSection, checkSection } = PageProvider();
    const { getUser, removeUser } = SessionProvider();
    const mythical = useRef<HTMLDivElement>();

    const logout = useCallback(() => {
        removeUser();
        title('Welcome!');
    }, [  ])

    return (
    <div ref={ mythical } className="bg-gray dark:bg-gray bg-opacity-75 w-screen h-screen">
        <NavigationView />
        <div className="absolute w-[10%] mobileSmall:right-[25%] mobileSmall:top-[10.8%] laptop:top-0 laptop:right-[16%] py-[3px] px-[5px] h-auto z-[2]">
            <div onClick={ event => logout()} className="absolute cursor-pointer w-full h-[25px] top-[5px] rounded-[6px] leading-[25px] text-[13px] text-center text-white dark:text-black font-inter font-semibold border-[1px] border-black dark:border-white border-[solid] bg-purple shadow-dc">
                LOGOUT
            </div>
            { getUser().permission.get('admin.login') &&
            <div onClick={ event => changeSection('admin') } className="absolute cursor-pointer w-full h-[25px] top-[35px] rounded-[6px] leading-[25px] text-[13px] text-center text-white dark:text-black font-inter font-semibold border-[1px] border-black dark:border-white border-[solid] bg-red shadow-adm">
                ADMIN
            </div>
            }
        </div>
        { check('profile') && <ProfileView /> }
        { check('staff') && <StaffView /> }
        { check('news') && <NewsView /> }
        { check('settings') && <SettingsView mythical={ mythical } /> }
        { checkSection('admin') && <Admin /> }
        <NitroView />
    </div>
    );
}