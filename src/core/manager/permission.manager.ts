import { UserSessionDefinition } from '../definition/user-session.definiton';
import { Store } from '../store/Store';
import { RequestManager } from './request.manager';

export class PermissionManager {
    private readonly requestManager: RequestManager = new RequestManager();

    public async getPermission(permission: string): Promise<boolean> {
        let response: any = await this.requestManager.get('permission/get/' + permission, {
            'content-type': 'application/json'
        });

        if (response.status != 'success') {
            return false;
        }

        let session: UserSessionDefinition = Store.getState().session;
        return session.userInfo.rank >= response.data.rank ? true : false;
    }
}