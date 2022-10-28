import { FC, ReactElement, useMemo } from 'react';
import { StaffHooks } from '../../../../core/hooks/staff.hooks';

export const StaffView: FC<{  }> = props => {
    const { getStaff } = StaffHooks();

    const founder = useMemo(() => {
        const items = new Array<ReactElement>();

        if (getStaff().fou.length == 0) {
            items.push(<p key="no-fou" className="no-staff top-[20px]">We doesn't have founders!</p>);
        } else {
            for (let fou of getStaff().fou) {
                let status = fou.status == '1' ? 'online' : 'offline';
                items.push(
                <div key={ fou.username } className="bg staff top-[35px]">
                    <div className="details">
                        <div className="avatarBg top-[20px] left-[30px]"></div>
                        <img className="avatar top-[20px] left-[30px]" src={ "https://imager.bobbaz.fr/avatarimage.php?figure=" + fou.look + "&direction=2&head_direction=3&gesture=sml&action=wav" }></img>
                        <div className="username top-[50px] left-[120px]">{ fou.username }</div>
                        <div className="motto top-[70px] left-[120px]">{ fou.motto }</div>
                    </div>
                    <div className="rank top-[120px] left-[140px]">{ fou.role }</div>
                    <div className={ "status " + status + " top-[120px] left-[290px]" }></div>
                </div>
                );
            }
        }

        return items;
    }, [ getStaff ]);

    const administrator = useMemo(() => {
        const items = new Array<ReactElement>();

        if (getStaff().adm.length == 0) {
            items.push(<p key="no-adm" className="no-staff top-[20px]">We doesn't have administrators!</p>);
        } else {
            for (let adm of getStaff().adm) {
                let status = adm.status == '1' ? 'online' : 'offline';
                items.push(
                <div key={ adm.username }className="bg staff top-[35px]">
                    <div className="details">
                        <div className="avatarBg top-[20px] left-[30px]"></div>
                        <img className="avatar top-[20px] left-[30px]" src={ "https://imager.bobbaz.fr/avatarimage.php?figure=" + adm.look + "&direction=2&head_direction=3&gesture=sml&action=wav" }></img>
                        <div className="username top-[50px] left-[120px]">{ adm.username }</div>
                        <div className="motto top-[70px] left-[120px]">{ adm.motto }</div>
                    </div>
                    <div className="rank top-[120px] left-[140px]">{ adm.role }</div>
                    <div className={ "status " + status + " top-[120px] left-[290px]" }></div>
                </div>
                );
            }
        }

        return items;
    }, [ getStaff ]);

    const moderator = useMemo(() => {
        const items = new Array<ReactElement>();

        if (getStaff().mod.length == 0) {
            items.push(<p key="no-mod" className="no-staff top-[20px]">We doesn't have moderators!</p>);
        } else {
            for (let mod of getStaff().mod) {
                let status = mod.status == '1' ? 'online' : 'offline';
                items.push(
                <div key={ mod.username }className="bg staff top-[35px]">
                    <div className="details">
                        <div className="avatarBg top-[20px] left-[30px]"></div>
                        <img className="avatar top-[20px] left-[30px]" src={ "https://imager.bobbaz.fr/avatarimage.php?figure=" + mod.look + "&direction=2&head_direction=3&gesture=sml&action=wav" }></img>
                        <div className="username top-[50px] left-[120px]">{ mod.username }</div>
                        <div className="motto top-[70px] left-[120px]">{ mod.motto }</div>
                    </div>
                    <div className="rank top-[120px] left-[140px]">{ mod.role }</div>
                    <div className={ "status " + status + " top-[120px] left-[290px]" }></div>
                </div>
                );
            }
        }

        return items;
    }, [ getStaff ]);

    return (
        <div id="sidebar" className="top-0 left-[5%]">
            <div className="staffs top-4 left-[38px]">
                <div className="title">Founders</div>
                { founder }
            </div>
            <div className="staffs top-16 left-[38px]">
                <div className="title">Administrators</div>
                { administrator }
            </div>
            <div className="staffs top-28 left-[38px]">
                <div className="title">Moderators</div>
                { moderator }
            </div>
        </div>
    );
}