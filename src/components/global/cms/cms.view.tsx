import { FC, useCallback } from 'react';
import { PageProvider } from '../../../core/providers/page.provider';
import { SessionProvider } from '../../../core/providers/session.provider';
import { NavigationView } from './navigation/navigation.view';
import { NewsView } from './news/news.view';
import { NitroView } from './nitro/nitro.view';
import { ProfileView } from './profile/profile.view';
import { StaffView } from './staff/staff.view';

export const CMSView: FC<{  }> = props => {
    const { check, title, change } = PageProvider();
    const { removeUser } = SessionProvider();

    const logout = useCallback(() => {
        removeUser();
        title('Welcome!');
    }, [  ])

    return (
    <div className="bg-gray dark:bg-gray bg-opacity-75 w-screen h-screen">
        <NavigationView />
        <div className="absolute w-[10%] mobileSmall:right-[25%] mobileSmall:top-[10.8%] laptop:top-0 laptop:right-[16%] py-[3px] px-[5px] h-auto z-[2]">
            <div onClick={ event => logout()} className="absolute cursor-pointer w-full h-[25px] top-[5px] rounded-[6px] leading-[25px] text-[13px] text-center text-white dark:text-black font-inter font-semibold border-[1px] border-black dark:border-white border-[solid] bg-purple shadow-dc">
                LOGOUT
            </div>
        </div>
        { check('profile') && <ProfileView /> }
        { check('staff') && <StaffView /> }
        { check('news') && <NewsView /> }
        <NitroView />
    </div>
    );
}