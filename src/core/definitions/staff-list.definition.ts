import { UserInfoDefinition } from "./user-info.definition";

export type StaffListDefinition = {
    staffs: Map<string, Array<UserInfoDefinition>>;
}