import { RequestManager } from './request.manager';

export class PermissionManager {
    private readonly requestManager: RequestManager = new RequestManager();

    public async getPermission(permission: string, rank: number): Promise<boolean> {
        let response: any = await this.requestManager.get('permission/get/' + permission, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });

        if (response.status != 'success') {
            return;
        }

        return rank >= response.data.rank ? true : false;
    }
}