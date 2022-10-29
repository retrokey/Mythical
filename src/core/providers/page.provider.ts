import { useState } from 'react';
import { useBetween } from 'use-between';

const page = () => {
    const [ pageNow, setPageNow] = useState<string>('');

    const title = (title: string) => {
        document.title = 'Mythical - ' + title;
    }
    const change = (page: string) => {
        setPageNow(page);
    }

    const check = (page: string) => {
        return pageNow == page ? true : false;
    }

    return { title, change, check }
}
export const PageProvider = () => useBetween(page);