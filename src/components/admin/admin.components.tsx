import { FC, useCallback, useEffect } from 'react';
import { PageProvider } from '../../core/providers/page.provider';
import { DashboardView } from './views/dashboard.view';
import { NewsView } from './views/news.view';

export const Admin: FC<{  }> = props => {
    const { changeAdmin, checkAdmin } = PageProvider();

    useEffect(() => {
        change('dashboard');
    }, [  ]);

    const change = useCallback((page: string) => {
        changeAdmin(page);
    }, [ changeAdmin ]);

    return (
        <div className="container px-[1.5rem] bg-gray bg-opacity-75 h-full">
            <ul className="flex absolute top-[25px] w-auto h-[35px]">
                <li onClick={ event => change('dashboard') } className="flex bg-white w-auto cursor-pointer py-[5px] px-[10px] border-b-0 border-[1px] border-black">
                    <i className="w-[24px] h-[24px] bg-dash"></i>
                    Dashboard
                </li>
                <li onClick={ event => change('site.news') } className="flex bg-white w-auto cursor-pointer py-[5px] px-[10px] border-b-0 border-[1px] border-black">
                    <i className="w-[24px] h-[24px] bg-site"></i>
                    Site & Content
                </li>
            </ul>
            <div className="relative top-[60px] w-full h-auto p-[1%] bg-white border-[1px] border-black">
                { checkAdmin('dashboard') && <DashboardView /> }
                { checkAdmin('site.news') && <NewsView /> }
            </div>
            <footer className="relative text-white text-center text-[12px] font-inter font-normal top-[70px]">
                Mythical Project. All rights reserved.<br />
                Developed by RealCosis.<br />
            </footer>
        </div>
    );
}