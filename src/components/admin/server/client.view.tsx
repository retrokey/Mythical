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
                            <table>
                                <tr>
                                    <td>TRY-1</td>
                                    <td>TRY-2</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}