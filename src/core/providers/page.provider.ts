import { useState } from 'react';
import { useBetween } from 'use-between';

const page = () => {
    const [ pageNow, setPageNow ] = useState<string>('');
    const [ adminPage, setAdminPage ] = useState<string>('');
    const [ section, setSection ] = useState<string>('generic');

    const title = (title: string) => {
        document.title = window.config.getValue<string>('name') + ' - ' + title;
    }
    const change = (page: string) => {
        setPageNow(page);
    }

    const check = (page: string) => {
        return pageNow == page ? true : false;
    }

    const changeAdmin = (page: string) => {
        setAdminPage(page);
    }

    const checkAdmin = (page: string) => {
        return adminPage == page ? true : false;
    }

    const changeSection = (section: string) => {
        setSection(section);
    }

    const checkSection = (nowSection: string) => {
        return section == nowSection ? true : false;
    }

    return { title, change, check, changeAdmin, checkAdmin, changeSection, checkSection }
}
export const PageProvider = () => useBetween(page);