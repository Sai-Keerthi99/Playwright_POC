import { expect, test } from '../shared/fixtures/base.ts';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('API Testing through Integration Gateway', ()=> {
    test('Retreive All Accounts API', async ({ integrationGateway }) => {
        const response = await integrationGateway.getAccountsAllDetails();
        const resJson = await response.json();

        await integrationGateway.saveToFile('getAccountsAllDetails.json', resJson);
        expect(response.status()).toBe(200);
        expect(resJson.count).toBe(25);
    })
    test('Retreive Account with Account Number API', async ({ integrationGateway }) => {
        const response = await integrationGateway.getAccountfromAcctNumber('C000212105');
        const resJson:any = await response.json();
        
        await integrationGateway.saveToFile('getAccountfromAcctNumber.json', resJson);
        expect(response.status()).toBe(200);
        expect(await resJson.data[0].attributes.accountHolder.displayName).toBe('Wright Construction');
    })
    test.skip('Create Account', async ({ integrationGateway }) => {
        const response = await integrationGateway.createAccountAPi('Fancy Feathers');
        const resJson:any = await response.json();
        
        await integrationGateway.saveToFile('createAccountRes.json', resJson);
        expect(response.status()).toBe(200);
    })
})