import { FC } from 'react';
import { ConfigManager } from '../../../core/manager/config.manager';

export const DashView: FC<{}> = props => {
    const configManager = new ConfigManager();

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="body_content">
                        <div className="box_1">
                            <div className="heading">Statistics & Info</div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="box_2">
                                        <div className="heading">System Overview</div>
                                        <table className="full">
                                            <tr>
                                                <td>Mythical Version:</td>
                                                <td>{configManager.mythical.version}</td>
                                            </tr>
                                            <tr>
                                                <td>Author:</td>
                                                <td>{configManager.mythical.author.name}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}