import { FC, ReactElement, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileHooks } from '../../../../core/hooks/profile.hooks';

export const ProfileView: FC<{  }> = props => {
    const { getProfile } = ProfileHooks();

    const getUser = useCallback(() => {
        return getProfile();
    }, [ getProfile ]);

    const getCurrency = useCallback((type: number) => {
        return (getProfile().currency.has(type) ? getProfile().currency.get(type) : 0).toString();
    }, [ getProfile ]);

    const friends = useMemo(() => {
        const items = new Array<ReactElement>();

        for (let friend of getProfile().friends) {
            items.push(<div className="friend flex flex-col justify-center">
                <img className="avatar" src={ 'https://imager.bobbaz.fr/avatarimage.php?figure=' + friend.look + '&headonly=1&head_direction=3&size=l' } />
                <div className="tooltip top-[60px]">{ friend.username }</div>
            </div>);
        }

        return items;
    }, [ getProfile ]);

    return (
        <div id="sidebar" className="top-0 left-[5%]">
            <div className="searchBar top-4 left-9">
                <FontAwesomeIcon className="icon top-4 left-2" icon="magnifying-glass" />
                <input type="text" className="input top-4 left-9" placeholder="Search users..." />
            </div>
            <div className="userDetails top-[92px] left-9">
                <img src={ "https://imager.bobbaz.fr/avatarimage.php?figure=" + getUser().userInfo.look +  "&direction=2&head_direction=3&gesture=sml&action=wav&size=l" } className="avatar top-0 left-0" />
                <div className="username top-[54px] left-48">{ getUser().userInfo.username }</div>
                <div className="motto top-[86px] left-48">{ getUser().userInfo.motto }</div>
                <div className="text top-[119px] left-48">Last Seen:</div>
                <div className="lastSeen top-[139px] left-48">Date</div>
            </div>
            <div className="flex justify-between currencies top-[275px] left-[38px]">
                <div className="currency flex flex-col items-center justify-center">
                    <div className="amount credits">{ getCurrency(1) }</div>
                    <img className="images" src="/images/profile/credits.png" />
                </div>
                <div className="currency flex flex-col items-center justify-center">
                    <div className="amount duckets">{ getCurrency(0) }</div>
                    <img className="images" src="/images/profile/duckets.png" />
                </div>
                <div className="currency flex flex-col items-center justify-center">
                    <div className="amount diamonds">{ getCurrency(5) }</div>
                    <img className="images" src="/images/profile/diamonds.png" />
                </div>
            </div>
            <div className="friends top-[403px] left-[38px]">
                <div className="title">Friends</div>
                <div className="bg flex flex-row justify-around top-[35px]">
                    { friends }
                </div>
            </div>
        </div>
    );
}