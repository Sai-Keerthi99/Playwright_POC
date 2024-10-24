import { expect, test } from '../shared/fixtures/base.ts';

test.describe('Policy Issue', ()=> {
    test('Issue D&O Policy', async ({ readAndWriteExcel, homePage, accountPage, submissionPage, page }) => {
        await test.setTimeout(45000);
        await page.goto('/pc/PolicyCenter.do');
        let accNumber:string = await accountPage.createNewAccount(readAndWriteExcel);
         
        const submId = await submissionPage.createSubmission(accNumber);
        await expect(submId).toMatch(submissionPage.idNumberFormat);

        await submissionPage.quoteSubmission();
        await expect(submissionPage.submStatus()).toHaveText('Quoted')

        await submissionPage.issuePolicy();
        await expect( homePage.pageTitle()).toHaveText('Submission Bound');
    })
    test('Cancel Quote for D&O Policy', async ({ readAndWriteExcel, homePage, accountPage, submissionPage, page }) => {
        await test.setTimeout(45000);
        await page.goto('/pc/PolicyCenter.do');
        let accNumber:string = await accountPage.createNewAccount(readAndWriteExcel);
         
        const submId = await submissionPage.createSubmission(accNumber);
        await expect(submId).toMatch(submissionPage.idNumberFormat);

        await submissionPage.quoteSubmission();
        await expect(submissionPage.submStatus()).toHaveText('Quoted')

        await submissionPage.quoteCancellation();
        await expect( homePage.pageTitle()).toHaveText('Submission Withdrawn');
    })
    test('Issue & Cancel D&O Policy', async ({ readAndWriteExcel, homePage, accountPage, submissionPage, pageUtils, page }) => {
        await test.setTimeout(45000);
        await page.goto('/pc/PolicyCenter.do');
        let accNumber:string = await accountPage.createNewAccount(readAndWriteExcel);
         
        const submId = await submissionPage.createSubmission(accNumber);
        await expect(submId).toMatch(submissionPage.idNumberFormat);

        await submissionPage.quoteSubmission();
        await expect(submissionPage.submStatus()).toHaveText('Quoted')

        await submissionPage.issuePolicy();
        await expect( homePage.pageTitle()).toHaveText('Submission Bound');

        await submissionPage.policyCancellation();
        await expect(homePage.pageTitle()).toHaveText("Cancellation Bound");
    })

})