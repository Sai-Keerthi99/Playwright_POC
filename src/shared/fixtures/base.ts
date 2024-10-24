
import { test as base } from '@playwright/test';
import { AccountPage } from '../pages/accountPage';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/loginPage';
import { SubmissionPage } from '../pages/submissionPage';
import { ReadAndWriteExcel } from '../utils/excelUtil';
import { PageUtils } from '../utils/pageUtils';
import { IntegrationGateway } from '../apis/integrationGateway';
import { AccountAPI } from '../apis/accountApi';

// Declare the types of your fixtures.
type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    accountPage: AccountPage;
    pageUtils: PageUtils;
    readAndWriteExcel: ReadAndWriteExcel;
    submissionPage: SubmissionPage;
    integrationGateway: IntegrationGateway;
    accountApi: AccountAPI;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
    submissionPage: async ({ page }, use) => {
        await use(new SubmissionPage(page));
    },
    pageUtils:  async ({ page }, use) => {
        await use(new PageUtils(page));
    },
    readAndWriteExcel:  async ({}, use) => {
        await use(new ReadAndWriteExcel('Account Creation', 'src/shared/data/Book1.xlsx'));
    },
    integrationGateway: async({request}, use) => {
        await use(new IntegrationGateway(request));
    },
    accountApi: async({request}, use) => {
        await use(new AccountAPI(request));
    }
});
export { expect } from '@playwright/test';

