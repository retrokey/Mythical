import { useState } from 'react';
import { useBetween } from 'use-between';
import { RoomProfileDefinition } from '../definitions/room-profile.definition';
import { UserInfoDefinition } from '../definitions/user-info.definition';
import { UserProfileDefinition } from '../definitions/user-profile.definition';
import { RequestManager } from '../manager/request.manager';

const profile = () => {
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

        let currencyMap: Map<number, number> = new Map<number, number>();
        currencyMap.set(1, response.data.user.credits);
        for (let currency of response.data.user.currency) {
            currencyMap.set(currency.currencyType, currency.currencyAmount);
        }
        let friends: Array<UserInfoDefinition> = new Array<UserInfoDefinition>();
        for (let friend of response.data.friends) {
            let friendInfo: UserInfoDefinition = {
                look: friend.avatar,
                username: friend.nickname
            }
            friends.push(friendInfo);
        }
        let rooms: Array<RoomProfileDefinition> = new Array<RoomProfileDefinition>();
        for (let room of response.data.rooms) {
            let roomInfo: RoomProfileDefinition = {
                id: room.id,
                name: room.roomName,
                count: room.usersCount,
                thumbnail: '/images/profile/thumbnail.png'
            }
            const result = await requestManager.thumbnail('1.png');
            if (result.ok) {
                roomInfo.thumbnail = window.config.getValue<string>('thumbnail_url') + room.id + '.png';
            }
            rooms.push(roomInfo);
        }
        let userProfile: UserProfileDefinition = {
            registration: response.data.registration,
            userInfo: {
                username: response.data.user.nickname,
                look: response.data.user.avatar,
                motto: response.data.user.mission,
            },
            currency: currencyMap,
            friends: friends,
            rooms: rooms
        };
        setUserData(userProfile);
    }

    const getProfile = () => {
        return userData;
    }

    return { setProfile, getProfile }
}
export const ProfileProvider = () => useBetween(profile);