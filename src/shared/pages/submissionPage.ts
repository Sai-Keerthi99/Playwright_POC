import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../utils/pageUtils";
import { AccountPage } from "./accountPage";
import { HomePage } from "./home";

export class SubmissionPage {
    readonly page : Page;
    readonly selectButton: string;
    readonly idNumberFormat: RegExp;

    constructor(page: Page) {
        this.page = page;
        this.selectButton = 'td[id*="Select"] div[role="button"]';
        this.idNumberFormat = /^\d{10}$/;
    }

    visualisedProductsTab(): Locator {return this.page.locator('div[aria-label="Visualized Products"]')}
    tableRows(): Locator{return this.page.locator('table tbody tr')}
    productNames(): Locator{return this.page.locator('td[id*="Name_Cell"] div[class="gw-value-readonly-wrapper"]')}
    selectProduct(value: string): Locator {
        let selectButton: Locator =  this.tableRows().filter({ has: this.productNames().getByText(value)}).locator(this.selectButton);
        return selectButton;
    }
    nextButton(): Locator{return this.page.locator('div[class*="ToolbarButtonWidget"]').getByText('Next')}
    quoteButton(): Locator{return this.page.locator('div[class*="ToolbarButtonWidget"]').getByText('Quote')}
    bindOptions(): Locator{return this.page.locator('div[class*="ToolbarButtonWidget"]').getByText('Bind Options')}
    closeOptions(): Locator{return this.page.locator('div[class*="ToolbarButtonWidget"]').getByText('Close Options')}
    submissionId(): Locator{return this.page.locator('div[class="gw-Wizard--Title"]')}
    submStatus(): Locator{return this.page.locator('div[class="gw-Wizard--SubTitle"]')}

    viewPolicy(): Locator{return this.page.locator('div[data-gw-click*="ViewPolicy"]')}
    sourceDrpdwn(): Locator{return this.page.locator('select[name*="CancelPolicyDV-Source"]')}
    reasonDrpdwn(): Locator{return this.page.locator('select[name*="CancelPolicyDV-Reason"]')}
    startCancellationBtn(): Locator{return this.page.locator('div[role="button"] div[aria-label="Start Cancellation"]')}

    async createSubmission(accountNumber: string): Promise<string> {
        const homePage = new HomePage(this.page);
        const accountPage = new AccountPage(this.page);
        const pageUtils = new PageUtils(this.page);
        let submissionId = '';

        await homePage.account().locator(homePage.expandButton).click();
        await accountPage.accountSearch().fill(accountNumber);
        await accountPage.accountSearch().press('Enter');

        await homePage.actions().click();
        await pageUtils.selectDropdown('New Submission');

        await this.visualisedProductsTab().click();
        await this.selectProduct('Directors and Officers Liability').click();

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Policy Info' }).waitFor({state:'visible'})
        await this.nextButton().click();//Policy Info'

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Risk Details' }).waitFor({state:'visible'})
        await  this.nextButton().click() //Risk Details
        
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Pricing' }).waitFor({state:'visible'})
        await  this.nextButton().click() //Pricing
       
        submissionId = (await this.submissionId().innerText()).split(' ')[1];
        return submissionId;
    }

    async quoteSubmission() {
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Risk Analysis' }).waitFor({state:'visible'})
        await this.nextButton().click();//Risk Analysis

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Policy Review' }).waitFor({state:'visible'})
        await this.quoteButton().click();//Policy Review
    }

    async issuePolicy() {
        const homePage = new HomePage(this.page);
        const pageUtils = new PageUtils(this.page);

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Quote' }).waitFor({state:'visible'})
        await this.nextButton().click();//Quote

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Forms' }).waitFor({state:'visible'})
        await this.nextButton().click();//Forms

        await this.page.waitForLoadState('networkidle');
        await homePage.pageTitle().getByText('Payment').waitFor({state:'visible'})
        await this.bindOptions().click();//Payment

        await this.page.on('dialog', async dialog=>dialog.accept())
        await pageUtils.selectDropdown('Issue Policy');
    }

    async quoteCancellation() {
        const homePage = new HomePage(this.page);
        const pageUtils = new PageUtils(this.page);

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Quote' }).waitFor({state:'visible'})
        await this.nextButton().click();//Quote

        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('heading', { name: 'Forms' }).waitFor({state:'visible'})
        await this.nextButton().click();//Forms

        await this.page.waitForLoadState('networkidle');
        await homePage.pageTitle().getByText('Payment').waitFor({state:'visible'})
        await this.closeOptions().click();//Payment

        await this.page.on('dialog', async dialog=>dialog.accept())
        await pageUtils.selectDropdown('Withdraw Transaction');

    }

    async policyCancellation() {
        const homePage = new HomePage(this.page);
        const pageUtils = new PageUtils(this.page);
        
        await this.viewPolicy().click();
        await expect(homePage.pageTitle()).toContainText("Policy Summary");

        await homePage.actions().click();
        await pageUtils.selectDropdown('Cancel Policy');
        await expect(homePage.pageTitle()).toContainText("Start Cancellation");

        await this.sourceDrpdwn().selectOption({index:1});
        await this.reasonDrpdwn().waitFor({state: 'attached'})
        await this.reasonDrpdwn().selectOption({index:4});
        await this.startCancellationBtn().click();

        await this.page.waitForLoadState("load")
        await expect(homePage.pageTitle()).toHaveText("Confirmation");

        await this.bindOptions().click();
        await pageUtils.selectDropdown('Cancel Now');
    }
}