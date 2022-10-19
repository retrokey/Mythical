import { useState } from 'react';
import { useBetween } from 'use-between';

const PageHooksState = () => {
    const [ pageNow, setPageNow ] = useState<string>('');

    const changePage = (state: string) => {
        setPageNow(state);
    }

    const pageCheck = (page: string) => {
        return pageNow == page ? true : false;
    }

    return { changePage, pageCheck };
}

export const PageHooks = () => useBetween(PageHooksState);