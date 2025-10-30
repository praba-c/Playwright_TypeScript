import { Page, Locator } from "@playwright/test"
import { BasePage } from "./BasePage";

export class MapPage extends BasePage {

    page: Page;
    zoomOutBtn: Locator;
    disabledZoomOutBtn: Locator;
    cityNames: Locator;
    flag: boolean;
    map: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.zoomOutBtn = page.getByTitle('Zoom out');
        this.disabledZoomOutBtn = page.locator("//a[contains(@class, 'disabled')]");
        this.cityNames = page.locator("#map span[class='city-name weather-average']");
        this.flag = true;
        this.map = page.locator('#map');
    }

    async isMapPageDisplayed(): Promise<any> {
        return await this.zoomOutBtn.isVisible();
    }

    async zoomOut() {
        while (!await this.disabledZoomOutBtn.isVisible()) {
            await this.zoomOutBtn.click();
            await this.page.waitForTimeout(2000);
        }
    }

    async findCity(city: string) {
        //while (this.flag) {
            for (let i = 0; i < await this.cityNames.count(); i++) {
                console.log(await this.cityNames.nth(i).textContent());
            }
            this.cityNames = this.page.locator("#map span[class='city-name weather-average']");
        //}
    }
}