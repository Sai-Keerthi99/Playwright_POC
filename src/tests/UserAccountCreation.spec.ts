import { expect, test } from '../shared/fixtures/base.ts';


test.describe('Account Creation for Person', ()=> {
    test('Account Creation with full data', async ({ accountPage, pageUtils, page, readAndWriteExcel}) => {
        
        await page.goto('/pc/PolicyCenter.do');
        await accountPage.accountSubMenu().click();
        await pageUtils.selectDropdown('New Account');
    
        await accountPage.firstName().click();
        await accountPage.firstName().fill(await readAndWriteExcel.readValue('firstName'));
        await accountPage.lastName().fill(await readAndWriteExcel.readValue('lastName'));
    
        await accountPage.country().selectOption(await readAndWriteExcel.readValue('country'));
        await page.waitForLoadState('networkidle');
        await accountPage.city().fill(await readAndWriteExcel.readValue('town'));
        await accountPage.postalCode().fill(await readAndWriteExcel.readValue('postalCode'));
       
        await accountPage.searchButton().click()

        await accountPage.createAccount().waitFor({state:'visible'});
        await accountPage.createAccount().click();
        await pageUtils.selectDropdown(await readAndWriteExcel.readValue('accountType'));
    
        await accountPage.homePhone().fill(await readAndWriteExcel.readValue('homePhone'));
        await accountPage.workPhone().fill(await readAndWriteExcel.readValue('workPhone'));
        await accountPage.mobilePhone().fill(await readAndWriteExcel.readValue('mobilePhone')); 
        await accountPage.primaryPhone().selectOption(await readAndWriteExcel.readValue('primaryPhone'));
        await accountPage.primaryEmail().fill(await readAndWriteExcel.readValue('primaryEmail'));

        await accountPage.addressLine1().click()
        await accountPage.addressLine1().fill(await readAndWriteExcel.readValue('addressLine1'));
        await accountPage.addressType().selectOption(await readAndWriteExcel.readValue('addressType'));
        await accountPage.orgSearch().click();
        await page.waitForLoadState('networkidle')
     
        await accountPage.organization().click();
        await accountPage.organization().fill(await readAndWriteExcel.readValue('organization'));
        await accountPage.orgNameSearch().click()
        await accountPage.orgSelect().click()
    
        await page.waitForLoadState('networkidle')
        await accountPage.producerCode().selectOption(await readAndWriteExcel.readValue('producerCode'))
        
        Promise.all([
            page.waitForLoadState('networkidle'),
            accountPage.updateButton().click()
        ])
        
        await expect(await accountPage.accountHolderPostCreation()).toHaveText(await readAndWriteExcel.readAssertionValue('accountHolderName'))
        
    })

    test('Mandate Field Filled Check', async ({ pageUtils, accountPage, page , readAndWriteExcel}) => {
   
        await page.goto('/pc/PolicyCenter.do');
        await accountPage.accountSubMenu().click();
        await pageUtils.selectDropdown('New Account');
    
        await accountPage.firstName().click();
        await accountPage.firstName().fill(await readAndWriteExcel.readValue('firstName'));
        await accountPage.lastName().fill(await readAndWriteExcel.readValue('lastName'));
    
        await accountPage.searchButton().click()
        await page.waitForLoadState('networkidle')
    
        await accountPage.createAccount().scrollIntoViewIfNeeded();
        await accountPage.createAccount().click();
        await pageUtils.selectDropdown(await readAndWriteExcel.readValue('accountType'));
        await accountPage.updateButton().click();
        
        await expect(accountPage.missingFieldErrorMessage().first()).toHaveText(await readAndWriteExcel.readAssertionValue('errorCodeMissingFilel'))
    
    })

    test('Name Of The Account Holder Already Exist', async ({ pageUtils, accountPage, page, readAndWriteExcel}) => {
        await page.goto('/pc/PolicyCenter.do');
        await accountPage.accountSubMenu().click();
        await pageUtils.selectDropdown('New Account');
    
         await accountPage.firstName().click();
        await accountPage.firstName().fill(await readAndWriteExcel.readValue('firstName'));
        await accountPage.lastName().fill(await readAndWriteExcel.readValue('lastName'));
    
        
        await accountPage.searchButton().click()
        await page.waitForLoadState('networkidle')

        await expect(accountPage.createdAccountName()).toHaveText(await readAndWriteExcel.readAssertionValue('accountHolderName'))
    })


    test('Verify Exclusive Entry: Person or Company Details', async ({ readAndWriteExcel, pageUtils, accountPage, page }) => {
       
        await page.goto('/pc/PolicyCenter.do');
        await accountPage.accountSubMenu().click();
        await pageUtils.selectDropdown('New Account')
    
        await accountPage.company().click()
        await accountPage.company().fill(await readAndWriteExcel.readValue('CompanyName'));
        await accountPage.firstName().fill(await readAndWriteExcel.readValue('firstName'));
        await accountPage.lastName().fill(await readAndWriteExcel.readValue('lastName'));
    
        await accountPage.searchButton().click()
        await page.waitForLoadState('networkidle')
        
        await expect(await accountPage.errorMessage()).toHaveText(await readAndWriteExcel.readAssertionValue('companyErrorMsg'));
    
    })
})

