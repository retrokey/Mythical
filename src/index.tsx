import { createRoot } from 'react-dom/client';
import { ConfigManager } from './core/manager/config.manager';
import { Mythical } from './Mythical';

declare global {
    interface Window {
        config: ConfigManager;
    }
}

// @ts-ignore
fetch(MythicalConfig['config.urls'])
.then(res => res.json())
.then(json => {
    window.config = new ConfigManager();
    for (let [key, value] of Object.entries(json)) {
        if (typeof(value) == 'object') {
            window.config.setValue(key, new Map<string, unknown>);
            for (let [keys, val] of Object.entries(value)) {
                window.config.getValue<Map<string, unknown>>(key).set(keys, val);
            }
        } else {
            window.config.setValue(key, value);
        }
    }
    createRoot(document.getElementById('root')).render(<Mythical />);
});