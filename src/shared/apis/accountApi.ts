import { APIRequestContext, expect } from "@playwright/test";
import { ApiUtils } from "../utils/apiUtils";
import { accApiHeaders, urls } from "../utils/urls";


export class AccountAPI extends ApiUtils{
    constructor(request: APIRequestContext) {
        super(request);
    }

    async getAccount(accNum: string): Promise<any> {
        const url :string = urls.accountAPIGetAccount+accNum;

        return await this.sendGetRequest(url, accApiHeaders);
    }
}