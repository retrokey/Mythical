import { FC, ReactElement, useCallback, useEffect, useMemo } from 'react';
import { ConfigManager } from '../../../core/config/config.manager';
import { PageHooks } from '../../../core/hooks/page.hooks';
import { ProfileHooks } from '../../../core/hooks/profile.hooks';
import { StaffHooks } from '../../../core/hooks/staff.hooks';

export const StaffView: FC<{  }> = props => {
    const configManager: ConfigManager = new ConfigManager();
    const { getStaff } = StaffHooks();
    const { changePage } = PageHooks();
    const { setProfile } = ProfileHooks();

    useEffect(() => {
        document.title = configManager.config.mythical.name + ' - Lista Staff';
    }, [  ]);

    const showProfile = useCallback((username: string) => {
        setProfile(username)
        .then(() => {
            changePage('profile');
        });
    }, [ setProfile, changePage ]);

    const fou = useMemo(() => {
        let items: Array<ReactElement> = new Array<ReactElement>();

        if (getStaff().fou.length == 0) {
            items.push(<p key="no-mod">Non ci sono moderatori!</p>);
        } else {
            for (let [index, staffer] of getStaff().fou.entries()) {
                let status: string = staffer.status == '0' ? 'offline' : 'online';
                items.push(<div key={ 'fou-' + index } className="col-4">
                    <a className="staff-box" onClick={ event => showProfile(staffer.username) }>
                        <div className="staff-header">
                            <div className="image"></div>
                            <div className="overlay">
                                <div className="work">{ staffer.role }</div>
                                <div className="username">{ staffer.username }</div>
                            </div>
                        </div>
                        <div className="avatarimage" style={ {backgroundImage:'url(https://www.habbo.de/habbo-imaging/avatarimage?figure=' + staffer.look + '&size=l)'} }></div>
                        <div className="png d-flex flex-row justify-content-center">
                            <div className="motto">{ staffer.motto }</div>
                            <div className={ "status " + status }></div>
                        </div>
                    </a>
                </div>);
            }
        }

        return items;
    }, [  ]);

    const adm = useMemo(() => {
        let items: Array<ReactElement> = new Array<ReactElement>();

        if (getStaff().adm.length == 0) {
            items.push(<p key="no-mod">Non ci sono moderatori!</p>);
        } else {
            for (let [index, staffer] of getStaff().adm.entries()) {
                let status: string = staffer.status == '0' ? 'offline' : 'online';
                items.push(<div key={ 'adm-' + index } className="col-4">
                    <a className="staff-box" onClick={ event => showProfile(staffer.username) }>
                        <div className="staff-header">
                            <div className="image"></div>
                            <div className="overlay">
                                <div className="work">{ staffer.role }</div>
                                <div className="username">{ staffer.username }</div>
                            </div>
                        </div>
                        <div className="avatarimage" style={ {backgroundImage:'url(https://www.habbo.de/habbo-imaging/avatarimage?figure=' + staffer.look + '&size=l)'} }></div>
                        <div className="png d-flex flex-row justify-content-center">
                            <div className="motto">{ staffer.motto }</div>
                            <div className={ "status " + status }></div>
                        </div>
                    </a>
                </div>);
            }
        }

        return items;
    }, [  ]);
 
    const mod = useMemo(() => {
        let items: Array<ReactElement> = new Array<ReactElement>();

        if (getStaff().mod.length == 0) {
            items.push(<p key="no-mod">Non ci sono moderatori!</p>);
        } else {
            for (let [index, staffer] of getStaff().mod.entries()) {
                let status: string = staffer.status == '0' ? 'offline' : 'online';
                items.push(<div key={ 'mod-' + index } className="col-4">
                    <a className="staff-box" onClick={ event => showProfile(staffer.username) }>
                        <div className="staff-header">
                            <div className="image"></div>
                            <div className="overlay">
                                <div className="work">{ staffer.role }</div>
                                <div className="username">{ staffer.username }</div>
                            </div>
                        </div>
                        <div className="avatarimage" style={ {backgroundImage:'url(https://www.habbo.de/habbo-imaging/avatarimage?figure=' + staffer.look + '&size=l)'} }></div>
                        <div className="png d-flex flex-row justify-content-center">
                            <div className="motto">{ staffer.motto }</div>
                            <div className={ "status " + status }></div>
                        </div>
                    </a>
                </div>);
            }
        }

        return items;
    }, [  ]);

    return (
        <div className="d-flex justify-content-center">
            <div id="box">
                <div className="header">
                    Lista Staff
                </div>
                <div className="content">
                    <div id="section_name">FONDATORI</div>
                    <div className="row">
                        { fou }
                    </div>
                    <div id="section_name">AMMINISTRATORI</div>
                    <div className="row">
                        { adm }
                    </div>
                    <div id="section_name">MODERATORI</div>
                    <div className="row">
                        { mod }
                    </div>
                </div>
            </div>
        </div>
    );
}