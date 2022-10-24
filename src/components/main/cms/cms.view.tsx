import { FC } from 'react';
import { PageHooks } from '../../../core/hooks/page.hooks';
import { NavView } from './nav/nav.view';
import { ProfileView } from './profile/profile.view';
import { StaffView } from './staff/staff.view';

export const CMSView: FC<{  }> = props => {
    const { pageCheck } = PageHooks();

    return (
        <>
            <NavView />
            { pageCheck('profile') && <ProfileView />}
            { pageCheck('staff') && <StaffView />}
        </>
    );
}