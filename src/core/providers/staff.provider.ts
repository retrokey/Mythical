import { useState } from 'react';
import { useBetween } from 'use-between';
import { StaffListDefinition } from '../definitions/staff-list.definition';
import { UserInfoDefinition } from '../definitions/user-info.definition';
import { RequestManager } from '../manager/request.manager';

const staff = () => {
    const requestManager: RequestManager = new RequestManager();
    const [ staffList, setStaffList ] = useState<StaffListDefinition>(null);

    const setStaff = async () => {
        let staffList: StaffListDefinition = {
            staffs: new Map<string, Array<UserInfoDefinition>>()
        };

        for (let [key, val] of window.config.getValue<Map<string, number>>('ranks').entries()) {
            let response: any = await requestManager.get('user/rank/' + val, {
                'content-type': 'application/json',
                'access-control-allow-origin': '*'
            });
            if (response.data.staffer == null) {
                staffList.staffs[key] = new Array<StaffListDefinition>(0);
            } else {
                let array: Array<UserInfoDefinition> = new Array<UserInfoDefinition>();
                for (let info of response.data.staffer) {
                    let staffInfo: UserInfoDefinition = {
                        id: info.id,
                        username: info.nickname,
                        look: info.avatar,
                        motto: info.mission,
                        status: info.status,
                        rank: info.rank,
                        role: info.role
                    };
                    array.push(staffInfo);
                }
                staffList.staffs.set(key, array);
            }
        }

        setStaffList(staffList);
    }

    const getStaff = () => {
        return staffList;
    }

    return { setStaff, getStaff }
}
export const StaffProvider = () => useBetween(staff);