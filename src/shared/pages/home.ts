import { Locator, Page } from "@playwright/test";

export class HomePage {
    page : Page
    readonly expandButton : string;

    constructor(page: Page) {
        this.page = page;
        this.expandButton = 'div[class="gw-icon gw-icon--expand"]';
    }

    desktop(): Locator {
        return this.page.locator('div[id="TabBar-DesktopTab"]')
    }
    account(): Locator {
        return this.page.locator('div[id="TabBar-AccountTab"]')
    }
    accountSearch() : Locator {
        return this.page.locator('input[name*="AccountTab_AccountNumberSearchItem"]');
    }
    policy(): Locator {
        return this.page.locator('div[id="TabBar-PolicyTab"]')
    }
    pageTitle(): Locator {
        return this.page.locator('div[class="gw-TitleBar--title"]');
    }
    

    actions(): Locator {
        return this.page.getByRole('button', { name: 'Actions' })
        // return this.page.locator('div[data-gw-menu-group="Actions"] div[class="gw-action--expand-button gw-no-pointer"]')
    }
}