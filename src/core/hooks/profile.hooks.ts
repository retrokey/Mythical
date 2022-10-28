import { useBetween } from 'use-between';
import { RequestManager } from '../manager/request.manager';
import { useState } from 'react';
import { UserInfoDefinition } from '../definition/user-info.definition';
import { UserProfileDefinition } from '../definition/user-profile.definition';
import { RoomProfileDefinition } from '../definition/room-profile.definition';
import { ConfigManager } from '../manager/config.manager';

const ProfileHooksState = () => {
    const configManager: ConfigManager = new ConfigManager();
    const requestManager: RequestManager = new RequestManager();
    const [ userData, setUserData ] = useState<UserProfileDefinition>(null);

    const setProfile = async (username: string) => {
        let response: any = await requestManager.get('user/profile/' + username, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
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
        let friends: Array<UserInfoDefinition> = new Array<UserInfoDefinition>();
        for (let friend of response.data.friends) {
            let friendInfo: UserInfoDefinition = new UserInfoDefinition();
            friendInfo.look = friend.avatar;
            friendInfo.username = friend.nickname;
            friends.push(friendInfo);
        }
        userProfileDefinition.friends = friends;
        let rooms: Array<RoomProfileDefinition> = new Array<RoomProfileDefinition>();
        for (let room of response.data.rooms) {
            let roomInfo: RoomProfileDefinition = new RoomProfileDefinition();
            roomInfo.id = room.id;
            roomInfo.name = room.roomName;
            roomInfo.count = room.usersCount;
            const result = await requestManager.thumbnail('1.png');
            if (result.ok) {
                roomInfo.thumbnail = configManager.config.mythical.thumbnail_url + room.id + '.png';
            } else {
                roomInfo.thumbnail = '/images/profile/thumbnail.png';
            }
            rooms.push(roomInfo);
        }
        userProfileDefinition.rooms = rooms;
        const result = await requestManager.thumbnail('1.png');
        console.log(result.ok);
        setUserData(userProfileDefinition);
    }

    const getProfile = () => {
        return userData;
    }

    return { setProfile, getProfile };
}

export const ProfileHooks = () => useBetween(ProfileHooksState);