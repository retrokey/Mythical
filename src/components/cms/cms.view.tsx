import { FC, useEffect } from 'react';
import { PageHooks } from '../../core/hooks/page.hooks';
import { NavView } from './nav/nav.view';
import { ProfileView } from './profile/profile.view';
import { StaffView } from './staff/staff.view';
import { NewsView } from './news/news.view';
import { SettingsView } from './settings/settings.view';

export const CMSView: FC<{  }> = props => {
    const { pageCheck } = PageHooks();

    return (
        <>
            <NavView></NavView>
            { pageCheck('profile') && <ProfileView></ProfileView>}
            { pageCheck('settings') && <SettingsView></SettingsView>}
            { pageCheck('staff') && <StaffView></StaffView>}
            { pageCheck('news') && <NewsView></NewsView>}
        </>
    );
}