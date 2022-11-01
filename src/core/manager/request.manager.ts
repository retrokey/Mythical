import { ConfigManager } from './config.manager';

export class RequestManager {
    private configManager: ConfigManager = new ConfigManager()

    public async thumbnail(thumb: string): Promise<any> {
        let request = await fetch(this.configManager.config.thumbnail_url + thumb, {
            method: 'HEAD',
            mode: 'no-cors'
        });
        return request;
    }

    public async get(url: string, header: {}): Promise<any> {
        let request = await fetch(this.configManager.config.api_url + url, {
            method: 'GET',
            mode: 'cors',
            headers: header
        });
        return await request.json();
    }

    public async post(url: string, header: {}, body: {}): Promise<any> {
        let request = await fetch(this.configManager.config.api_url + url, {
            method: 'POST',
            mode: 'cors',
            headers: header,
            body: JSON.stringify(body)
        });
        return await request.json();
    }
}