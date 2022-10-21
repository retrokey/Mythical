export class UserInfoDefinition {
    public username: string;
    public SSO: string;
    public look: string;
    public motto: string;
    public role: string;
    public status: '0' | '1';
    public rank: number;
    public permission: Map<string, boolean> = new Map<string, boolean>();
}