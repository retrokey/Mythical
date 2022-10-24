import { FC } from 'react';
import { PageHooks } from '../../../core/hooks/page.hooks';

export const ClientView: FC<{}> = props => {
    const { adminChangePage } = PageHooks();

    return (
        <>
            <div className="row">
                <div className="col-4">
                    <div className="box_3">
                        <div className="heading">Server Settings</div>
                        <ul>
                            <li onClick={event => adminChangePage('server.client', 'Server: Client Settings')}>Client Settings</li>
                        </ul>
                    </div>
                </div>
                <div className="col-8">
                    <div className="body_content">
                        <div className="box_4">
                            <div className="heading">Client Settings</div>
                            <div className="content">
                                <div className="row">
                                    <div className="form-group">
                                        <label>Emulator Host</label>
                                        <input className="inputs" type="text" />
                                    </div>
                                    <div className="form-group">
                                        <label>Emulator Port</label>
                                        <input className="inputs" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="end d-flex justify-content-center">
                                <button type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}