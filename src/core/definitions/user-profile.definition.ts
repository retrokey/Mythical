import { RoomProfileDefinition } from "./room-profile.definition";
import { UserInfoDefinition } from "./user-info.definition";

export class UserProfileDefinition {
    public registration: string = '';
    public userInfo: UserInfoDefinition = new UserInfoDefinition();
    public currency: Map<number, number> = new Map<number, number>();
    public friends: Array<UserInfoDefinition> = new Array<UserInfoDefinition>();
    public rooms: Array<RoomProfileDefinition> = new Array<RoomProfileDefinition>();
}