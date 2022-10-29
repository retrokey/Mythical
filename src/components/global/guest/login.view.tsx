import { FC, useCallback, useEffect, useRef, KeyboardEvent } from 'react';
import { UserSessionDefinition } from '../../../core/definitions/user-session.definition';
import { RequestManager } from '../../../core/manager/request.manager';
import { PageProvider } from '../../../core/providers/page.provider';
import { SessionProvider } from '../../../core/providers/session.provider';

export const LoginView: FC<{  }> = props => {
    const { title } = PageProvider();
    const requestManager: RequestManager = new RequestManager();
    const { registerUser } = SessionProvider();
    const username = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();

    const requestLogin = useCallback((user: string, psw: string) => {
        requestManager.post('user/find', {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        }, {
            username: user,
            password: psw
        })
        .then((response) => {        
            if (response.status != 'success') {
                return;
            }

            let json = response.data;
            let userSession: UserSessionDefinition = new UserSessionDefinition();
            userSession.userInfo.username = json.user.nickname;
            userSession.userInfo.SSO = json.sso;
            userSession.userInfo.look = json.user.avatar;
            userSession.userInfo.motto = json.user.mission;
            userSession.userInfo.role = json.user.role;
            userSession.userInfo.rank = json.user.rank;
            registerUser(userSession);
        });
    }, [ registerUser ]);

    const submit = useCallback(() => {
        requestLogin(username.current.value, password.current.value);
    }, [ username, password, requestLogin ]);

    const keyDown = useCallback((event: KeyboardEvent) => {
        if (event.key == 'Enter' || event.key  == 'NumpadEnter') {
            requestLogin(username.current.value, password.current.value);
        }
    }, [ username, password, requestLogin ]);

    useEffect(() => {
        title('Welcome!');
    }, [ title ]);
 
    return (<div className="bg-gray dark:bg-gray bg-opacity-75 w-screen h-screen">
        <div className="absolute bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 rounded-r-10px w-411px h-screen">
            <div className="absolute top-12 left-12 font-inter font-semibold text-black dark:text-white text-16px">Welcome</div>
            <div className="absolute top-20 left-12 bg-white dark:bg-black w-80 h-40 flex flex-col items-center rounded-10px">
                <input ref={ username } placeholder="Username" type="text" className="absolute w-90% h-14 top-4 text-center placeholder:text-white dark:placeholder:text-black bg-black text-white bg-opacity-75 dark:bg-opacity-75 dark:bg-white dark:text-black outline-none" />
                <input ref={ password } placeholder="Password" type="password" className="absolute w-90% h-14 top-20 text-center placeholder:text-white dark:placeholder:text-black bg-black text-white bg-opacity-75 dark:bg-opacity-75 dark:bg-white dark:text-black outline-none" />
            </div>
            <button onKeyDown={ event => keyDown(event) } onClick={ event => submit() } className="absolute w-80 h-12 top-64 rounded-10px left-12 text-black dark:text-white bg-yellow">Enter</button>
        </div>
    </div>);
}