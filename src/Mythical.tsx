import { FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainView } from './components/main/main.view';
import { AdminView } from './components/admin/admin.view';

export const Mythical: FC<{  }> = props => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={ <MainView /> } />
                <Route path='admin' element={ <AdminView /> } />
            </Routes>
        </BrowserRouter>
    );
}