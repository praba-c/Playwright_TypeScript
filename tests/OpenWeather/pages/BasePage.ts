import { Page, Locator } from "@playwright/test"; 

export class BasePage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async closeAllert() {
        this.page.on('dialog', async dialog => {
            console.log('Map page')
            await dialog.dismiss();
        });
    }
}