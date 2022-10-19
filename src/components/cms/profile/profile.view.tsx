import { FC, useCallback, useEffect } from 'react';
import { ConfigManager } from '../../../core/config/config.manager';
import { ProfileHooks } from '../../../core/hooks/profile.hooks';

export const ProfileView: FC<{  }> = props => {
    const configManager: ConfigManager = new ConfigManager();
    const { getProfile } = ProfileHooks();

    useEffect(() => {
        document.title = configManager.config.mythical.name + ' - Profile of ' + getUser().userInfo.username;
    }, [  ]);

    const getUser = useCallback(() => {
        return getProfile();
    }, [ getProfile ]);

    const getCurrency = useCallback((type: number) => {
        return (getProfile().currency.has(type) ? getProfile().currency.get(type) : 0).toString();
    }, [ getProfile ]);
 
    return (
        <div className="d-flex justify-content-center">
            <div id="box">
                <div className="header">
                    { 'Profile of ' + getUser().userInfo.username }
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-6">
                            <div className="profile">
                                <div className="bg"></div>
                                <div className="overlay">
                                    <div className="avatar-image" style={{ backgroundImage: 'url(\'https://www.habbo.de/habbo-imaging/avatarimage?figure=' + getUser().userInfo.look + '&size=l\')'} }></div>
                                    <div className="username">{ getUser().userInfo.username }</div>
                                    <div className="motto">{ getUser().userInfo.motto }</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="currency_box">
                                <div className="currency" style={ { backgroundColor: '#e9b124' } }>
                                    <div className="box d-flex flex-column align-items-center">
                                        <img className="wallet" src="/images/profile/wallet/credits.png" />
                                        <div className="txt">{ getCurrency(1) }</div>
                                    </div>
                                </div>
                                <div className="currency" style={ { backgroundColor: '#c44aac' } }>
                                    <div className="box d-flex flex-column align-items-center">
                                        <img className="wallet" src="/images/profile/wallet/duckets.png" />
                                        <div className="txt">{ getCurrency(0) }</div>
                                    </div>
                                </div>
                                <div className="currency" style={ { backgroundColor: '#6caff4' } }>
                                    <div className="box d-flex flex-column align-items-center">
                                        <img className="wallet" src="/images/profile/wallet/diamonds.png" />
                                        <div className="txt">{ getCurrency(5) }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="memberSince">
                                Community member from <b>{ getUser().registration }</b>!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}