import { FC, useEffect } from 'react';
import { ConfigManager } from '../../../core/manager/config.manager';
import { PageProvider } from '../../../core/providers/page.provider';

export const DashboardView: FC<{  }> = props => {
    const configManager: ConfigManager = new ConfigManager();
    const { title } = PageProvider();

    useEffect(() => {
        title('ADMIN: Dashboard');
    }, [  ]);

    return (
        <>
            <div className="w-[95%] h-auto mb-3">
                <div className="bg-[#E2E2E0] border-[1px] border-black">
                    <div className="bg-[#334964] text-center text-[13px] text-white py-[3px]">System Owerview</div>
                    <div className="p-[4px]">
                        <table className="w-full text-[12px]">
                            <tbody>
                                <tr className="border-[1px]">
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30">Mythical Version:</td>
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-right">{ configManager.mythical.version }</td>
                                </tr>
                                <tr className="">
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30">Author:</td>
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-right">{ configManager.mythical.author.name } ({ configManager.mythical.author.email })</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="w-[95%] h-auto mb-3">
                <div className="bg-[#E2E2E0] border-[1px] border-black">
                    <div className="bg-[#334964] text-center text-[13px] text-white py-[3px]">Hotel Information</div>
                    <div className="p-[4px]">
                        <table className="w-full text-[12px]">
                            <tbody>
                                <tr className="border-[1px]">
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30">Online Users:</td>
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-right">0</td>
                                </tr>
                                <tr className="">
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30">Room Loaded:</td>
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-right">0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}