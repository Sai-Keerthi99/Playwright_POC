import { expect, test } from '../shared/fixtures/base.ts';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('API Testing of Policy Center', ()=> {
    test('Retreive Account with Account Number API', async ({ accountApi }) => {
        const response = await accountApi.getAccount('C000212105');
        const resJson:any = await response.json();
        
        await accountApi.saveToFile('accountApiGetAccountRes.json', resJson);
       
        expect(response.status()).toBe(200);
        expect(await resJson.Message).toBe('Success');
    })
})