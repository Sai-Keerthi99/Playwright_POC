import loginData from '../shared/data/loginData.json';
import { expect, test } from '../shared/fixtures/base';

test.use({ storageState: { cookies: [], origins: [] } });

test('Successful login', async ({ loginPage, page }) => {
    await page.goto('/pc/PolicyCenter.do');
    
    await loginPage.username().fill(loginData.userName);
    await loginPage.password().fill(loginData.password);
    await loginPage.loginButton().click();

    await page.waitForLoadState('networkidle')
    await expect(page.locator('div.gw-TitleBar--title')).toBeVisible();
})


test('Failed login', async ({ loginPage, page})=>{
    await page.goto('/pc/PolicyCenter.do');

    await loginPage.username().fill(loginData.inCorrectUsername);
    await loginPage.password().fill(loginData.inCorrectPassword);
    await loginPage.loginButton().click();

    expect(await loginPage.password().textContent()).toBe("")
})