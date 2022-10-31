import { FC, PropsWithChildren } from 'react';

export const SidebarView: FC<PropsWithChildren<{  }>> = props => {
    return (
    <div className="absolute flex flex-col items-center laptop:top-0 laptop:left-[5.8%] mobileSmall:h-[89%] mobileSmall:top-[10.8%] w-[411px] laptop:h-screen overflow-y-auto bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 rounded-r-[10px] z-[2] backdrop-blur-[5px]">
        { props.children }
    </div>
    );
}