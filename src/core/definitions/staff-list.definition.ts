import { UserInfoDefinition } from "./user-info.definition";

export type StaffListDefinition = {
    fou: Array<UserInfoDefinition>;
    adm: Array<UserInfoDefinition>;
    mod: Array<UserInfoDefinition>;
}