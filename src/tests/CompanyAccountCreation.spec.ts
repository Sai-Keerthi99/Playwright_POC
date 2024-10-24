import accountDetails from '../shared/data/accountDetails.json';
import { expect, test } from '../shared/fixtures/base.ts';

test.describe('Account Creation for Company', ()=> {
    test('Account Creation with UK data', async ({ homePage, pageUtils, accountPage, page }) => {
        await page.goto('/pc/PolicyCenter.do');
        await homePage.pageTitle().waitFor({state: 'visible'});

        await accountPage.accountSubMenu().click();
        await pageUtils.selectDropdown('New Account');
    
        await accountPage.pageTitle().getByText('Enter Account Information').waitFor({state:'visible'});
        await accountPage.company().fill(accountDetails.companyAccount.companyName);

        await accountPage.searchButton().click()
        
        await accountPage.createAccount().waitFor({state:'visible'});
        await accountPage.createAccount().click();
        await pageUtils.selectDropdown(accountDetails.companyAccount.account);
        
        await accountPage.officePhone().fill(accountDetails.companyAccount.officePhone);
        await accountPage.primaryEmail().fill(accountDetails.companyAccount.primaryEmail);
        
        await page.waitForLoadState('load');
        const responsePromise = page.waitForResponse(response =>
            response.url() === 'http://localhost:8180/pc/PolicyCenter.do' && response.status() === 200
                && response.request().resourceType() === 'fetch'
        );
        await accountPage.country().nth(0).selectOption(accountDetails.companyAccount.country)
        await responsePromise;
        
        await accountPage.addressLine1().fill(accountDetails.companyAccount.address1);
        await accountPage.city().fill(accountDetails.companyAccount.city);
        await page.waitForLoadState('load')
            
        await accountPage.postalCode().fill(accountDetails.companyAccount.postalCode)
            
        await accountPage.addressType().selectOption(accountDetails.companyAccount.addressType);
        await accountPage.orgType().selectOption(accountDetails.companyAccount.orgType);
        
        await page.waitForLoadState('load')
        
        await accountPage.orgSearch().click();
        await accountPage.orgPageTitle().waitFor({state:'visible'});
        await accountPage.organization().fill(accountDetails.companyAccount.organization);
        await accountPage.orgNameSearch().click()
        await accountPage.orgSelect().click()
        await page.waitForLoadState('networkidle')
        
        await accountPage.producerCode().selectOption(accountDetails.companyAccount.producerCode)

        await accountPage.updateButton().click()
        await page.waitForLoadState('networkidle')
        
        await expect(await accountPage.accountHolderPostCreation()).toHaveText(accountDetails.companyAccount.companyName)
    })
    test('Account Creation with US data', async ({ homePage, readAndWriteExcel, accountPage, page }) => {
        await page.goto('/pc/PolicyCenter.do');
        await homePage.pageTitle().waitFor({state: 'visible'});
        
        let accNumber = await accountPage.createNewAccount(readAndWriteExcel);
        console.log(accNumber);
    })
})