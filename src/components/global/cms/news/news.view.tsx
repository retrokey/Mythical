import { FC, ReactElement, useMemo, useState } from 'react';
import { NewsProvider } from '../../../../core/providers/news.provider';
import { ExtraSidebarView, SidebarView } from '../../../base/sidebar.base';

export const NewsView: FC<{  }> = props => {
    const { getNewsLists } = NewsProvider();
    const [ newsId, setNewsId ] = useState<number>(0);

    const lists = useMemo(() => {
        const items: Array<ReactElement> = new Array<ReactElement>();

        for (let news of getNewsLists()) {
            items.push(
            <div key={ news.name } className="relative h-[121px] w-[327px] bg-white dark:bg-black rounded-[10px] flex flex-row items-center">
                <img className="relative w-[82px] h-[82px] rounded-[8px] left-[30px]" src={ news.image } />
                <div className="relative w-[94px] h-[35px] left-[50px] flex flex-col">
                    <p className="relative w-full h-[18px] leading-[18px] font-inter font-semibold text-[15px] text-black dark:text-white">{ news.name }</p>
                    <p className="relative w-full h-[18px] leading-[18px] text-opacity-80 dark:text-opacity-80 font-inter font-semibold text-[15px] text-black dark:text-white">{ news.time }</p>
                </div>
                <div onClick={ event => setNewsId(news.id) } className="relative cursor-pointer w-[10px] h-[16px] left-[110px] bg-arrow-light dark:bg-arrow-dark"></div>
            </div>
            );
        }

        return items;
    }, [  ]);

    return (
    <>
        <SidebarView classList={ "absolute flex flex-col mobileSmall:h-[89%] mobileSmall:top-[10.8%] laptop:w-[411px] laptop:h-screen laptop:top-0 laptop:left-[80px] ultra:w-[412px] overflow-y-auto bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 z-[2] backdrop-blur-[5px]" }>
            <div className="relative w-full h-auto top-5">
                <div className="relative dark:text-white text-black h-[19px] top-0 font-inter font-semibold text-[16px] text-center leading-[19px]">News Archive</div>
            </div>
            <div className="relative w-full top-[35px] h-auto flex flex-col items-center">
                { lists }
            </div>
        </SidebarView>
        { newsId != 0 &&
        <ExtraSidebarView classList={ "absolute flex flex-col mobileSmall:h-[89%] mobileSmall:top-[10.8%] laptop:w-[500px] laptop:h-screen laptop:top-0 laptop:left-[491px] ultra:left-[492px] overflow-y-auto bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 rounded-r-[10px] z-[2] backdrop-blur-[5px]" }>

        </ExtraSidebarView>
        }
    </>
    );
}