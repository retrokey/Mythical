import { FC } from 'react';

export const NewsView: FC<{  }> = props => {
    return (
    <div className="absolute flex flex-col items-center top-0 left-20 w-411px h-screen overflow-y-auto bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 rounded-r-10px z-2 backdrop-blur-5px">
        <div className="relative w-full h-auto top-5">
            <div className="relative h-19px top-0 font-inter font-semibold text-16px text-center leading-19px">News Archive</div>
        </div>
    </div>
    );
}