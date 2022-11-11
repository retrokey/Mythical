import { FC, useCallback, useEffect, useRef, useState, MutableRefObject } from 'react';
import { RequestManager } from '../../../../core/manager/request.manager';
import { PageProvider } from '../../../../core/providers/page.provider';
import { SessionProvider } from '../../../../core/providers/session.provider';
import { SettingsProvider } from '../../../../core/providers/settings.provider';
import { SidebarView } from '../../../base/sidebar.base';

interface SettingsProps {
    mythical: MutableRefObject<HTMLDivElement>
}

export const SettingsView: FC<SettingsProps> = props => {
    const requestManager: RequestManager = new RequestManager();
    const { getUser } = SessionProvider();
    const { getUserSettings } = SettingsProvider();
    const hotel = useRef<HTMLDivElement>();
    const account = useRef<HTMLDivElement>();
    const cms = useRef<HTMLDivElement>();
    const [ section, setSection ] = useState<string>('');
    const [ dark, setDark ] = useState<boolean>(false); 
    const [ following, setFollowing ] = useState<boolean>(getUserSettings().hotel.get('blockFollowing') != '1');
    const [ friends, setfriends ] = useState<boolean>(getUserSettings().hotel.get('blockFriendsRequest') != '1');
    const [ alert, setAlert ] = useState<boolean>(getUserSettings().hotel.get('blockAlerts') != '1');

    useEffect(() => {
        setFocus('hotel');
    }, [  ]);

    const setFocus = useCallback((section: string) => {
        switch (section) {
            case 'hotel':
                cms.current.classList.remove('bg-opacity-100');
                cms.current.classList.add('bg-opacity-70');
                account.current.classList.remove('bg-opacity-100');
                account.current.classList.add('bg-opacity-70');
                hotel.current.classList.add('bg-opacity-100');
                hotel.current.classList.remove('bg-opacity-70');
                setSection('hotel');
            break;
            case 'account':
                hotel.current.classList.remove('bg-opacity-100');
                hotel.current.classList.add('bg-opacity-70');
                cms.current.classList.remove('bg-opacity-100');
                cms.current.classList.add('bg-opacity-70');
                account.current.classList.add('bg-opacity-100');
                account.current.classList.remove('bg-opacity-70');
                setSection('account');
            break;
            case 'cms':
                hotel.current.classList.remove('bg-opacity-100');
                hotel.current.classList.add('bg-opacity-70');
                account.current.classList.remove('bg-opacity-100');
                account.current.classList.add('bg-opacity-70');
                cms.current.classList.add('bg-opacity-100');
                cms.current.classList.remove('bg-opacity-70');
                setSection('cms');
            break;
        }
    }, [ hotel, account, cms ]);

    const darkMode = useCallback((option: number) => {
        if (option == 1) {
            props.mythical.current.classList.add('dark');
            setDark(true);
        } else {
            props.mythical.current.classList.remove('dark');
            setDark(false);
        }
    }, [ props.mythical ]);

    const change = useCallback((type: string, option: '0' | '1') => {
        let body = {};

        switch (type) {
            case 'following':
                body = {
                    following: option
                }
                if (option == '1') {
                    setFollowing(false);
                } else {
                    setFollowing(true);
                }
            break;
            case 'friends':
                body = {
                    friendrequests: option
                }
                if (option == '1') {
                    setfriends(false);
                } else {
                    setfriends(true);
                }
            break;
            case 'alerts':
                body = {
                    alerts: option
                }
                if (option == '1') {
                    setAlert(false);
                } else {
                    setAlert(true);
                }
            break;
        }

        requestManager.post('user/settings/' + getUser().userInfo.id + '/update', {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        }, body);
    }, [ getUserSettings, getUser ]);

    return (
    <SidebarView classList={ "absolute flex flex-col items-center mobileSmall:w-[411px] mobileSmall:h-[calc(100%-80px)] mobileSmall:top-[80px] laptop:w-[411px] laptop:h-screen laptop:top-0 laptop:left-[80px] overflow-y-auto bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 rounded-r-[10px] z-[2] backdrop-blur-[5px]" }>
        <div className="relative w-full h-auto top-5">
            <div className="relative dark:text-white text-black h-[19px] top-0 font-inter font-semibold text-[16px] text-center leading-[19px]">Settings</div>
        </div>
        <div className="relative justify-center flex w-[327px] h-[33px] top-12">
            <div ref={ hotel } onClick={ event => setFocus('hotel') } className="relative text-center border-none w-[100px] p-[5px] h-full top-0 rounded-tl-[8px] bg-opacity-70 bg-white text-black dark:text-white dark:bg-black font-inter font-bold text-[13px] leading-[19px] border">Hotel</div>
            <div ref={ account } onClick={ event => setFocus('account') } className="disabled relative text-center border-none w-[100px] p-[5px] h-full top-0 bg-opacity-70 bg-white text-black dark:text-white dark:bg-black font-inter font-bold text-[13px] leading-[19px] border">Account</div>
            <div ref={ cms } onClick={ event => setFocus('cms') } className="relative text-center border-none w-[100px] p-[5px] h-full top-0 rounded-tr-[8px] bg-opacity-70 bg-white text-black dark:text-white dark:bg-black font-inter font-bold text-[13px] leading-[19px] border">CMS</div>
        </div>
        <div className="relative p-[20px] justify-between rounded-[10px] flex flex-col w-[327px] h-auto top-12 bg-white dark:bg-black">
            { section == 'hotel' &&<>
            <div className="relative flex flex-col justify-around w-full h-[113px]">
                <div className="relative w-auto h-[16px] text-black dark:text-white top-0 font-inter font-semibold text-[13px] line-height leading-[16px]">Following</div>
                <div className="flex justify-between">
                    { !following &&
                    <i onClick={ event => change('following', '0') } className="relative rounded-[10px] w-[17px] h-[17px] bg-black bg-opacity-[0.15] dark:bg-white dark:bg-opacity-[0.15]"></i>
                    }
                    { following &&
                    <i onClick={ event => change('following', '1') } className="relative rounded-[10px] w-[17px] h-[17px] bg-[#4ADE80] dark:bg-[#4ADE80]"></i>
                    }
                    <div className="relative w-[188px] h-[32px] leading-[16px] text-[13px] font-inter font-medium text-black dark:text-white">My friends can follow me</div>
                </div>
            </div>
            <div className="relative flex flex-col justify-around w-full h-[113px]">
                <div className="relative w-auto h-[16px] text-black dark:text-white top-0 font-inter font-semibold text-[13px] line-height leading-[16px]">Friend Requests</div>
                <div className="flex justify-between">
                    { !friends &&
                    <i onClick={ event => change('friends', '0') } className="relative rounded-[10px] w-[17px] h-[17px] bg-black bg-opacity-[0.15] dark:bg-white dark:bg-opacity-[0.15]"></i>
                    }
                    { friends &&
                    <i onClick={ event => change('friends', '1') } className="relative rounded-[10px] w-[17px] h-[17px] bg-[#4ADE80] dark:bg-[#4ADE80]"></i>
                    }
                    <div className="relative w-[188px] h-[32px] leading-[16px] text-[13px] font-inter font-medium text-black dark:text-white">The other players can be added me to friends</div>
                </div>
            </div>
            <div className="relative flex flex-col justify-around w-full h-[113px]">
                <div className="relative w-auto h-[16px] text-black dark:text-white top-0 font-inter font-semibold text-[13px] line-height leading-[16px]">Alerts</div>
                <div className="flex justify-between">
                    { !alert &&
                    <i onClick={ event => change('alerts', '0') } className="relative rounded-[10px] w-[17px] h-[17px] bg-black bg-opacity-[0.15] dark:bg-white dark:bg-opacity-[0.15]"></i>
                    }
                    { alert &&
                    <i onClick={ event => change('alerts', '1') } className="relative rounded-[10px] w-[17px] h-[17px] bg-[#4ADE80] dark:bg-[#4ADE80]"></i>
                    }
                    <div className="relative w-[188px] h-[32px] leading-[16px] text-[13px] font-inter font-medium text-black dark:text-white">I want to see alerts in client</div>
                </div>
            </div>
            </>}
            { section == 'account' &&
            <div className="relative w-auto h-[16px] text-black dark:text-white top-0 font-inter font-semibold text-[13px] line-height leading-[16px]">WIP</div>
            }
            { section == 'cms' &&
            <div className="relative flex flex-col justify-around w-full h-[113px]">
                <div className="relative w-auto h-[16px] text-black dark:text-white top-0 font-inter font-semibold text-[13px] line-height leading-[16px]">Dark Mode</div>
                <div className="flex justify-between">
                    { !dark &&
                    <i onClick={ event => darkMode(1) } className="relative rounded-[10px] w-[17px] h-[17px] bg-black bg-opacity-[0.15] dark:bg-white dark:bg-opacity-[0.15]"></i>
                    }
                    { dark &&
                    <i onClick={ event => darkMode(0) } className="relative rounded-[10px] w-[17px] h-[17px] bg-[#4ADE80] dark:bg-[#4ADE80]"></i>
                    }
                    <div className="relative w-[188px] h-[32px] leading-[16px] text-[13px] font-inter font-medium text-black dark:text-white">I want to see the cms in dark mode</div>
                </div>
            </div>
            }
        </div>
    </SidebarView>)
}