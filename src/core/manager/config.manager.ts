export class ConfigManager {
    private _configs: Map<string, unknown> = new Map<string, unknown>();

    constructor() {
        this.load();
    }

    private load(): void {
        fetch(window.origin + '/configuration.json')
        .then(response => response.json())
        .then(data => this.parse(data));
    }

    private parse(data: { [index: string]: any }): void {
        if (!data) return;

        for (const key in data) {
            let value = data[key];

            if (!this._configs.has(key)) {
                this.setValue(key, value);
            }
        }
    }

    private setValue<T>(key: string, value: T): void {
        this._configs.set(key, value);
    }

    public get<T>(key: string): T {
        console.log(this._configs.get(key));
        return this._configs.get(key) as T;
    }
}