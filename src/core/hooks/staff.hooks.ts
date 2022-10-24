
import { useBetween } from 'use-between';
import { ConfigManager } from '../manager/config.manager';
import { RequestManager } from '../manager/request.manager';
import { useState } from 'react';
import { StaffListDefinition } from '../definition/staff-list.definition';
import { UserInfoDefinition } from '../definition/user-info.definition';

const StaffHooksState = () => {
    const configManager: ConfigManager = new ConfigManager();
    const requestManager: RequestManager = new RequestManager();
    const [ staffList, setStaffList ] = useState<StaffListDefinition>(null);

    const setStaff = async () => {
        let staffListDefinition: StaffListDefinition = new StaffListDefinition();

        let founderResponse: any = await requestManager.get('user/rank/' + configManager.config.mythical.ranks.fou, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });
        if (founderResponse.data.staffer == null) {
            staffListDefinition.fou = new Array<UserInfoDefinition>(0);
        } else {
            let founderArray: Array<UserInfoDefinition> = new Array<UserInfoDefinition>();
            for (let founder of founderResponse.data.staffer) {
                let founderInfo: UserInfoDefinition = new UserInfoDefinition();
                founderInfo.username = founder.nickname;
                founderInfo.look = founder.avatar;
                founderInfo.motto = founder.mission;
                founderInfo.status = founder.status;
                founderInfo.role = founder.role;
                founderArray.push(founderInfo);
            }
            staffListDefinition.fou = founderArray;
        }

        let adminResponse: any = await requestManager.get('user/rank/' + configManager.config.mythical.ranks.adm, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });
        if (adminResponse.data.staffer == null) {
            staffListDefinition.adm = new Array<UserInfoDefinition>(0);
        } else {
            let admArray: Array<UserInfoDefinition> = new Array<UserInfoDefinition>();
            for (let adm of adminResponse.data.staffer) {
                let admInfo: UserInfoDefinition = new UserInfoDefinition();
                admInfo.username = adm.nickname;
                admInfo.look = adm.avatar;
                admInfo.motto = adm.mission;
                admInfo.status = adm.status;
                admInfo.role = adm.role;
                admArray.push(admInfo);
            }
            staffListDefinition.adm = admArray;
        }

        let modResponse: any = await requestManager.get('user/rank/' + configManager.config.mythical.ranks.mod, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });
        if (modResponse.data.staffer == null) {
            staffListDefinition.mod = new Array<UserInfoDefinition>(0);
        } else {
            let modArray: Array<UserInfoDefinition> = new Array<UserInfoDefinition>();
            for (let mod of modResponse.data.staffer) {
                let modInfo: UserInfoDefinition = new UserInfoDefinition();
                modInfo.username = mod.nickname;
                modInfo.look = mod.avatar;
                modInfo.motto = mod.mission;
                modInfo.status = mod.status;
                modInfo.role = mod.role;
                modArray.push(modInfo);
            }
            staffListDefinition.mod = modArray;
        }

        setStaffList(staffListDefinition);
    }

    const getStaff = () => {
        return staffList;
    }

    return { setStaff, getStaff };
}

export const StaffHooks = () => useBetween(StaffHooksState);