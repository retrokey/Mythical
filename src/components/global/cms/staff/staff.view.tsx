import { FC, ReactElement, useMemo } from 'react';
import { StaffProvider } from '../../../../core/providers/staff.provider';

export const StaffView: FC<{  }> = props => {
    const { getStaff } = StaffProvider();

    const founder = useMemo(() => {
        const items: Array<ReactElement> = new Array<ReactElement>();

        if (getStaff().fou.length == 0) {
            items.push(<p key="no-fou" className="first:rounded-t-[10px] last:rounded-b-[10px] absolute text-center text-opacity-80 dark:text-opacity-80 dark:text-white text-black w-full h-[16px] leading-[16px] font-inter font-semibold text-[13px] top-[20px]">We doesn't have moderators!</p>);
        } else {
            for (let staff of getStaff().fou) {
                let status = staff.status == '1' ? 'bg-online' : 'bg-offline';
                items.push(
                <div key={ staff.username } className="first:rounded-t-[10px] last:rounded-b-[10px] flex flex-row items-center bg-white dark:bg-black relative w-[327px] h-[162px]">
                    <div className="absolute w-[168px] h-full top-5">
                        <div className="absolute w-[72px] h-[122px] rounded-[8px] bg-staff-bg top-0 left-[30px]"></div>
                        <img className="absolute w-[64px] h-[110px] top-0 left-[30px]" src={ "https://imager.bobbaz.fr/avatarimage.php?figure=" + staff.look + "&direction=2&head_direction=3&gesture=sml&action=wav" }></img>
                        <div className="absolute w-full h-[19px] leading-[19px] dark:text-white text-black font-inter font-bold top-[25px] left-[120px]">{ staff.username }</div>
                        <div className="absolute w-full h-[16px] leading-[16px] text-opacity-80 dark:text-opacity-80 dark:text-white text-black font-inter font-semibold top-[45px] left-[120px]">{ staff.motto }</div>
                    </div>
                    <div className="absolute text-black dark:text-white text-opacity-80 dark:text-opacity-80 w-[64px] h-[16px] leading-[16px] font-inter font-semibold text-[12px] top-[120px] left-[140px]">{ staff.role }</div>
                    <div className={ "absolute w-[12px] h-[12px] rounded-[100px] " + status + " top-[125px] left-[290px]" }></div>
                </div>
                );
            }
        }

        return items;
    }, [ getStaff ]);

    const admin = useMemo(() => {
        const items: Array<ReactElement> = new Array<ReactElement>();

        if (getStaff().adm.length == 0) {
            items.push(<p key="no-adm" className="absolute text-center text-opacity-80 dark:text-opacity-80 dark:text-white text-black w-full h-16px leading-16px font-inter font-semibold font-13px top-20px">We doesn't have administrators!</p>);
        } else {
            for (let staff of getStaff().adm) {
                let status = staff.status == '1' ? 'bg-online' : 'bg-offline';
                items.push(
                <div key={ staff.username } className="first:rounded-t-[10px] last:rounded-b-[10px] flex flex-row items-center bg-white dark:bg-black relative w-[327px] h-[162px]">
                    <div className="absolute w-[168px] h-full top-5">
                        <div className="absolute w-[72px] h-[122px] rounded-[8px] bg-staff-bg top-0 left-[30px]"></div>
                        <img className="absolute w-[64px] h-[110px] top-0 left-[30px]" src={ "https://imager.bobbaz.fr/avatarimage.php?figure=" + staff.look + "&direction=2&head_direction=3&gesture=sml&action=wav" }></img>
                        <div className="absolute w-full h-[19px] leading-[19px] dark:text-white text-black font-inter font-bold top-[25px] left-[120px]">{ staff.username }</div>
                        <div className="absolute w-full h-[16px] leading-[16px] text-opacity-80 dark:text-opacity-80 dark:text-white text-black font-inter font-semibold top-[45px] left-[120px]">{ staff.motto }</div>
                    </div>
                    <div className="absolute text-black dark:text-white text-opacity-80 dark:text-opacity-80 w-[64px] h-[16px] leading-[16px] font-inter font-semibold text-[12px] top-[120px] left-[140px]">{ staff.role }</div>
                    <div className={ "absolute w-[12px] h-[12px] rounded-[100px] " + status + " top-[125px] left-[290px]" }></div>
                </div>
                );
            }
        }

        return items;
    }, [ getStaff ]);

    const moderator = useMemo(() => {
        const items: Array<ReactElement> = new Array<ReactElement>();

        if (getStaff().mod.length == 0) {
            items.push(<p key="no-mod" className="first:rounded-t-[10px] last:rounded-b-[10px] absolute text-center text-opacity-80 dark:text-opacity-80 dark:text-white text-black w-full h-[16px] leading-[16px] font-inter font-semibold text-[13px] top-[20px]">We doesn't have moderators!</p>);
        } else {
            for (let staff of getStaff().mod) {
                items.push(
                <div key={ staff.username } className="first:rounded-t-[10px] last:rounded-b-[10px] flex flex-row items-center bg-white dark:bg-black relative w-[327px] h-[162px]">
                    <div className="absolute w-[168px] h-full top-5">
                        <div className="absolute w-[72px] h-[122px] rounded-[8px] bg-staff-bg top-0 left-[30px]"></div>
                        <img className="absolute w-[64px] h-[110px] top-0 left-[30px]" src={ "https://imager.bobbaz.fr/avatarimage.php?figure=" + staff.look + "&direction=2&head_direction=3&gesture=sml&action=wav" }></img>
                        <div className="absolute w-full h-[19px] leading-[19px] dark:text-white text-black font-inter font-bold top-[25px] left-[120px]">{ staff.username }</div>
                        <div className="absolute w-full h-[16px] leading-[16px] text-opacity-80 dark:text-opacity-80 dark:text-white text-black font-inter font-semibold top-[45px] left-[120px]">{ staff.motto }</div>
                    </div>
                    <div className="absolute text-black dark:text-white text-opacity-80 dark:text-opacity-80 w-[64px] h-[16px] leading-[16px] font-inter font-semibold text-[12px] top-[120px] left-[140px]">{ staff.role }</div>
                    <div className={ "absolute w-[12px] h-[12px] rounded-[100px] " + status + " top-[125px] left-[290px]" }></div>
                </div>
            );
            }
        }

        return items;
    }, [ getStaff ]);

    return (
    <div className="absolute top-0 left-20 w-[411px] h-screen overflow-y-auto bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 rounded-r-[10px] z-[2] backdrop-blur-[5px]">
        <div className="relative w-full h-auto top-5">
            <div className="relative h-[19px] top-0 font-inter font-semibold text-[16px] text-center leading-[19px]">Founders</div>
            <div className="relative top-5 flex flex-col items-center">
                { founder }
            </div>
        </div>
        <div className="relative w-full h-auto top-12">
            <div className="relative h-[19px] top-0 font-inter font-semibold text-[16px] text-center leading-[19px]">Administrators</div>
            <div className="relative top-5 flex flex-col items-center">
                { admin }
            </div>
        </div>
        <div className="relative w-full h-auto top-40">
            <div className="relative h-[19px] top-0 font-inter font-semibold text-[16px] text-center leading-[19px]">Moderators</div>
            <div className="relative top-5 flex flex-col items-center">
                { moderator }
            </div>
        </div>
    </div>
    );
}