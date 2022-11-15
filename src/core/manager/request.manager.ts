export class RequestManager {
    public async thumbnail(thumb: string): Promise<any> {
        let request = await fetch(window.config.getValue<string>('thumbnail_url') + thumb, {
            method: 'HEAD',
            mode: 'no-cors'
        });
        return request;
    }

    public async get(url: string, header: {}): Promise<any> {
        let request = await fetch(window.config.getValue<string>('api_url') + url, {
            method: 'GET',
            mode: 'cors',
            headers: header
        });
        return await request.json();
    }

    public async delete(url: string, header: {}): Promise<any> {
        let request = await fetch(window.config.getValue<string>('api_url') + url, {
            method: 'DELETE',
            mode: 'cors',
            headers: header
        });
        return await request.json();
    }

    public async post(url: string, header: {}, body: {}): Promise<any> {
        let request = await fetch(window.config.getValue<string>('api_url') + url, {
            method: 'POST',
            mode: 'cors',
            headers: header,
            body: JSON.stringify(body)
        });
        return await request.json();
    }

    public async put(url: string, header: {}, body: {}): Promise<any> {
        let request = await fetch(window.config.getValue<string>('api_url') + url, {
            method: 'PUT',
            mode: 'cors',
            headers: header,
            body: JSON.stringify(body)
        });
        return await request.json();
    }
}