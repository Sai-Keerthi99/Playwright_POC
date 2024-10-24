import { expect, test as setup } from '@playwright/test';
import loginData from '../shared/data/loginData.json';
import { LoginPage } from '../shared/pages/loginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await page.goto('/pc/PolicyCenter.do');
    await loginPage.username().fill(loginData.userName);
    await loginPage.password().fill(loginData.password);
    await loginPage.loginButton().click();
    
    await page.waitForSelector('div.gw-TitleBar--title');
    await expect(page.locator('div.gw-TitleBar--title')).toBeVisible();
    
    await page.context().storageState({ path: authFile });
});