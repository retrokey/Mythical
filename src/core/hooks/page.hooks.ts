import { useState } from 'react';
import { useBetween } from 'use-between';
import { ConfigManager } from '../config/config.manager';

const PageHooksState = () => {
    const configManager: ConfigManager = new ConfigManager();
    const [ pageNow, setPageNow ] = useState<string>('');

    const changePage = (page: string, title: string) => {
        document.title = configManager.config.mythical.name + ' - ' + title;
        setPageNow(page);
    }

    const pageCheck = (page: string) => {
        return pageNow == page ? true : false;
    }

    const setNitro = () => {
        if (pageCheck('')) {
            changePage('', 'Nitro');
        }
    }

    const clearPage = () => {
        setPageNow('');
    }

    return { changePage, pageCheck, setNitro, clearPage };
}

export const PageHooks = () => useBetween(PageHooksState);