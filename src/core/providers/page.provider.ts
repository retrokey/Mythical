import { useState } from 'react';
import { useBetween } from 'use-between';
import { ConfigManager } from '../manager/config.manager';

const page = () => {
    const configManager: ConfigManager = new ConfigManager();
    const [ pageNow, setPageNow] = useState<string>('');

    const title = (title: string) => {
        document.title = configManager.config.name + ' - ' + title;
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