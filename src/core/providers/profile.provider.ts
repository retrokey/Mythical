import { useState } from 'react';
import { useBetween } from 'use-between';
import { RoomProfileDefinition } from '../definitions/room-profile.definition';
import { UserInfoDefinition } from '../definitions/user-info.definition';
import { UserProfileDefinition } from '../definitions/user-profile.definition';
import { ConfigManager } from '../manager/config.manager';
import { RequestManager } from '../manager/request.manager';

const profile = () => {
    const requestManager: RequestManager = new RequestManager();
    const configManager: ConfigManager = new ConfigManager();
    const [ userData, setUserData ] = useState<UserProfileDefinition>(null);

    const setProfile = async (username: string) => {
        let response: any = await requestManager.get('user/profile/' + username, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });

        if (response.status != 'success') {
            return;
        }

        let userProfile: UserProfileDefinition = new UserProfileDefinition();
        userProfile.registration = response.data.registration;
        userProfile.userInfo.username = response.data.user.nickname;
        userProfile.userInfo.look = response.data.user.avatar;
        userProfile.userInfo.motto = response.data.user.mission;
        let currencyMap: Map<number, number> = new Map<number, number>();
        currencyMap.set(1, response.data.user.credits);
        for (let currency of response.data.user.currency) {
            currencyMap.set(currency.currencyType, currency.currencyAmount);
        }
        userProfile.currency = currencyMap;
        let friends: Array<UserInfoDefinition> = new Array<UserInfoDefinition>();
        for (let friend of response.data.friends) {
            let friendInfo: UserInfoDefinition = new UserInfoDefinition();
            friendInfo.look = friend.avatar;
            friendInfo.username = friend.nickname;
            friends.push(friendInfo);
        }
        userProfile.friends = friends;
        let rooms: Array<RoomProfileDefinition> = new Array<RoomProfileDefinition>();
        for (let room of response.data.rooms) {
            let roomInfo: RoomProfileDefinition = new RoomProfileDefinition();
            roomInfo.id = room.id;
            roomInfo.name = room.roomName;
            roomInfo.count = room.usersCount;
            const result = await requestManager.thumbnail('1.png');
            if (result.ok) {
                roomInfo.thumbnail = configManager.config.thumbnail_url + room.id + '.png';
            } else {
                roomInfo.thumbnail = '/images/profile/thumbnail.png';
            }
            rooms.push(roomInfo);
        }
        userProfile.rooms = rooms;
        setUserData(userProfile);
    }

    const getProfile = () => {
        return userData;
    }

    return { setProfile, getProfile };
}
export const ProfileProvider = () => useBetween(profile);