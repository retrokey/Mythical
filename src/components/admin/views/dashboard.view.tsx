import { FC, useEffect } from 'react';
import { PageProvider } from '../../../core/providers/page.provider';

export const DashboardView: FC<{}> = props => {
    const { title } = PageProvider();

    useEffect(() => {
        title('ADMIN: Dashboard');
    }, [  ]);

    return (
        <div className="flex flex-row justify-between">
            <div className="w-[49%] h-auto mb-3">
                <div className="bg-[#E2E2E0] border-[1px] border-black">
                    <div className="bg-[#334964] text-center text-[13px] font-inter text-white py-[3px]">System Owerview</div>
                    <div className="p-[4px]">
                        <table className="w-full text-[12px]">
                            <tbody>
                                <tr>
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30">Mythical Version:</td>
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-right">{ window.config.mythical.version }</td>
                                </tr>
                                <tr>
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30">Author:</td>
                                    <td className="w-[50%] py-[4px] px-[7px] border-[1px] border-black border-opacity-30 text-right">{ window.config.mythical.author.name } <small>({ window.config.mythical.author.email })</small></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}