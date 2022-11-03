import { FC } from 'react';
import { Admin } from './components/admin/admin.components';
import { Global } from './components/global/global.components';
import { PageProvider } from './core/providers/page.provider';

export const Mythical: FC<{  }> = props => {
    const { checkSection } = PageProvider();

    return (
        <>
            { checkSection('generic') && <Global /> }
            { checkSection('admin') && <Admin /> }
        </>
    );
}