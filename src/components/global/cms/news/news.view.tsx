import { FC, ReactElement, useMemo } from 'react';
import { NewsProvider } from '../../../../core/providers/news.provider';
import { SidebarView } from '../../../base/sidebar.base';

export const NewsView: FC<{  }> = props => {
    const { getNewsLists } = NewsProvider();

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
                <div className="relative w-[10px] h-[16px] left-[110px] bg-arrow-light dark:bg-arrow-dark"></div>
            </div>
            );
        }

        return items;
    }, [  ]);

    return (
    <SidebarView>
        <div className="relative w-full h-auto top-5">
            <div className="relative dark:text-white text-black h-[19px] top-0 font-inter font-semibold text-[16px] text-center leading-[19px]">News Archive</div>
        </div>
        <div className="relative w-full top-[35px] h-auto flex flex-col items-center">
            { lists }
        </div>
    </SidebarView>
    );
}