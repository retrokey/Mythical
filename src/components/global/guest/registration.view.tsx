import { FC, useCallback, useRef, KeyboardEvent } from 'react';
import { UserSessionDefinition } from '../../../core/definitions/user-session.definition';
import { RequestManager } from '../../../core/manager/request.manager';
import { PageProvider } from '../../../core/providers/page.provider';
import { SessionProvider } from '../../../core/providers/session.provider';

export const RegistrationView: FC<{  }> = props => {
    const { title, change } = PageProvider();
    const requestManager: RequestManager = new RequestManager();
    const { registerUser } = SessionProvider();
    const username = useRef<HTMLInputElement>();
    const mail = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();


    const requestRegistration = useCallback((user: string, psw: string, mail: string) => {
        requestManager.post('user/new', {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        }, {
            username: user,
            password: psw,
            mail: mail
        })
        .then((response) => {        
            if (response.status != 'success') {
                return;
            }

            let json = response.data;
            let userSession: UserSessionDefinition = new UserSessionDefinition();
            userSession.userInfo.id = json.user.id;
            userSession.userInfo.username = json.user.nickname;
            userSession.userInfo.SSO = json.user.SSO;
            userSession.userInfo.look = json.user.avatar;
            userSession.userInfo.motto = json.user.mission;
            userSession.userInfo.role = json.user.role;
            userSession.userInfo.rank = json.user.rank;
            registerUser(userSession);
        });
    }, [ registerUser ]);

    const submit = useCallback(() => {
        requestRegistration(username.current.value, password.current.value, mail.current.value);
    }, [ username, password, requestRegistration ]);

    const keyDown = useCallback((event: KeyboardEvent) => {
        if (event.key == 'Enter' || event.key  == 'NumpadEnter') {
            requestRegistration(username.current.value, password.current.value, mail.current.value);
        }
    }, [ username, password, requestRegistration ]);

    const closeRegistration = useCallback(() => {
        title('Welcome!')
        change('');
    }, [ title, change ]);

    return (<div className="bg-gradient bg-opacity-75 w-screen h-screen">
        <div className="absolute bg-drape left-0 top-0 w-[145px] h-[200px]"></div>
        <div className="absolute bg-left left-0 bottom-0 w-[403px] h-[390px]"></div>
        <div className="absolute bg-right right-0 bottom-0 w-[484px] h-[463px]"></div>
        <div className="absolute bg-right right-0 bottom-0 w-[484px] h-[463px]"></div>
        <div className="absolute w-[415px] h-auto rounded-[10px] bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-60 p-3 top-1/4 left-1/3 flex flex-col items-center justify-between">
            <div className="relative font-inter mb-2 font-semibold text-black dark:text-white text-16px">Welcome</div>
            <div className="relative w-full h-80 flex flex-col items-center justify-between">
                <input ref={ username } placeholder="Username" type="text" className="relative bg-opacity-75 dark:bg-opacity-75 bg-black dark:bg-white placeholder:text-white dark:placeholder:text-black text-white dark:text-black w-full h-14 rounded-[8px] text-center outline-none" />
                <input ref={ mail } placeholder="Email" type="text" className="relative bg-opacity-75 dark:bg-opacity-75 bg-black dark:bg-white placeholder:text-white dark:placeholder:text-black text-white dark:text-black w-full h-14 rounded-[8px] text-center outline-none" />
                <input ref={ password } onKeyDown={ event => keyDown(event) } placeholder="Password" type="password" className="relative bg-opacity-75 dark:bg-opacity-75 bg-black dark:bg-white placeholder:text-white dark:placeholder:text-black text-white dark:text-black w-full h-14 rounded-[8px] text-center outline-none" />
                <button onKeyDown={ event => keyDown(event) } onClick={ event => submit() } className="relative w-full h-12 rounded-[8px] text-black dark:text-white bg-yellow">Registration</button>
                <button onClick={ event => closeRegistration() } className="relative w-full h-12 rounded-[8px] text-black dark:text-white bg-gray">Return to Login</button>
            </div>
        </div>
    </div>);
}