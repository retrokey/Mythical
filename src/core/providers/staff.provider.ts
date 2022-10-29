import { useState } from 'react';
import { useBetween } from 'use-between';
import { StaffListDefinition } from '../definitions/staff-list.definition';
import { UserInfoDefinition } from '../definitions/user-info.definition';
import { ConfigManager } from '../manager/config.manager';
import { RequestManager } from '../manager/request.manager';

const staff = () => {
    const [ request, setRequest ] = useState<RequestManager>(new RequestManager());
    const [ config, setConfig ] = useState<ConfigManager>(new ConfigManager());
    const [ staffList, setStaffList ] = useState<StaffListDefinition>(null);

    const setStaff = async () => {
        let staffList: StaffListDefinition = new StaffListDefinition();
        let ranks: any = config.get<object>('ranks');

        let founderResponse: any = await request.get('user/rank/' + ranks.fou, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });
        if (founderResponse.data.staffer == null) {
            staffList.fou = new Array<UserInfoDefinition>(0);
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
            staffList.fou = founderArray;
        }

        let adminResponse: any = await request.get('user/rank/' + ranks.adm, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });
        if (adminResponse.data.staffer == null) {
            staffList.adm = new Array<UserInfoDefinition>(0);
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
            staffList.adm = admArray;
        }

        let modResponse: any = await request.get('user/rank/' + ranks.mod, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });
        if (modResponse.data.staffer == null) {
            staffList.mod = new Array<UserInfoDefinition>(0);
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
            staffList.mod = modArray;
        }

        setStaffList(staffList);
    }

    const getStaff = () => {
        return staffList;
    }

    return { setStaff, getStaff };
}
export const StaffProvider = () => useBetween(staff);