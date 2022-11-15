import { FC, useCallback, useEffect } from 'react';
import { RequestManager } from '../../core/manager/request.manager';
import { NewsProvider } from '../../core/providers/news.provider';
import { PageProvider } from '../../core/providers/page.provider';
import { SessionProvider } from '../../core/providers/session.provider';
import { DashboardView } from './views/dashboard.view';
import { NewsEditView } from './views/news/news-edit.view';
import { NewsListView } from './views/news/news-list.view';

export const Admin: FC<{}> = props => {
    const requestManager: RequestManager = new RequestManager();
    const { title, changeAdmin, checkAdmin, changeSection } = PageProvider();
    const { getUser, onRefresh, removeUser, registerUser, hasPermission } = SessionProvider();
    const { setNewsLists } = NewsProvider();

    useEffect(() => {
        if (!getUser()) {
            const token: string = onRefresh();
            if (token != undefined) {
                requestManager.get('user/verify', {
                    'token': token
                })
                .then(response => {
                    if (response.status != 'success') {
                        removeUser();
                        return;
                    }

                    let json = response.data;
                    registerUser(json);
                    changeAdmin('dashboard');
                });
            }
        } else {
            changeAdmin('dashboard');
        }
    }, [  ]);

    const change = useCallback(async (page: string) => {
        if (page == 'news.list') {
            await setNewsLists();
        }

        changeAdmin(page);
    }, [ changeAdmin ]);

    if (!getUser()) {
        return (<p className="text-center text-white">Still loading</p>);
    }

    if (!hasPermission('admin.login')) {
        changeSection('generic');
    }

    return (
        <div className="absolute pt-[35px] px-[1.5rem] w-full h-full bg-[#97b4d7] flex flex-row z-[3]">
            <div className="relative w-[200px] h-auto">
                <ul className="bg-[#E2E2E0] p-0">
                    <li onClick={ event => change('dashboard') } className="cursor-pointer text-[13px] font-inter py-[4px] px-[5px] border-[1px] border-b-0 border-black text-black">
                        Dashboard
                    </li>
                    { hasPermission('admin.news') && 
                    <li className="text-[13px] font-inter py-[4px] px-[5px] border-[1px] border-b-0 border-black text-black">
                        News
                        <ul className="pl-[20px] text-[13px] font-inter px-[5px] text-black">
                            { hasPermission('admin.news.list') &&
                            <li onClick={ event => change('news.list') } className="cursor-pointer">
                                List
                            </li>
                            }
                            { hasPermission('admin.news.new') &&
                            <li>Make New</li>
                            }
                        </ul>
                    </li>
                    }
                    { hasPermission('admin.user') &&
                    <li className="text-[13px] font-inter py-[4px] px-[5px] border-[1px] border-b-0 border-black text-black">
                        Users
                        <ul className="pl-[20px] text-[13px] font-inter px-[5px] text-black">
                            { hasPermission('admin.user.list') &&
                            <li>List</li>
                            }
                            { hasPermission('admin.user.ranks') &&
                            <li>Ranks Tool</li>
                            }
                            { hasPermission('admin.user.clone') &&
                            <li>Clone Check</li>
                            }
                            { hasPermission('admin.user.currency') &&
                            <li>Currency Tool</li>
                            }
                        </ul>
                    </li>
                    }
                    { hasPermission('admin.mythical') &&
                    <li className="text-[13px] font-inter py-[4px] px-[5px] border-[1px] border-b-0 border-black text-black">
                        Mythical
                        
                        <ul className="pl-[20px] text-[13px] font-inter px-[5px] text-black">
                            { hasPermission('admin.mythical.permission') &&
                            <li>Permission Manager</li>
                            }
                        </ul>
                    </li>
                    }
                    <li onClick={ event => { title('Nitro'); changeSection('generic') } } className="cursor-pointer text-[13px] font-inter py-[4px] px-[5px] border-[1px] border-black text-black">
                        Return to { window.config.getValue('name') }
                    </li>
                </ul>
            </div>
            <div className="w-full flex flex-col">
                <div className="flex justify-between items-center relative w-full h-[25px] border-[1px] border-black p-[3px 10px] bg-[#385d88]">
                    <span className="left-5 relative text-[13px] text-white">{ window.config.getValue('name') } Housekeeping</span>
                    <span className="right-5 relative text-[13px] text-white">Welcome back, <b>{ getUser().userInfo.username }</b>!</span>
                </div>
                <div className="relative w-full h-auto p-[0.5rem] bg-white border-[1px] border-black">
                    { checkAdmin('dashboard') && <DashboardView /> }
                    { checkAdmin('news.list') && <NewsListView /> }
                    { checkAdmin('news.edit') && <NewsEditView /> }
                </div>
            </div>
        </div>
    );
}