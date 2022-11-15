import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { NewsInfoDefinition } from '../../../../core/definitions/news-info.definition';
import { NewsProvider } from '../../../../core/providers/news.provider';
import { PageProvider } from '../../../../core/providers/page.provider';
import { SessionProvider } from '../../../../core/providers/session.provider';

export const NewsListView: FC<{}> = props => {
    const { changeAdmin, title } = PageProvider();
    const { hasPermission } = SessionProvider();
    const { removeNews, getNewsLists } = NewsProvider();
    const [ newsList, setNewsList ] = useState<Array<NewsInfoDefinition>>(getNewsLists());
    const [ items, setitems ] = useState<Array<ReactElement>>(null);

    useEffect(() => {
        title('ADMIN: News Manager - List');
    }, [  ]);

    const edit = useCallback((id: number) => {
        sessionStorage.setItem('news', id.toString())
        changeAdmin('news.edit');
    }, [ changeAdmin ]);

    const remove = useCallback((news: NewsInfoDefinition) => {
        setNewsList(getNewsLists().filter(element => element.id != news.id));
        removeNews(news);
    }, [ setNewsList, getNewsLists ]);

    useEffect(() => {
        const items: Array<ReactElement> = new Array<ReactElement>();
        for (let news of newsList) {
            items.push(<tr key={ news.id }>
                <td className="w-[5%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">{ news.id }</td>
                <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">{ news.name }</td>
                <td className="w-[10%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">{ news.author }</td>
                <td className="w-[35%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-center">
                    { hasPermission('admin.news.edit') &&
                    <button onClick={ event => edit(news.id) } className="underline color-black">Edit</button> }
                    { !hasPermission('admin.news.edit') &&
                    <button className="cursor-default underline color-black">Cannot edit</button> }
                    ||
                    { hasPermission('admin.news.delete') &&
                    <button onClick={ event => remove(news) } className="underline color-black">Delete</button>
                    }
                    { !hasPermission('admin.news.delete') &&
                    <button className="cursor-default underline color-black">Cannot delete</button>
                    }
                </td>
            </tr>);
        }
        setitems(items);
    }, [ newsList ]);

    return (
        <div className="w-[100%] h-auto mb-3 col-span-1">
            <div className="w-[100%] h-auto mb-3">
                <div className="bg-[#E2E2E0] border-[1px] border-black">
                    <div className="bg-[#334964] text-center text-[13px] font-inter text-white py-[3px]">News Manager - List</div>
                    <div className="p-[4px]">
                        { hasPermission('admin.news.list') &&
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
                                    { items }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}