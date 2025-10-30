import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

    page: Page;
    logo: Locator;
    mapBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.mapBtn = page.locator("//ul[not(@id = 'mobile-menu')]//a[text()='Maps']");
        this.logo = page.locator('.logo');
    }

    async isHomePageDisplayed(): Promise<any> {
        return await this.logo.isVisible();
    }

    async clickOnMapBtn() {
        await this.mapBtn.click();
    }
}