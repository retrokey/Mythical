import * as configuration from '../../resources/configuration.json';
import * as mythical from '../../../package.json';

export class ConfigManager {
    public get config(): any {
        return configuration;
    }

    public get mythical(): any {
        return mythical;
    }
}