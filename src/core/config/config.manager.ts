import * as configuration from '../../resources/configuration.json';

export class ConfigManager {
    public get config() {
        return configuration;
    }
}