import { RoomProfileDefinition } from "./room-profile.definition";
import { UserInfoDefinition } from "./user-info.definition";

export class UserProfileDefinition {
    public registration: string;
    public userInfo: UserInfoDefinition;
    public currency: Map<number, number>;
    public friends: Array<UserInfoDefinition>;
    public rooms: Array<RoomProfileDefinition>;
}