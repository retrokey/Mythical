import { UserInfoDefinition } from "./user-info.definition";

export class UserSessionDefinition {
    public token: string = '';
    public userInfo: UserInfoDefinition = new UserInfoDefinition();
}