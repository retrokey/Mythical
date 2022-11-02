import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageProvider } from '../../../core/providers/page.provider';
import { SessionProvider } from '../../../core/providers/session.provider';

export const NewsView: FC<{}> = props => {
    const { title } = PageProvider();
    const { getUser } = SessionProvider();

    useEffect(() => {
        title('ADMIN: News Manager - List');
    }, [  ]);

    return (
        <div className="flex flex-row justify-between">
            <div className="w-[23%] h-auto mb-3 col-span-1">
                <ul className="bg-[#E2E2E0] p-0 border-x-[1px] first:border-t-[1px] last:border-b-[1px] border-black">
                    <li className="flex items-center justify-center bg-[#334964] text-[13px] font-inter py-[4px] px-[5px] text-white">
                        <div className="relative w-[10px] h-[11px] bg-[url(/images/admin/menu_title_bullet.gif)]"></div>
                        Content
                    </li>
                    <li className="flex items-center justify-center text-[13px] font-inter px-[5px] text-black">
                        <div className="relative w-[7px] h-[5px] bg-[url(/images/admin/item_bullet.gif)]"></div>
                        News
                    </li>
                </ul>
            </div>
            <div className="w-[75%] h-auto mb-3 col-span-1">
                <div className="w-[100%] h-auto mb-3">
                    <div className="bg-[#E2E2E0] border-[1px] border-black">
                        <div className="bg-[#334964] text-center text-[13px] font-inter text-white py-[3px]">News Manager - List</div>
                        <div className="p-[4px]">
                            { getUser().permission.get('admin.news.list') &&
                            <table className="w-full text-[12px]">
                                <thead>
                                    <tr>
                                        <th className="w-[5%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30">Id</th>
                                        <th className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30">Name</th>
                                        <th className="w-[10%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30">Author</th>
                                        <th className="w-[35%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30">Actions</th>
                                    </tr>
                               </thead>
                               <tbody>
                                    <tr>
                                        <td className="w-[5%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">1</td>
                                        <td className="w-[5%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">Welcome!</td>
                                        <td className="w-[5%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">RealCosis</td>
                                        <td className="w-[5%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">Edit | Delete</td>
                                    </tr>
                               </tbody>
                            </table>
                            }
                            { !getUser().permission.get('admin.news.list') &&  <p className="w-full text-center text-black">You cannot see the news list!</p> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}