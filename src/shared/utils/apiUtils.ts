import { APIRequestContext, expect } from '@playwright/test'
import fs from 'fs';
import path from 'path';
import { dirPath } from './urls';

export abstract class ApiUtils {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }
    
    async saveToFile(fileName:string, data: any) {
        const dir : string = `${dirPath.responseDir}`;
        const filePath = path.join(dir, fileName);

        // Write the JSON object to a file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
    
    async readFile(fileName:string) {
        const dir : string = `${dirPath.requestDir}`;
        const filePath = path.join(dir, fileName);

        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData;
        } catch (err) {
            console.error('Error reading JSON file:', err);
            return null;
        }
    }

    updatePayload(payload:any, companyName: string) {
        payload.data.attributes.initialAccountHolder.companyName = companyName;
    }

    async sendGetRequest(url: string, headers?: {[key:string]:string}): Promise<any> {
        return await this.request.get(url, {headers: headers})
    }

    async sendPostRequest(url: string, request: any): Promise<any> {
        return await this.request.post(url, {data: request})
    }

}