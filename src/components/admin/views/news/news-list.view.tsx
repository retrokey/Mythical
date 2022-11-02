import { timeStamp } from 'console';
import { FC, ReactElement, useEffect, useMemo } from 'react';
import { NewsProvider } from '../../../../core/providers/news.provider';
import { PageProvider } from '../../../../core/providers/page.provider';
import { SessionProvider } from '../../../../core/providers/session.provider';

export const NewsListView: FC<{}> = props => {
    const { title } = PageProvider();
    const { getUser } = SessionProvider();
    const { getNewsLists } = NewsProvider();

    useEffect(() => {
        title('ADMIN: News Manager - List');
    }, []);

    const newsList = useMemo(() => {
        const items: Array<ReactElement> = new Array<ReactElement>();

        for (let news of getNewsLists()) {
            items.push(<tr key={news.id}>
                <td className="w-[5%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">{news.id}</td>
                <td className="w-[5%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">{news.name}</td>
                <td className="w-[5%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">{news.author}</td>
                <td className="w-[5%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">Edit | Delete</td>
            </tr>);
        }

        return items;
    }, [ getNewsLists ]);

    return (
        <div className="w-[100%] h-auto mb-3 col-span-1">
            <div className="w-[100%] h-auto mb-3">
                <div className="bg-[#E2E2E0] border-[1px] border-black">
                    <div className="bg-[#334964] text-center text-[13px] font-inter text-white py-[3px]">News Manager - List</div>
                    <div className="p-[4px]">
                        {getUser().permission.get('admin.news.list') &&
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
                                    { newsList }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}