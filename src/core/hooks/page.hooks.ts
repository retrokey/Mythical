import { useBetween } from 'use-between';
import { ConfigManager } from '../manager/config.manager';
import { useState } from 'react';

const PageHooksState = () => {
    const configManager: ConfigManager = new ConfigManager();
    const [ pageNow, setPageNow ] = useState<string>('');
    const [ adminPageNow, setAdminPageNow ] = useState<string>('');

    const changePage = (page: string, title: string) => {
        document.title = configManager.config.mythical.name + ' - ' + title;
        setPageNow(page);
    }

    const pageCheck = (page: string) => {
        return pageNow == page ? true : false;
    }
    
    const adminChangePage = (page: string, title: string) => {
        document.title = configManager.config.mythical.name + ' | AdminCP - ' + title;
        setAdminPageNow(page);
    }

    const adminPageCheck = (page: string) => {
        return adminPageNow == page ? true : false;
    }

    const adminPageCheckS = (category: string) => {
        return adminPageNow.startsWith(category) ? true : false;
    }

    const setNitro = () => {
        changePage('', 'Nitro');
    }

    return { changePage, pageCheck, setNitro, adminChangePage, adminPageCheckS, adminPageCheck };
}

export const PageHooks = () => useBetween(PageHooksState);