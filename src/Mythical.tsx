import { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainView } from './components/main/main.view';
import { AdminView } from './components/admin/admin.view';
import { SessionHooks } from './core/hooks/session.hooks';
import { PageHooks } from './core/hooks/page.hooks';

export const Mythical: FC<{  }> = props => {
    const { onRefresh, setSession } = SessionHooks();
    const { setNitro } = PageHooks();

    useEffect(() => {
        window.addEventListener('load', () => {
            if (onRefresh()) {
                setSession();
                setNitro();
            }
        });
    }, [  ]);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={ <MainView /> } />
                <Route path='admin' element={ <AdminView /> } />
            </Routes>
        </BrowserRouter>
    );
}