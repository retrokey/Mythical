import { useState } from 'react';
import { useBetween } from 'use-between';
import { UserSettingsDefinition } from '../definitions/user-settings.definition';
import { RequestManager } from '../manager/request.manager';

const settings = () => {
    const requestManager: RequestManager = new RequestManager();
    const [ settings, setSettings ] = useState<UserSettingsDefinition>(null);

    const setUserSettings = async (user_id: number) => {
        let response: any = await requestManager.get('user/settings/' + user_id, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });

        if (response.status != 'success') {
            return;
        }

        let settings: Map<string, '0' | '1'> = new Map<string, '0' | '1'>();
        let json = response.data;
        for (let [key, val] of Object.entries(json.setting)) {
            settings.set(key, (val as '0' | '1'));
        }
        let definition: UserSettingsDefinition = {
            hotel: settings
        }
        setSettings(definition);
    }

    const getUserSettings = () => {
        return settings;
    }

    return { setUserSettings, getUserSettings }
}
export const SettingsProvider = () => useBetween(settings);