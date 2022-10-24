import { FC, useCallback, useEffect, useRef } from 'react';
import { PageHooks } from '../../../core/hooks/page.hooks';
import { SessionHooks } from '../../../core/hooks/session.hooks';
import { RequestManager } from '../../../core/manager/request.manager';

export const LoginView: FC<{  }> = props => {
    const requestManager: RequestManager = new RequestManager();
    const { registerUser, getUser } = SessionHooks();
    const { setNitro, changePage } = PageHooks();
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
    
            registerUser(response.data);
            setNitro();
        });
    }, [ requestManager, getUser, registerUser, setNitro ]);

    const keyDown = useCallback((event: KeyboardEvent) => {
        if (event.key == 'Enter' || event.key  == 'NumpadEnter') {
            requestLogin(username.current.value, password.current.value);
        }
    }, [ username, password, requestLogin ]);

    useEffect(() =>
    {
        changePage('', 'Welcome!');
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