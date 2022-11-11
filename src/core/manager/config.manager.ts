import * as mythical from '../../../package.json';

export class ConfigManager {
    private _configs: Map<string, unknown>;

    constructor() {
        this._configs = new Map<string, unknown>();
    }

    public  getValue<T>(key: string, value: T = null): T {
        let existing = this._configs.get(key);

        if (existing === undefined) {
            existing = value;
        }

        return (existing as T);
    }

    public setValue<T>(key: string, value: T): void {
        this._configs.set(key, value);
    }

    public get mythical(): any {
        return mythical;
    }
}