import { UserInfoDefinition } from "./user-info.definition";

export type UserSessionDefinition = {
    token: string;
    userInfo: UserInfoDefinition;
    permission?: Map<string, boolean>;
}