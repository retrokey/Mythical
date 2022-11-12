import { FC, useEffect } from 'react';
import { NewsProvider } from '../../../../core/providers/news.provider';
import { PageProvider } from '../../../../core/providers/page.provider';
import { SessionProvider } from '../../../../core/providers/session.provider';

export const NewsEditView: FC<{  }> = props => {
    const { title } = PageProvider();
    const { getUser } = SessionProvider();
    const { getNewsLists } = NewsProvider();
    const news = getNewsLists().find(element => element.id == parseInt(sessionStorage.getItem('news')));

    useEffect(() => {
        title('ADMIN: News Manager - Edit: ' + news.name);
    }, [  ]);

    return (
        <div className="w-[100%] h-auto mb-3 col-span-1">
            <div className="w-[100%] h-auto mb-3">
                <div className="bg-[#E2E2E0] border-[1px] border-black">
                    <div className="bg-[#334964] text-center text-[13px] font-inter text-white py-[3px]">News Manager - Edit: { news.name }</div>
                    <div className="p-[4px] flex flex-col items-center">
                        { getUser().permission.get('admin.news.edit') && <>
                            <div className="w-[50%] mb-[5px]">
                                <p className="relative text-center w-full">Name</p>
                                <input type="text" className="relative w-full text-center border-[1px] border-[#AABFD6] text-[11px] p-[2px]" value={ news.name } />
                            </div>
                            <div className="w-[50%] mb-[5px]">
                                <p className="text-center w-full">Image</p>
                                <input type="text" className="w-full text-center border-[1px] border-[#AABFD6] text-[11px] p-[2px]" value={ news.image } />
                            </div> 
                            <div className="w-[50%] mb-[5px]">
                                <p className="text-center w-full">Content</p>
                                <textarea>{ news.content }</textarea>
                            </div>
                            <button className="w-[50%] text-[#334964] text-center border-[#EBB534] rounded-[3px] bg-[#FFC439]" type="submit">Save</button>
                        </> }
                    </div>
                </div>
            </div>
        </div>
    );
}