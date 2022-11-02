import { FC } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Admin } from './components/admin/admin.components';
import { Global } from './components/global/global.components';

export const Mythical: FC<{  }> = props => {
    return (
        <HashRouter>
            <Routes>
                <Route index element={ <Global />} />
                <Route path="/admin" element={ <Admin /> } />
            </Routes>
        </HashRouter>
    );
}