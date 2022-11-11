import { FC, ReactElement, useCallback } from 'react';
import { ConfigManager } from '../../../../core/manager/config.manager';
import { StaffProvider } from '../../../../core/providers/staff.provider';
import { SidebarView } from '../../../base/sidebar.base';

export const StaffView: FC<{  }> = props => {
    const configManager: ConfigManager = new ConfigManager();
    const { getStaff } = StaffProvider();

    const showStaff = useCallback(() => {
        const items: Array<ReactElement> = new Array<ReactElement>();

        for (let key of window.config.getValue<Map<string, number>>('ranks').keys()) {
            if (getStaff().staffs.get(key) == null) {
                items.push(
                    <div key={ key } className="relative w-full h-auto first:mt-0 mt-auto">
                        <div className="relative h-[19px] top-0 font-inter font-semibold text-[16px] text-center leading-[19px]">{ window.config.getValue<Map<string, string>>('ranksName').get(key) }</div>
                        <div className="relative top-5 flex flex-col items-center">
                            <p className="absolute text-center text-opacity-80 dark:text-opacity-80 dark:text-white text-black w-full h-[16px] leading-[16px] font-inter font-semibold text-[13px]">We doesn't have { window.config.getValue<Map<string, string>>('ranksName').get(key) }!</p>
                        </div>
                    </div>
                );
            } else {
                const staffs: Array<ReactElement> = new Array<ReactElement>();
                for (let staff of getStaff().staffs.get(key)) {
                    let status = staff.status == '1' ? 'bg-online' : 'bg-offline';
                    staffs.push(
                    <div key={ staff.username } className="first:rounded-t-[10px] last:rounded-b-[10px] flex flex-row items-center bg-white dark:bg-black relative w-[327px] h-[162px]">
                        <div className="absolute w-[168px] h-full top-5">
                            <div className="absolute w-[72px] h-[122px] rounded-[8px] bg-staff-bg top-0 left-[30px]"></div>
                            <img className="absolute w-[64px] h-[110px] top-0 left-[30px]" src={ "https://imager.bobbaz.fr/avatarimage.php?figure=" + staff.look + "&direction=2&head_direction=3&gesture=sml&action=wav" }></img>
                            <div className="absolute w-full h-[19px] leading-[19px] dark:text-white text-black font-inter font-bold top-[25px] left-[120px]">{ staff.username }</div>
                            <div className="absolute w-full h-[16px] leading-[16px] text-opacity-80 dark:text-opacity-80 dark:text-white text-black font-inter font-semibold top-[45px] left-[120px]">{ staff.motto }</div>           
                        </div>
                        <div className="absolute text-black dark:text-white text-opacity-80 dark:text-opacity-80 w-[64px] h-[16px] leading-[16px] font-inter font-semibold text-[12px] top-[120px] left-[140px]">{ staff.role }</div>
                        <div className={ "absolute w-[12px] h-[12px] rounded-[100px] " + status + " top-[125px] left-[290px]" }></div>
                    </div>)
                }
                items.push(
                    <div key={ key } className="relative w-full h-auto first:mt-0 mt-auto">
                        <div className="relative h-[19px] top-0 font-inter font-semibold text-[16px] text-center leading-[19px]">{ window.config.getValue<Map<string, string>>('ranksName').get(key) }</div>
                        <div className="relative top-5 flex flex-col items-center">
                            { staffs }
                        </div>
                    </div>
                 );
            }
        }

        return items;
    }, [ getStaff ])

    return (
    <SidebarView classList={ "absolute flex flex-col items-center mobileSmall:w-[411px] mobileSmall:h-[calc(100%-80px)] mobileSmall:top-[80px] laptop:w-[411px] laptop:h-screen laptop:top-0 laptop:left-[80px] overflow-y-auto bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 rounded-r-[10px] z-[2] backdrop-blur-[5px]" }>
        { showStaff() }
    </SidebarView>
    );
}