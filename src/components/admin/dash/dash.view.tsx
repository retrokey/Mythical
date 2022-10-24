import { FC } from 'react';
import { ConfigManager } from '../../../core/manager/config.manager';

export const DashView: FC<{}> = props => {
    const configManager = new ConfigManager();

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <div className="box">
                        <div className="header">System Overview</div>
                        <div className="content">
                            <table>
                                <tr>
                                    <td>Mythical Version:</td>
                                    <td>{ configManager.mythical.version }</td>
                                </tr>
                                <tr>
                                    <td>Author:</td>
                                    <td>{ configManager.mythical.author.name } ({ configManager.mythical.author.email })</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}