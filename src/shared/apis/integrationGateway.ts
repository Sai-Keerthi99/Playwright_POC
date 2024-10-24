import { APIRequestContext, expect } from '@playwright/test'
import { ApiUtils } from '../utils/apiUtils';
import { dirPath, urls } from '../utils/urls';

export class IntegrationGateway extends ApiUtils {
    constructor(request: APIRequestContext) {
        super(request);
    }
    
    async getAccountsAllDetails(): Promise<any> {
        return await this.sendGetRequest(`${urls.getAccountsAllDeatils}`)
    }
    async getAccountfromAcctNumber(accNum: string): Promise<any> {
        const url :string = urls.getAccountfromAcctNumber+'?accountNumber='+accNum;
        return await this.sendGetRequest(url);
    }
    async createAccountAPi(companyName: string): Promise<any> {
        const url :string = urls.createAccount;
        let payload: any = await this.readFile('createAccount.json');
        this.updatePayload(payload, companyName)

        return await this.sendPostRequest(url, payload);
    }
}