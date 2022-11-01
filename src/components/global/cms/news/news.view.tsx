import { FC, ReactElement, useCallback, useMemo, useState } from 'react';
import { RequestManager } from '../../../../core/manager/request.manager';
import { NewsProvider } from '../../../../core/providers/news.provider';
import { PageProvider } from '../../../../core/providers/page.provider';
import { ExtraSidebarView, SidebarView } from '../../../base/sidebar.base';

export const NewsView: FC<{  }> = props => {
    const { title } = PageProvider();
    const { getNewsLists } = NewsProvider();
    const [ newsId, setNewsId ] = useState<number>(0);

    const lists = useMemo(() => {
        const items: Array<ReactElement> = new Array<ReactElement>();

        for (let news of getNewsLists()) {
            items.push(
            <div key={ news.name } className="relative h-[121px] w-[327px] bg-white dark:bg-black rounded-[10px] flex flex-row items-center">
                <img className="relative w-[82px] h-[82px] rounded-[8px] left-[30px] bg-center bg-cover" src={ news.image } />
                <div className="relative w-[94px] h-[35px] left-[50px] flex flex-col">
                    <p className="relative w-full h-[18px] leading-[18px] font-inter font-semibold text-[15px] text-black dark:text-white">{ news.name }</p>
                    <p className="relative w-full h-[18px] leading-[18px] text-opacity-80 dark:text-opacity-80 font-inter font-semibold text-[15px] text-black dark:text-white">{ news.time }</p>
                </div>
                <div onClick={ event => openNews(news.id) } className="relative cursor-pointer w-[10px] h-[16px] left-[110px] bg-arrow-light dark:bg-arrow-dark"></div>
            </div>
            );
        }

        return items;
    }, [  ]);

    const openNews = useCallback((news: number) => {
        setNewsId(news);
        title('News: ' + getNewsLists().find(element => element.id == news).name);
    }, [ setNewsId, getNewsLists ]);

    const getNews = useCallback(() => {
        return getNewsLists().find(element => element.id == newsId);
    }, [ getNewsLists, newsId ]);

    return (
    <>
        <SidebarView classList={ "absolute flex flex-col mobileSmall:w-[411px] mobileSmall:h-[calc(100%-80px)] mobileSmall:top-[80px] laptop:w-[411px] laptop:h-screen laptop:top-0 laptop:left-[80px] ultra:w-[412px] overflow-y-auto bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 z-[2] backdrop-blur-[5px]" }>
            <div className="relative w-full h-auto top-5">
                <div className="relative dark:text-white text-black h-[19px] top-0 font-inter font-semibold text-[16px] text-center leading-[19px]">News Archive</div>
            </div>
            <div className="relative w-full top-[35px] h-auto flex flex-col items-center">
                { lists }
            </div>
        </SidebarView>
        { newsId != 0 &&
        <ExtraSidebarView classList={ "absolute flex flex-col items-center mobileSmall:w-[500px] mobileSmall:h-[calc(100%-80px)] mobileSmall:left-[411px] mobileSmall:top-[80px] laptop:w-[500px] laptop:h-screen laptop:top-0 laptop:left-[491px] ultra:left-[492px] overflow-y-auto bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 rounded-r-[10px] z-[2] backdrop-blur-[5px]" }>
            <div className="h-auto">
                <div className="relative w-[450px] h-[140px] top-5">
                    <img src={ getNews().image } />
                </div>
                <div className="relative w-[450px] p-5 flex flex-col justify-between min-h-[100px] h-auto rounded-[10px] bg-white dark:bg-black">
                    <div className="relative w-full h-[24px] text-[24px] leading-[24px] font-inter font-semibold text-dark text-opacity-90 dark:text-white dark:text-opacity-90">{ getNews().name }</div>
                    <div className="relative w-full h-auto leading-[16px] font-inter font-normal text-dark text-opacity-90 dark:text-white dark:text-opacity-90" dangerouslySetInnerHTML={ { __html: getNews().content } }></div>
                </div>
            </div>
        </ExtraSidebarView>
        }
        { newsId != 0 &&
        <div className="absolute flex flex-col items-center justify-center w-[17px] h-[53px] laptop:top-[80px] z-[2] mobileSmall:top-[160px] mobileSmall:left-[911px] laptop:left-[991px] rounded-r-[10px] bg-white bg-opacity-70">
            <div onClick={ event => setNewsId(0) } className="relative cursor-pointer w-[10px] h-[16px] bg-arrow-light"></div>
        </div>
        }
    </>
    );
}