import {test, expect} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { MapPage } from "../pages/MapPage";

test('Find city', async({page}) => {
    const homePage = new HomePage(page);
    const mapPage = new MapPage(page);
    
    await page.goto('https://openweathermap.org/');
    
    expect(homePage.isHomePageDisplayed());
    await homePage.closeAllert();
    await homePage.clickOnMapBtn();
    await homePage.closeAllert();

    expect (mapPage.isMapPageDisplayed());
    await mapPage.zoomOut();
    await mapPage.findCity("Shangai");
})