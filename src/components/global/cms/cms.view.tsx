import { FC } from 'react';
import { PageProvider } from '../../../core/providers/page.provider';
import { NavigationView } from './navigation/navigation.view';
import { ProfileView } from './profile/profile.view';
import { StaffView } from './staff/staff.view';

export const CMSView: FC<{  }> = props => {
    const { check } = PageProvider();

    return (
    <div className="bg-gray dark:bg-gray bg-opacity-75 w-screen h-screen">
        <NavigationView />
        { check('profile') && <ProfileView /> }
        { check('staff') && <StaffView /> }
    </div>
    );
}