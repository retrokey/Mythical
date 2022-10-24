import { FC, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainView } from './components/main/main.view';
import { AdminView } from './components/admin/admin.view';
import { SessionHooks } from './core/hooks/session.hooks';
import { PageHooks } from './core/hooks/page.hooks';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainView />
    },
    {
        path: "admin",
        element: <AdminView />
    },
]);

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
        <RouterProvider router={ router } />
    );
}