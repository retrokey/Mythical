import { FC } from 'react';
import { SidebarView } from '../../../base/sidebar.base';

export const NewsView: FC<{  }> = props => {
    return (
    <SidebarView>
        <div className="relative w-full h-auto top-5">
            <div className="relative h-[19px] top-0 font-inter font-semibold text-[16px] text-center leading-[19px]">News Archive</div>
        </div>
    </SidebarView>
    );
}