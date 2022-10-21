import { useBetween } from 'use-between';
import { ConfigManager } from '../manager/config.manager';
import { useState } from 'react';

const PageHooksState = () => {
    const configManager: ConfigManager = new ConfigManager();
    const [ pageNow, setPageNow ] = useState<string>('');
    const [ admin, setAdmin ] = useState<boolean>(false);

    const changePage = (page: string, title: string) => {
        document.title = configManager.config.mythical.name + ' - ' + title;
        setPageNow(page);
    }

    const pageCheck = (page: string) => {
        return pageNow == page ? true : false;
    }

    const setNitro = () => {
        if (!pageCheck('')) {
            changePage('', 'Nitro');
        }
    }

    const clearPage = () => {
        changePage('', 'Welcome');
    }

    const changeAdminState = (state: boolean) => {
        setAdmin(state);
    }

    const adminCheck = () => {
        return admin == true;
    }

    return { changePage, pageCheck, setNitro, clearPage, changeAdminState, adminCheck };
}

export const PageHooks = () => useBetween(PageHooksState);