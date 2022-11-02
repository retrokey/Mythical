import { RoomProfileDefinition } from "./room-profile.definition";
import { UserInfoDefinition } from "./user-info.definition";

export type UserProfileDefinition = {
    registration: string;
    userInfo: UserInfoDefinition;
    currency: Map<number, number>;
    friends: Array<UserInfoDefinition>;
    rooms: Array<RoomProfileDefinition>;
}