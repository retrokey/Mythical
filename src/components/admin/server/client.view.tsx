import { FC } from 'react';
import { PageHooks } from '../../../core/hooks/page.hooks';

export const ClientView: FC<{}> = props => {
    const { adminChangePage } = PageHooks();

    return (
        <>
            <div className="row">
                <div className="col-4">
                    <ul className="subnavigation">
                        <li>
                            <div className="section d-flex">
                                <div className="icon"></div>
                                Server 
                            </div>
                            <div className="children d-flex" onClick={ event => adminChangePage('server.client', 'Server: Client') }>   
                                <div className="icon"></div>
                                Client
                            </div>
                            <div className="children d-flex">   
                                <div className="icon"></div>
                                CMS
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-8">
                    <div className="box">
                        <div className="header">Client</div>
                        <div className="content">
                            <div className="form-group">
                                <label>Emulator Host</label>
                                <input type="text" />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="submit">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}