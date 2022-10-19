import { UserInfoDefinition } from "./user-info.definition";

export class UserProfileDefinition {
    public registration: string;
    public userInfo: UserInfoDefinition;
    public currency: Map<number, number>;
}