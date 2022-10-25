import { FC, useCallback, useRef, KeyboardEvent } from 'react';
import { PageHooks } from '../../../core/hooks/page.hooks';

export const CMSView: FC<{}> = props => {
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
                            <div className="children d-flex" onClick={ event => adminChangePage('server.client', 'Server: Client Settings') }>
                                <div className="icon"></div>
                                Client Settings
                            </div>
                            <div className="children d-flex" onClick={ event => adminChangePage('server.cms', 'Server: CMS Settings') }>
                                <div className="icon"></div>
                                CMS Settings
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-8">
                    <div className="box">
                        <div className="header">CMS Settings</div>
                        <div className="content">
                            <div className="form-group">
                                <label>Hotel Name</label>
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