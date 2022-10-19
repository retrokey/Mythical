import { FC, useCallback, useEffect, useRef } from 'react';
import { ConfigManager } from '../../core/config/config.manager';
import { UserInfoDefinition } from '../../core/definition/user-info.definition';
import { SessionHooks } from '../../core/hooks/session.hooks';
import { RequestManager } from '../../core/request/request.manager';

export const LoginView: FC<{  }> = props => {
    const configManager: ConfigManager = new ConfigManager();
    const requestManager: RequestManager = new RequestManager();
    const { makeSession} = SessionHooks();
    const username = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();

    useEffect(() => {
        document.title = configManager.config.mythical.name + ' - Welcome';
    }, [  ]);

    const requestLogin = useCallback(async (user: string, psw: string) => {
        let response: any = await requestManager.post('users/get', {
            'content-type': 'application/json'
        }, {
            username: user,
            password: psw
        });

        if (response.status != 'success') {
            return;
        }

        // TODO: add other value when need
        let definition: UserInfoDefinition = new UserInfoDefinition();
        definition.username = response.data.user.nickname;
        definition.look = response.data.user.avatar;
        definition.motto = response.data.user.mission;
        makeSession(response.data.sso, definition);
    }, [ requestManager, makeSession ]);

    const keyDown = useCallback((event: KeyboardEvent) => {
        if (event.key == 'Enter' || event.key  == 'NumpadEnter') {
            requestLogin(username.current.value, password.current.value);
        }
    }, [ username, password, requestLogin ]);

    useEffect(() =>
    {
        document.body.addEventListener('keydown', keyDown);
        return () => {
            document.body.removeEventListener('keydown', keyDown);
        }
    }, [ keyDown ]);

    return (
        <div className="d-flex justify-content-center">
            <div id="box">
                <div className="header">
                    Welcome
                </div>
                <div className="content">
                    <div className="section_name">Enter</div>
                    <div className="row">
                        <div className="col-6">
                            <input ref={ username } type="text" placeholder="Username" />
                            <input ref={ password } type="password" placeholder="Password" />
                            <input type="submit" value="Entra" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}