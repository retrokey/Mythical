import { useState } from 'react';
import { useBetween } from 'use-between';
import { StaffListDefinition } from '../definitions/staff-list.definition';
import { UserInfoDefinition } from '../definitions/user-info.definition';
import { ConfigManager } from '../manager/config.manager';
import { RequestManager } from '../manager/request.manager';

const staff = () => {
    const requestManager: RequestManager = new RequestManager();
    const configManager: ConfigManager = new ConfigManager();
    const [ staffList, setStaffList ] = useState<StaffListDefinition>(null);

    const setStaff = async () => {
        let staffList: StaffListDefinition = {
            fou: null,
            adm: null,
            mod: null
        };
        let ranks: any = configManager.config.ranks;

        let founderResponse: any = await requestManager.get('user/rank/' + ranks.fou, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });
        if (founderResponse.data.staffer == null) {
            staffList.fou = new Array<UserInfoDefinition>(0);
        } else {
            let founderArray: Array<UserInfoDefinition> = new Array<UserInfoDefinition>();
            for (let founder of founderResponse.data.staffer) {
                let founderInfo: UserInfoDefinition = {
                    id: founder.id,
                    username: founder.nickname,
                    look: founder.avatar,
                    motto: founder.mission,
                    status: founder.status,
                    rank: founder.rank,
                    role: founder.role
                };
                founderArray.push(founderInfo);
            }
            staffList.fou = founderArray;
        }

        let adminResponse: any = await requestManager.get('user/rank/' + ranks.adm, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });
        if (adminResponse.data.staffer == null) {
            staffList.adm = new Array<UserInfoDefinition>(0);
        } else {
            let admArray: Array<UserInfoDefinition> = new Array<UserInfoDefinition>();
            for (let admin of adminResponse.data.staffer) {
                let admInfo: UserInfoDefinition = {
                    id: admin.id,
                    username: admin.nickname,
                    look: admin.avatar,
                    motto: admin.mission,
                    status: admin.status,
                    rank: admin.rank,
                    role: admin.role
                };
                admArray.push(admInfo);
            }
            staffList.adm = admArray;
        }

        let modResponse: any = await requestManager.get('user/rank/' + ranks.mod, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });
        if (modResponse.data.staffer == null) {
            staffList.mod = new Array<UserInfoDefinition>(0);
        } else {
            let modArray: Array<UserInfoDefinition> = new Array<UserInfoDefinition>();
            for (let moderator of modResponse.data.staffer) {
                let modInfo: UserInfoDefinition = {
                    id: moderator.id,
                    username: moderator.nickname,
                    look: moderator.avatar,
                    motto: moderator.mission,
                    status: moderator.status,
                    rank: moderator.rank,
                    role: moderator.role
                };
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