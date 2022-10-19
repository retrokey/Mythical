import { useState } from 'react';
import { useBetween } from 'use-between';
import { UserInfoDefinition } from '../definition/user-info.definition';
import { UserProfileDefinition } from '../definition/user-profile.definition';
import { RequestManager } from '../request/request.manager';

const ProfileHooksState = () => {
    const requestManager: RequestManager = new RequestManager();
    const [ userData, setUserData ] = useState<UserProfileDefinition>(null);

    const setProfile = async (username: string) => {
        let response: any = await requestManager.get('users/get/profile', {
            'content-type': 'application/json',
            'requested-user': username
        });

        if (response.status != 'success') {
            return;
        }

        let userProfileDefinition = new UserProfileDefinition();
        userProfileDefinition.registration = response.data.registration;
        userProfileDefinition.userInfo = new UserInfoDefinition();
        userProfileDefinition.userInfo.username = response.data.user.nickname;
        userProfileDefinition.userInfo.look = response.data.user.avatar;
        userProfileDefinition.userInfo.motto = response.data.user.mission;
        let currencyMap: Map<number, number> = new Map<number, number>();
        currencyMap.set(1, response.data.user.credits);
        for (let currency of response.data.user.currency) {
            currencyMap.set(currency.currencyType, currency.currencyAmount);
        }
        userProfileDefinition.currency = currencyMap;
        setUserData(userProfileDefinition);
    }

    const getProfile = () => {
        return userData;
    }

    return { setProfile, getProfile };
}

export const ProfileHooks = () => useBetween(ProfileHooksState);