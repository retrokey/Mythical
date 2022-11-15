import { FC, ReactElement, useCallback, KeyboardEvent, useMemo, useRef, useEffect } from 'react';
import { PageProvider } from '../../../../core/providers/page.provider';
import { ProfileProvider } from '../../../../core/providers/profile.provider';
import { SessionProvider } from '../../../../core/providers/session.provider';
import { SidebarView } from '../../../base/sidebar.base';

export const ProfileView: FC<{  }> = props => {
    const { title } = PageProvider();
    const { getUser } = SessionProvider();
    const { setProfile, getProfile } = ProfileProvider();
    const username = useRef<HTMLInputElement>();

    const read = useCallback(() => {
        return getProfile();
    }, [ getProfile ]);

    const getCurrency = useCallback((type: number) => {
        return (read().currency.has(type) ? getProfile().currency.get(type) : 0).toString();
    }, [ getProfile ]);

    const friends = useMemo(() => {
        const items = new Array<ReactElement>();

        for (let friend of read().friends) {
            items.push(<div key={ friend.username } className="group relative flex flex-col justify-center top-[15px]">
                <img src={ 'https://imager.bobbaz.fr/avatarimage.php?figure=' + friend.look + '&headonly=1&head_direction=3' } />
                <div className="absolute text-black dark:text-white hidden w-full group-hover:block font-inter text-center font-semibold h-[15px] leading-[15px] text-[12px] top-[50px]">{ friend.username }</div>
            </div>);
        }

        return items;
    }, [ getProfile ]);

    const rooms = useMemo(() => {
        const items = new Array<ReactElement>();

        for (let room of read().rooms) {
            let counterClass = '';
            if (room.count == 0) {
                counterClass = 'relative w-[51px] h-[29px] rounded-[10px] text-count-light dark:text-count-dark is0 flex justify-around items-center top-[30%]';
            } else {
                counterClass = 'relative w-[51px] h-[29px] rounded-[10px] bg-not0 flex justify-around items-center top-[30%]';
            }
            items.push(<div key={ room.name } className="relative w-[292px] h-[80px] flex justify-around">
                <img className="relative h-full w-[80px] rounded-[6px]" src={ room.thumbnail } />
                <div className="relative w-[88px] h-[17px] leading-[17px] font-inter font-semibold text-14px text-black dark:text-white top-[30%]">{ room.name }</div>
                <div className={ counterClass }>
                    <div className="relative w-[7px] h-[7px] bg-count"></div>
                    <div className="relative w-[16px] h-[15px] leading-[15px] font-inter font-semibold text-[12px] text-black dark:text-white">{ room.count }</div>
                </div>
            </div>);
        }

        return items;
    }, [ getProfile ]);

    const search = useCallback((event: KeyboardEvent) => { 
        if (event.key == 'Enter' || event.key == 'NumpadEnter') {
            setProfile(username.current.value)
            .then(() => {
                title('Profile of ' + username.current.value);
            });
        }

        if (event.key == 'Backspace') {
            if (username.current.value.length == 0) {
                setProfile(getUser().userInfo.username)
                .then(() => {
                    title('Profile of ' + getUser().userInfo.username);
                });
            }
        }
    }, [ setProfile ]);

    return (
    <SidebarView classList={ "absolute flex flex-col items-center mobileSmall:w-[411px] mobileSmall:h-[calc(100%-80px)] mobileSmall:top-[80px] laptop:w-[411px] laptop:h-screen laptop:top-0 laptop:left-[80px] overflow-y-auto bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 rounded-r-[10px] z-[2] backdrop-blur-[5px]" }>
        <div className="absolute top-5 rounded-[10px] w-[336px] h-[53px] bg-white dark:bg-black">
            <div className="absolute w-[24px] h-[24px] left-4 top-4 bg-search"></div>
            <input ref={ username } onKeyDown={ event => search(event) } className="absolute outline-none w-5/6 h-[17px] leading-[17px] dark:bg-black text-black bg-white dark:text-white font-inter font-semibold text-[14px] left-12 top-5" type="text"  placeholder="Search users..." />
        </div>
        <div className="absolute top-12 w-full h-[220px]">
            <img className="absolute w-[128px] h-full left-0" src={ "https://imager.bobbaz.fr/avatarimage.php?figure=" + read().userInfo.look +  "&direction=2&head_direction=3&gesture=sml&action=wav&size=l" } />
            <div className="text-black dark:text-white absolute w-[79px] left-32 top-[86px] h-[31px] font-inter font-bold text-[26px] leading-[31px]">{ read().userInfo.username }</div>
            <div className="text-black dark:text-white absolute w-[138px] h-[18px] top-[120px] left-32 leading-[18px] font-inter font-semibold text-[15px] text-opacity-80">{ read().userInfo.motto }</div>
        </div>
        <div className="absolute w-[336px] h-[93px] top-[230px] flex justify-between ">
            <div className="relative w-[105px] h-full flex flex-col items-center justify-center bg-white dark:bg-black rounded-[10px]">
                <div className="relative text-center text-credits font-inter font-semibold text-[16px] leading-[19px] h-[19px] w-[54px]">
                    { getCurrency(1) }
                </div>
                <div className="relative w-[20px] h-[20px] bg-credits-url"></div>
            </div>
            <div className="relative w-[105px] h-full flex flex-col items-center justify-center bg-white dark:bg-black rounded-[10px]">
                <div className="relative text-center text-duckets font-inter font-semibold text-[16px] leading-[19px] h-[19px] w-[54px]">
                    { getCurrency(0) }
                </div>
                <div className="relative w-[20px] h-[20px] bg-duckets-url"></div>
            </div>
            <div className="relative w-[105px] h-full flex flex-col items-center justify-center bg-white dark:bg-black rounded-[10px]">
                <div className="relative text-center text-diamonds font-inter font-semibold text-[16px] leading-[19px] h-[19px] w-[54px]">
                    { getCurrency(5) }
                </div>
                <div className="relative w-[19px] h-[19px] bg-diamonds-url"></div>
            </div>
        </div>
        <div className="absolute top-[350px] w-[327px] h-[154px]">
            <div className="absolute h-[19px] font-inter font-semibold text-[16px] leading-[19px]">Friends</div>
            <div className="bg-white h-[85px] w-full absolute dark:bg-black flex flex-row justify-around top-[35px] rounded-[10px]">
                { friends }
            </div>
        </div>
        <div className="absolute top-[500px] w-[327px] h-[266px]">
            <div className="absolute h-[19px] font-inter font-semibold text-[16px] leading-[19px]">Rooms</div>
            <div className="bg-white h-[233px] w-full absolute dark:bg-black flex flex-col justify-around top-[35px] rounded-[10px]">
                { rooms }
            </div>
        </div>
    </SidebarView>
    );
}